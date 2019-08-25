import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Card, CardBody, Form, Col, Row, Container, CardImg } from 'reactstrap';

import { useMutation } from 'react-apollo-hooks';
import { UPDATE_USER } from 'apollo/mutations/mutations';
import { validatePassword } from 'utils/input_validation/input_validation';

import GardenlyLogo from 'assets/img/brand/gardenly_black.png';
import InputWithValidation from 'components/input/InputWithValidation';
import LoadingButton from 'components/buttons/LoadingButton';

function ResetPassword({ t }) {
  const [inputStates, setInputStates] = useState({
    password: { error: false, value: '', feedback: t('bad_password') },
    passwordRepeat: { error: false, value: '', feedback: t('bad_valid_psw') }
  });

  const resetPassword = useMutation(UPDATE_USER, {
    variables: {
      password: inputStates.password.value
    }
  });

  const validate = (e, validation, key) => {
    if (validation(e) || e === '') return true;
    setInputStates({ ...inputStates, [key]: { ...inputStates[key], error: true } });
    return false;
  };

  const submit = () => {};

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
                  <p className="text-muted">{t('forgot_pass_title')}</p>
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
                  />
                  <LoadingButton
                    disabled={inputStates.passwordRepeat.error}
                    color="primary"
                    block
                    onClick={submit}
                  >
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

ResetPassword.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('resetpassword')(ResetPassword);
