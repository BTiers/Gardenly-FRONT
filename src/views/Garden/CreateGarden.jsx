import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import {
  Row,
  Col,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap';
import { FaTree } from 'react-icons/fa';
import { CREATE_GARDEN } from 'apollo/mutations/mutations';
import { USER_GARDENS } from 'apollo/queries/queries';
import GeoLocation from './GeoLocation';

const BrandedModalHeader = styled(ModalHeader)``;

function CreateGarden({ t, open, toggleModal, onCreate }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    country: ''
  });
  const [error, setError] = useState({ active: false, reason: '' });
  const [createGarden] = useMutation(CREATE_GARDEN, {
    variables: {
      name,
      latitude: location.latitude,
      longitude: location.longitude,
      data: '{}',
      country: location.country,
      items: 0
    },
    refetchQueries: [{ query: USER_GARDENS }],
    awaitRefetchQueries: true,
    update: () => onCreate(name)
  });
  const toggle = () => {
    toggleModal(!open);
    setError({ active: false });
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <BrandedModalHeader toggle={toggle}>{t('new_garden')}</BrandedModalHeader>
      <ModalBody>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <span className="input-group-text">
              <FaTree />
            </span>
          </InputGroupAddon>
          <Input
            placeholder={t('garden_name_placeholder')}
            onChange={e => setName(e.target.value)}
          />
        </InputGroup>
        <br />
        <GeoLocation onInputChange={setLocation} />
      </ModalBody>
      <ModalFooter>
        <Row>
          <Col xs="12">
            <Button
              color="primary"
              onClick={() => {
                if (name !== '') {
                  setError({ active: false });
                  createGarden();
                } else setError({ active: true, reason: t('must_have_name') });
              }}
            >
              {t('create_garden')}
            </Button>
            <Button color="secondary" onClick={toggle}>
              {t('cancel')}
            </Button>
          </Col>
          {error.active ? (
            <Col xs="12">
              <Alert color="warning">{error.reason}</Alert>
            </Col>
          ) : null}
        </Row>
      </ModalFooter>
    </Modal>
  );
}

CreateGarden.propTypes = {
  t: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default withTranslation('gardens')(CreateGarden);
