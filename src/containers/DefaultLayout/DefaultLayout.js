import React, { Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Cookies from 'universal-cookie';
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks';

import { USER_GARDENS_NAMES, GET_USER } from 'apollo/queries/queries';
import { DELETE_SESSION } from 'apollo/mutations/mutations';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const cookie = new Cookies();

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

function DefaultLayout(props) {
  const [asideActiveTab, asideSetActiveTab] = useState('1');
  const { data, error, loading } = useQuery(USER_GARDENS_NAMES);
  const { data: userData, error: userError, loading: userLoading } = useQuery(GET_USER);

  // FIXME: Looks to me a bit hacky to do this here
  const isOnUnity = props.location.pathname.match(/\/garden\/.+\/edit/g);
  const client = useApolloClient();

  const logOut = useMutation(DELETE_SESSION, {
    update: () => {
      client.resetStore();
      cookie.set('isLoggedIn', 'false', { path: '/' });
      props.history.push('/login');
    }
  });
  const navConfig = navigation;

  if (!loading && !error && data && !userLoading && !userError && userData) {
    navConfig.items = navConfig.items.map(item => {
      if (item.admin && !userData.getCurrentUser.isModerator) return null;
      if (item.name === 'Jardins') {
        item.children = data.gardens.nodes.map(({ name }) => ({
          name: `${name}`,
          url: `/garden/${name}`,
          icon: 'icon-drop'
        }));
        item.children.push({
          name: 'Nouveau jardin',
          url: `/garden/create`,
          icon: 'icon-plus'
        });
      }
      return item;
    });

    navConfig.items = navConfig.items.filter(e => e !== null);
  }

  const onLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  const signOut = e => {
    e.preventDefault();
    logOut();
  };

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={onLoading()}>
          <DefaultHeader
            avatar={!userLoading && !userError ? userData.getCurrentUser.thumbnail : null}
            asideSetActiveTab={asideSetActiveTab}
            onLogout={e => signOut(e)}
            history={props.history}
          />
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navConfig} {...props} />
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          {isOnUnity ? null : <AppBreadcrumb appRoutes={routes} />}
          <Container
            fluid
            style={{
              padding: isOnUnity ? '0' : undefined,
              height: isOnUnity ? 'calc(100vh - 55px)' : undefined,
              overflowY: isOnUnity ? 'hidden' : undefined
            }}
          >
            <Suspense fallback={onLoading()}>
              <Switch>
                {routes.map((route, idx) => {
                  const isLoggedIn = cookie.get('isLoggedIn') || 'false';

                  if (route.requireAuth && isLoggedIn === 'false') {
                    return <Redirect key={idx} to={route.redirectTo} />;
                  }
                  if (
                    route.adminOnly &&
                    !userLoading &&
                    !userError &&
                    !userData.getCurrentUser.isModerator
                  )
                    return null;

                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null;
                })}
                <Redirect from="/" to="/activities" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside>
          <Suspense fallback={onLoading()}>
            <DefaultAside activeTab={asideActiveTab} setActiveTab={asideSetActiveTab} />
          </Suspense>
        </AppAside>
      </div>
      {isOnUnity ? null : (
        <AppFooter>
          <Suspense fallback={onLoading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      )}
    </div>
  );
}

export default DefaultLayout;
