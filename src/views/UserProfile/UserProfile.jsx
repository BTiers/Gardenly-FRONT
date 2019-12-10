import React, { useState } from 'react';

import classNames from 'classnames';

import Moment from 'react-moment';
import 'moment/locale/fr';

import {
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

import { withTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { UPDATE_USER } from 'apollo/mutations/mutations';

import {
  validateEmail,
  validatePassword,
  validateUsername
  // validateLastAndFirstName
} from 'utils/input_validation/input_validation';

import InputWithValidation from 'components/input/InputWithValidation';
import FriendsView from './FriendsView';
import { GET_USER } from '../../apollo/queries/queries';
import LoadingButton from '../../components/buttons/LoadingButton';
import PicturesGallery from '../Pictures/PicturesGallery';

const GardenDetails = React.memo(({ name, updatedAt, createdAt, country }) => (
  <Col md="12" lg="6" className="mb-3">
    <div className="mx-2 p-2 border rounded">
      <span className="d-block">
        <span className="font-weight-bold mb-2 text-primary">{name}</span>
      </span>
      <span className="d-block">
        <i className="icon-location-pin mr-1" />
        <span className="mb-2 text-muted">{country || 'Non renseignée'}</span>
      </span>
      <div className="text-center my-2">
        <img alt="Placeholder garden" src="https://via.placeholder.com/400x200" />
      </div>
      <p className="small text-muted pt-3 pb-1">
        <span className="float-left">
          {'Créé le '}
          <Moment locale="fr" format="DD/MM/YYYY" element="strong">
            {createdAt}
          </Moment>
        </span>
        <span className="float-right">
          {'Mis à jour il y a '}
          <Moment locale="fr" fromNow ago element="strong">
            {updatedAt}
          </Moment>
        </span>
      </p>
    </div>
  </Col>
));

const GardenOverview = React.memo(({ gardens }) => (
  <Row>
    <div className="font-weight-bold text-muted text-uppercase mb-3 d-block w-100">Vos jardins</div>
    {gardens.map((garden, index) => {
      if (index < 4) return <GardenDetails key={garden.name} {...garden} />;
      return null;
    })}
  </Row>
));

const ChangePassword = React.memo(() => {
  const [, setPassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [, setRptpassword] = useState('');

  return (
    <Col xs="6" className="mb-3">
      <ListGroup>
        <InputWithValidation
          onUpdate={e => {
            setPassword(e);
          }}
          className="pl-0"
          type="password"
          validate={() => true}
          title="Ancien mot de passe"
        />
        <InputWithValidation
          onUpdate={e => {
            setNewpassword(e);
          }}
          validate={validatePassword}
          className="pl-0"
          type="password"
          title="Nouveau mot de passe"
        />
        <InputWithValidation
          onUpdate={e => {
            setRptpassword(e);
          }}
          validate={value => value === newpassword}
          className="pl-0"
          type="password"
          title="Confirmer nouveau mot de passe"
          reset
        />
        <ListGroupItem tag="div" className="border-0 pl-0">
          <Button size="sm" outline color="primary">
            Mettre à jour
          </Button>
          <span>
            <a className="ml-3 text-muted" href="/profile">
              J'ai oublié mon mot de passe
            </a>
          </span>
        </ListGroupItem>
      </ListGroup>
    </Col>
  );
});

const DeleteAccount = React.memo(() => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Col xs="6" className="mb-3">
      <p className="text-muted">
        Une fois votre compte supprimer,
        <strong className="text-danger"> aucune annulation n&aposest possible</strong>
        .S'il vous plait soyez sûr.
      </p>
      <Button size="sm" outline color="danger" onClick={toggle}>
        Supprimer mon compte
      </Button>
      <Modal size="sm" isOpen={open} fade={false} toggle={toggle}>
        <ModalBody className="font-weight-bold text-danger small text-uppercase">
          <p>êtes-vous sur de vouloir supprimer votre compte ?</p>
          <div className="float-right">
            <Button size="sm" color="danger" onClick={toggle}>
              Supprimer mon compte
            </Button>
            <Button size="sm" color="secondary" onClick={toggle}>
              Annuler
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Col>
  );
});

const AccountOverview = React.memo(() => (
  <Row>
    <div className="font-weight-bold text-muted text-uppercase mb-1 d-block w-100">
      Changer de mot de passe
      <hr className="my-2 ml-0 w-50" />
    </div>
    <ChangePassword />
    <div className="font-weight-bold text-danger text-uppercase mb-1 d-block w-100">
      Supprimer son compte
      <hr className="my-2 ml-0 w-50" />
    </div>
    <DeleteAccount />
  </Row>
));

const AccountQuickAccess = withTranslation('register')(
  ({ t, username: defaultUsername, email: defaultEmail, bio: defaultBio }) => {
    const defaultState = {
      username: defaultUsername,
      bio: defaultBio,
      email: defaultEmail
    };
    const [username, setUsername] = useState(defaultUsername);
    const [bio, setBio] = useState(defaultBio);
    const [email, setEmail] = useState(defaultEmail);

    const [loading, setLoading] = useState(false);

    const [updateUser] = useMutation(UPDATE_USER, {
      variables: { username, email },
      update: () => setLoading(false)
    });

    const [reset, shouldReset] = useState(false);

    return (
      <React.Fragment>
        <InputWithValidation
          defaultValue={reset ? defaultState.username : username}
          validate={validateUsername}
          onUpdate={(e, hasReset) => {
            setUsername(e);
            if (hasReset) shouldReset(false);
          }}
          type="text"
          title="Nom d'utilisateur"
          feedBack={t('bad_usr')}
          reset={reset}
        />
        <InputWithValidation
          disabled
          defaultValue={reset ? defaultState.bio : bio}
          validate={() => true}
          onUpdate={(e, hasReset) => {
            setBio(e);
            if (hasReset) shouldReset(false);
          }}
          title="Biographie"
          type="textarea"
          feedBack="Non implémenté"
          reset={reset}
        />
        <InputWithValidation
          defaultValue={reset ? defaultState.email : email}
          validate={validateEmail}
          onUpdate={(e, hasReset) => {
            setEmail(e);
            if (hasReset) shouldReset(false);
          }}
          type="email"
          title="E-mail"
          feedBack={t('bad_email')}
          reset={reset}
        />
        <ListGroupItem tag="a" className="border-left-0">
          <LoadingButton
            color="primary"
            className="mx-2"
            onClick={() => {
              setLoading(true);
              updateUser();
            }}
            loading={loading}
          >
            <span>Sauvegarder</span>
          </LoadingButton>
          <Button className="mx-2" onClick={() => shouldReset(true)}>
            Annuler
          </Button>
        </ListGroupItem>
      </React.Fragment>
    );
  }
);

export default withTranslation('register')(({ t }) => {
  const { data, loading, error } = useQuery(GET_USER);
  const [activeTab, setActiveTab] = useState('1');
  const [avartarModal, setAvatarModal] = useState(false);

  if (loading) return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  if (error) return <div className="animated fadeIn pt-1 text-center">Error</div>;

  const {
    // id,
    username,
    // firstName,
    // lastName,
    email,
    // phoneNumber,
    // age,
    // dateOfBirth,
    // address,
    avatar,
    gardens
  } = data.getCurrentUser;

  return (
    <div className="animated fadeIn">
      <Modal size="lg" isOpen={avartarModal} toggle={() => setAvatarModal(!avartarModal)}>
        <ModalHeader>{t('selectavatar')}</ModalHeader>
        <ModalBody>
          <PicturesGallery
            toggle={() => setAvatarModal(!avartarModal)}
            className="w-100"
            mode="avatarselector"
          />
        </ModalBody>
      </Modal>
      <Card>
        <CardBody style={{ minHeight: 'calc(100vh - 204px)' }}>
          <Row>
            <Col sm="3" className="font-weight-bold small border-right border-secondary">
              <ListGroup className="list-group-accent list-group-item-action" tag="div">
                <ListGroupItem tag="a" className="border-left-0">
                  <div style={{ maxWidth: 256 }} className="mx-auto">
                    <img src={avatar} alt="Avatar" className="rounded-top img-fluid" />
                    <Button
                      onClick={() => setAvatarModal(true)}
                      block
                      color="primary rounded-0 border-top-0"
                    >
                      <i className="icon-cloud-upload mr-2" />
                      Changer d'image
                    </Button>
                  </div>
                </ListGroupItem>
                <AccountQuickAccess username={username} email={email} bio="" />
              </ListGroup>
            </Col>
            <Col sm="9" className="px-5 font-weight-bold small">
              <Nav tabs>
                <NavItem className="">
                  <NavLink
                    className={classNames({
                      active: activeTab === '1'
                    })}
                    onClick={() => setActiveTab('1')}
                  >
                    <span className="font-weight-bold text-muted text-uppercase">
                      Vue d'ensemble
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: activeTab === '2'
                    })}
                    onClick={() => setActiveTab('2')}
                  >
                    <span className="font-weight-bold text-muted text-uppercase">Compte</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: activeTab === '3'
                    })}
                    onClick={() => setActiveTab('3')}
                  >
                    <span className="font-weight-bold text-muted text-uppercase">Friends</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={activeTab}
                className="border-left-0 border-right-0 border-bottom-0"
              >
                <TabPane tabId="1">
                  <GardenOverview gardens={gardens} />
                </TabPane>
                <TabPane tabId="2">
                  <AccountOverview />
                </TabPane>
                <TabPane tabId="3">
                  <FriendsView />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
});
