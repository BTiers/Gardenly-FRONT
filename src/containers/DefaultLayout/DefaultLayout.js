import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Cookies from 'universal-cookie';
import { useQuery } from 'react-apollo-hooks';

import { USER_GARDENS_NAMES } from 'apollo/queries/queries';

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
  const { data, error, loading } = useQuery(USER_GARDENS_NAMES);
  let navConfig = navigation;

  if (!loading && !error && data) {
    navConfig.items = navConfig.items.map(item => {
      if (item.name === 'Jardins') {
        item.children = data.gardens.nodes.map(({ name }) => {
          return {
            name: `${name}`,
            url: `/garden/${name}`,
            icon: 'icon-drop'
          };
        });
        item.children.push({
          name: "Nouveau jardin",
          url: `/garden/create`,
          icon: 'icon-plus'
        })
      }
      return item;
    });
  }

  const onLoading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  const signOut = e => {
    e.preventDefault();
    props.history.push('/login');
  };

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense fallback={onLoading()}>
          <DefaultHeader onLogout={e => signOut(e)} />
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
          <AppBreadcrumb appRoutes={routes} />
          <Container fluid>
            <Suspense fallback={onLoading()}>
              <Switch>
                {routes.map((route, idx) => {
                  const isLoggedIn = cookie.get('isLoggedIn') || 'false';

                  if (
                    route.requireAuth !== undefined &&
                    route.requireAuth === true
                  ) {
                    if (route.requireAuth === true) {
                      if (isLoggedIn === 'false')
                        return <Redirect key={idx} to={route.redirectTo} />;
                    } else if (isLoggedIn === 'true')
                      return <Redirect key={idx} to={route.redirectTo} />;
                  }
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
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
        <AppAside fixed>
          <Suspense fallback={onLoading()}>
            <DefaultAside />
          </Suspense>
        </AppAside>
      </div>
      <AppFooter>
        <Suspense fallback={onLoading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}

export default DefaultLayout;
