import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  CardImg
} from 'reactstrap';

import { withTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo-hooks';

import GardenlyLogo from 'assets/img/brand/gardenly_black.png';

import { CREATE_USER } from 'apollo/mutations/mutations';

import { validateRegister } from './RegisterValidation';

function Register({ t, history }) {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [errors, setErrors] = useState({
    username: { active: false, reason: '' },
    firstname: { active: false, reason: '' },
    lastname: { active: false, reason: '' },
    email: { active: false, reason: '' },
    password: { active: false, reason: '' },
    passwordRepeat: { active: false, reason: '' }
  });

  const createUser = useMutation(CREATE_USER, {
    variables: { username, firstname, lastname, email, password },
    errorPolicy: 'all',
    update: (proxy, mutationResult) => {
      history.push('/login');
    }
  });

  const isAnyError =
    Object.keys(errors).find(key => errors[key].active) !== undefined ||
    firstname === '' ||
    lastname === '' ||
    username === '' ||
    email === '' ||
    password === '' ||
    passwordRepeat === '';
  const validateForm = () =>
    validateRegister(t, email, password, passwordRepeat, username, firstname, lastname);
  const submit = () => {
    if (!isAnyError) createUser().then(data => console.log(data), error => console.log(error));
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form>
                  <Col xs={{ size: 6, offset: 3 }}>
                    <CardImg src={GardenlyLogo} />
                  </Col>
                  <hr />
                  <p className="text-muted">Create your account</p>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        onChange={e => setUsername(e.target.value)}
                        onBlur={() => setErrors(validateForm())}
                        invalid={errors.username.active}
                      />
                      <FormFeedback>{errors.username.reason}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="First name"
                        autoComplete="fname"
                        onChange={e => setFirstname(e.target.value)}
                        onBlur={() => setErrors(validateForm())}
                        invalid={errors.firstname.active}
                      />
                      <FormFeedback>{errors.firstname.reason}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Last name"
                        autoComplete="lname"
                        onChange={e => setLastname(e.target.value)}
                        onBlur={() => setErrors(validateForm())}
                        invalid={errors.lastname.active}
                      />
                      <FormFeedback>{errors.lastname.reason}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        onBlur={() => setErrors(validateForm())}
                        invalid={errors.email.active}
                      />
                      <FormFeedback>{errors.email.reason}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)}
                        onBlur={() => setErrors(validateForm())}
                        invalid={errors.password.active}
                      />
                      <FormFeedback>{errors.password.reason}</FormFeedback>
                    </InputGroup>
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
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        onChange={e => setPasswordRepeat(e.target.value)}
                        onBlur={() => setErrors(validateForm())}
                        invalid={errors.passwordRepeat.active}
                      />
                      <FormFeedback>{errors.passwordRepeat.reason}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <Button disabled={isAnyError} color="success" block onClick={submit}>
                    {t('submit')}
                  </Button>
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
  t: PropTypes.func.isRequired
};

export default withTranslation('register')(Register);
