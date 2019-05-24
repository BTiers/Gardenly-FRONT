import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router-dom';
import { CREATE_SESSION } from 'apollo/mutations/mutations';
import { objectOf, object, func, shape } from 'prop-types';
import { useMutation } from 'react-apollo-hooks';

import LoadingButton from 'components/buttons/LoadingButton';

const cookie = new Cookies();

function LoginSubmit({ t, states: { passwordState, emailState }, setAccountCredState, history }) {
  const createSession = useMutation(CREATE_SESSION, {
    variables: {
      email: emailState.value,
      password: passwordState.value
    }
  });
  const [loading, setLoading] = useState(false);

  function onSubmit() {
    if (emailState.value === '' || passwordState.value === '') return;
    if (emailState.error === true || passwordState.error === true) setAccountCredState(true);
    else {
      setLoading(true);
      createSession().then(
        () => {
          cookie.set('isLoggedIn', true, { path: '/' });
          history.push('/activities');
        },
        error => {
          // eslint-disable-next-line
          if (error == 'Error: GraphQL error: Already loged') {
            cookie.set('isLoggedIn', true, { path: '/' });
            history.push('/activities');
            return;
          }
          console.error(error);
          setLoading(false);
          setAccountCredState(true);
        }
      );
    }
  }

  function keypressHandler(e) {
    if (e.keyCode === 13) {
      onSubmit();
      e.preventDefault();
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', keypressHandler, false);
    return () => document.removeEventListener('keypress', keypressHandler, false);
  });

  return (
    <LoadingButton
      color="primary"
      className="px-4"
      block
      loading={loading}
      onClick={() => {
        onSubmit();
      }}
    >
      <span>{t('login')}</span>
    </LoadingButton>
  );
}

LoginSubmit.propTypes = {
  states: objectOf(object).isRequired,
  setAccountCredState: func.isRequired,
  t: func.isRequired,
  history: shape({ push: func }).isRequired
};

export default withRouter(LoginSubmit);
