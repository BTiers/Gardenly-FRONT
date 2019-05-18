import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner
} from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo-hooks';

import { UPDATE_MEDIUM, DELETE_MEDIUM } from 'apollo/mutations/mutations';
import { GET_ALL_USER_MEDIA } from 'apollo/queries/queries';

import CenterY from 'components/image/CenterY';

const PictureActionsLayout = styled.div`
  visibility: ${({ active }) => (active === 1 ? 'visible' : 'hidden')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  transition: visibility 0.3s linear, opacity 0.3s linear;
  opacity: ${({ active }) => (active === 1 ? '0.35' : '0')};
`;

function Picture({
  history,
  picture: { title, description, id, picture, thumbnail },
  t
}) {
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [titleState, setTitleState] = useState(title);
  const [descState, setDescState] = useState(description);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const onDelete = () => {
    history.push(`/app/pictures`);
  };

  const deleteMedium = useMutation(DELETE_MEDIUM, {
    variables: { id },
    refetchQueries: [{ query: GET_ALL_USER_MEDIA }],
    update: () => onDelete()
  });
  const updateMedium = useMutation(UPDATE_MEDIUM, {
    variables: { id, title: titleState, description: descState },
    refetchQueries: [{ query: GET_ALL_USER_MEDIA }],
    update: () => setUpdating(false)
  });

  const toggle = () => {
    setOpen(!open);
    setSelected(false);
  };

  return (
    <Col
      xl="3"
      md="4"
      sm="6"
      xs="12"
      className="mb-4"
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
    >
      <div
        className="w-100 h-100 rounded mx-auto my-auto text-center align-middle"
        onClick={() => {
          toggle();
        }}
      >
        <CenterY>
          <img src={thumbnail} alt={title} className="img-fluid" />
        </CenterY>
        <PictureActionsLayout active={selected ? 1 : 0} />
        <Modal isOpen={open} toggle={toggle} className="modal-lg modal-primary">
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
            <Row className="justify-content-center mt-3">
              <img className="img-fluid" src={picture} alt={title} />
            </Row>
            <hr />
            <Form className="form-horizontal">
              <FormGroup row>
                <Col sm="12">
                  <Label htmlFor="image-title">{t('title')}</Label>
                  <Input
                    type="text"
                    placeholder={t('title')}
                    value={titleState}
                    onChange={e => setTitleState(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm="12">
                  <Label htmlFor="image-description">
                    {t('choose_description')}
                  </Label>
                  <Input
                    type="text"
                    placeholder={t('choose_description')}
                    value={descState}
                    onChange={e => setDescState(e.target.value)}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Col xs="6">
              <Button
                color="danger"
                disable={deleting}
                onClick={() => {
                  setDeleting(true);
                  deleteMedium();
                }}
              >
                {deleting ? <Spinner size="sm" className="mx-4"  /> : t('delete')}
              </Button>
            </Col>
            <Col xs="6">
              <Button
                className="float-right"
                color="primary"
                onClick={() => {
                  setUpdating(true);
                  updateMedium();
                }}
              >
                {updating ? <Spinner size="sm" className="mx-4"  /> : t('save')}
              </Button>
            </Col>
          </ModalFooter>
        </Modal>
      </div>
    </Col>
  );
}

Picture.propTypes = {
  picture: PropTypes.shape({
    picture: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default withTranslation('picture_gallery')(Picture);
