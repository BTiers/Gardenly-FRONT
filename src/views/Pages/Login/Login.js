import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';

import LoginSubmit from './LoginSubmit';

function Login({ t }) {
  const [emailState, setEmailState] = useState({ value: '', error: false });
  const [passwordState, setPasswordState] = useState({
    value: '',
    error: false
  });
  const [accountCredState, setAccountCredState] = useState(false);

  function validatePassword(e) {
    const password = e.target.value;
    if (password.length < 6) setPasswordState({ value: password, error: true });
    else setPasswordState({ value: password, error: false });
  }

  function validateEmail(e) {
    const email = e.target.value;
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRex.test(email)) setEmailState({ value: email, error: true });
    else setEmailState({ value: email, error: false });
  }

  function handleKeyPress(e) {
    console.log(e.target.name);

    if (e.target.name === 'Password')
      setPasswordState({ value: e.target.value, error: false });
    else setEmailState({ value: e.target.value, error: false });
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <FormGroup>
                      <h3>{t('login_to_gdl')}</h3>
                      <p className="text-muted">{t('sign_in')}</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="Email"
                          placeholder={t('email')}
                          autoComplete="username"
                          invalid={emailState.error}
                          onBlur={validateEmail}
                          onChange={handleKeyPress}
                        />
                      </InputGroup>
                      <FormFeedback invalid={1}>
                        {t('email_invalid')}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          name="Password"
                          placeholder={t('pswd')}
                          autoComplete="current-password"
                          invalid={passwordState.error}
                          onBlur={validatePassword}
                          onChange={handleKeyPress}
                        />
                      </InputGroup>
                      <FormFeedback invalid={1}>
                        {t('password_invalid')}
                      </FormFeedback>
                    </FormGroup>
                    <Row className="align-items-center">
                      <Col xs="6">
                        <LoginSubmit
                          t={t}
                          states={{
                            passwordState,
                            emailState
                          }}
                          setAccountCredState={setAccountCredState}
                        />
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          {t('forgot_pass')}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  {accountCredState ? (
                    <Alert className="text-center text-light bg-danger">
                      <strong>{t('invalidAccountCred')}</strong>
                    </Alert>
                  ) : (
                    ''
                  )}
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: '44%' }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>{t('sign_up')}</h2>
                    <p>{t('sign_up_catch_phrase')}</p>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        {t('register_now')}
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Login.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('register')(Login);
