import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Form, Row, CardImg, ListGroup } from 'reactstrap';

import { withTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo-hooks';

import GardenlyLogo from 'assets/img/brand/gardenly_black.png';

import { CREATE_USER } from 'apollo/mutations/mutations';

import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateLastAndFirstName
} from 'utils/input_validation/input_validation';

import InputWithValidation from 'components/input/InputWithValidation';
import LoadingButton from 'components/buttons/LoadingButton';

function Register({ t, history, onCompleted }) {
  const [inputStates, setInputStates] = useState({
    username: { error: false, value: '', feedback: t('bad_usr') },
    firstname: { error: false, value: '', feedback: t('bad_fname') },
    lastname: { error: false, value: '', feedback: t('bad_lname') },
    email: { error: false, value: '', feedback: t('bad_email') },
    password: { error: false, value: '', feedback: t('bad_password') },
    passwordRepeat: { error: false, value: '', feedback: t('bad_valid_psw') }
  });

  const createUser = useMutation(CREATE_USER, {
    variables: {
      username: inputStates.username.value,
      firstname: inputStates.firstname.value,
      lastname: inputStates.lastname.value,
      email: inputStates.email.value,
      password: inputStates.password.value
    },
    errorPolicy: 'all'
  });

  const submit = () =>
    createUser().then(({ errors }) => {
      // TODO: R.BELTRAND: Error handling BACKEND
      if (errors && errors.length > 0) {
        console.error(errors);
      } else {
        onCompleted();
        history.push({ pathname: '/login' });
      }
    });

  const findLast = () => {
    let asLast = false;
    let last;

    Object.keys(inputStates).some(key => {
      if (inputStates[key].value !== '' && !inputStates[key].error) return false;
      if (last === undefined) {
        last = key;
        asLast = true;
        return false;
      }
      asLast = false;
      return true;
    });

    return asLast ? last : undefined;
  };

  const lastToFill = findLast();

  const isAnyError =
    Object.keys(inputStates).find(
      key => inputStates[key].error || inputStates[key].value === ''
    ) !== undefined;

  const validate = (e, validation, key) => {
    if (validation(e) || e === '') return true;
    setInputStates({ ...inputStates, [key]: { ...inputStates[key], error: true } });
    return false;
  };

  const update = (e, key) =>
    setInputStates({ ...inputStates, [key]: { ...inputStates[key], value: e, error: false } });

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col sm="12" md="9" lg="7" xl="6">
            <Card className="mx-md-4">
              <CardBody className="p-4">
                <Form>
                  <Col xs={{ size: 6, offset: 3 }}>
                    <CardImg src={GardenlyLogo} />
                  </Col>
                  <hr />
                  <p className="text-muted">{t('create_account')}</p>
                  <ListGroup>
                    <InputWithValidation
                      onUpdate={e => update(e, 'username')}
                      type="text"
                      placeholder={t('username')}
                      autoComplete="username"
                      className="px-0 py-2"
                      validate={e => validate(e, validateUsername, 'username')}
                      feedBack={inputStates.username.feedback}
                      icon="user"
                      reset
                      updateOnChange={lastToFill === 'username'}
                    />
                    <InputWithValidation
                      onUpdate={e => update(e, 'firstname')}
                      type="text"
                      placeholder={t('firstname')}
                      autoComplete="fname"
                      className="px-0 py-2"
                      validate={e => validate(e, validateLastAndFirstName, 'firstname')}
                      feedBack={inputStates.firstname.feedback}
                      icon="user"
                      reset
                      updateOnChange={lastToFill === 'firstname'}
                    />
                    <InputWithValidation
                      onUpdate={e => update(e, 'lastname')}
                      type="text"
                      placeholder={t('lastname')}
                      autoComplete="lname"
                      className="px-0 py-2"
                      validate={e => validate(e, validateLastAndFirstName, 'lastname')}
                      feedBack={inputStates.lastname.feedback}
                      icon="user"
                      reset
                      updateOnChange={lastToFill === 'lastname'}
                    />
                    <InputWithValidation
                      onUpdate={e => update(e, 'email')}
                      type="email"
                      placeholder={t('email')}
                      autoComplete="email"
                      className="px-0 py-2"
                      validate={e => validate(e, validateEmail, 'email')}
                      feedBack={inputStates.email.feedback}
                      icon="envelope-letter"
                      reset
                      updateOnChange={lastToFill === 'email'}
                    />
                    <InputWithValidation
                      onUpdate={e => update(e, 'password')}
                      type="password"
                      placeholder={t('pswd')}
                      autoComplete="new-password"
                      className="px-0 py-2"
                      validate={e => validate(e, validatePassword, 'password')}
                      feedBack={inputStates.password.feedback}
                      icon="lock"
                      reset
                      updateOnChange={lastToFill === 'password'}
                    />
                    <InputWithValidation
                      onUpdate={e => update(e, 'passwordRepeat')}
                      type="password"
                      placeholder={t('valid_psw')}
                      autoComplete="new-password"
                      className="px-0 pt-2 pb-4"
                      validate={e =>
                        validate(e, pwd => pwd === inputStates.password.value, 'passwordRepeat')
                      }
                      feedBack={inputStates.passwordRepeat.feedback}
                      icon="lock"
                      reset
                      updateOnChange={lastToFill === 'passwordRepeat'}
                    />
                  </ListGroup>
                  <LoadingButton disabled={isAnyError} color="primary" block onClick={submit}>
                    <span>{t('submit')}</span>
                  </LoadingButton>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Register.propTypes = {
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  onCompleted: PropTypes.func.isRequired
};

export default withTranslation('register')(Register);
