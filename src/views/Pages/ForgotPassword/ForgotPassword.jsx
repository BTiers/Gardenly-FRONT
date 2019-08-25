import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { withTranslation } from 'react-i18next';

import LoadingButton from 'components/buttons/LoadingButton';
import GardenlyLogo from 'assets/img/brand/gardenly_black.png';

import {
  Row,
  Col,
  CardImg,
  Container,
  Card,
  CardBody,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

function ForgotPassword({ t }) {
  const [emailState, setEmailState] = useState({ value: '', error: false });

  const submit = () => {
    if (emailState.value === '') setEmailState({ value: '', error: true });
    else {
      //ADD QUERY TO VERIFIY IS USERMAIL EXIST
      return <Link to="/" />;
    }
  };

  function validateEmail(e) {
    const email = e.target.value;
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRex.test(email)) setEmailState({ value: email, error: true });
    else setEmailState({ value: email, error: false });
  }

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
                    />
                  </InputGroup>
                  <LoadingButton
                    disabled={emailState.error !== false}
                    color="primary"
                    block
                    onClick={submit}
                  >
                    <span>{t('validate')}</span>
                  </LoadingButton>
                  <FormFeedback invalid={1}>{t('bad_email')}</FormFeedback>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

ForgotPassword.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('lostpassword')(ForgotPassword);
