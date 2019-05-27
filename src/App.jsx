import React, { useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import Cookies from 'universal-cookie';
import i18next from './i18next';

import Client from './apollo/client';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const cookie = new Cookies();
const Loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('views/Pages/Login'));
const Register = React.lazy(() => import('views/Pages/Register'));
const Page404 = React.lazy(() => import('views/Pages/Page404'));
const Page500 = React.lazy(() => import('views/Pages/Page500'));

const App = () => {
  const [successfullyRegister, setSuccessfullyRegister] = useState(false);

  return (
    <I18nextProvider i18n={i18next}>
      <Client>
        <HashRouter>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={props => {
                  const isLoggedIn = cookie.get('isLoggedIn') || 'false';

                  if (isLoggedIn === 'true') return <Redirect to="/activities" />;
                  return <Login {...props} registrationCompleted={successfullyRegister} />;
                }}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={props => {
                  const isLoggedIn = cookie.get('isLoggedIn') || 'false';

                  if (isLoggedIn === 'true') return <Redirect to="/activities" />;
                  return <Register {...props} onCompleted={() => setSuccessfullyRegister(true)} />;
                }}
              />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </Client>
    </I18nextProvider>
  );
}


export default App;
