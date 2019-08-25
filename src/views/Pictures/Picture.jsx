import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, ListGroup } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo-hooks';

import { UPDATE_MEDIUM, DELETE_MEDIUM, UPDATE_USER } from 'apollo/mutations/mutations';
import { GET_ALL_USER_MEDIA, GET_USER } from 'apollo/queries/queries';

import CenterY from 'components/image/CenterY';
import InputWithValidation from 'components/input/InputWithValidation';
import LoadingButton from 'components/buttons/LoadingButton';

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
  picture: { title, description, id, picture, thumbnail },
  t,
  onDelete,
  onUpdate,
  mode,
  toggleParrent
}) {
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [titleState, setTitleState] = useState(title);
  const [descState, setDescState] = useState(description);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  const deleteM = useMutation(DELETE_MEDIUM, {
    variables: { id },
    update: (cache, { data: { deleteMedium } }) => {
      const query = GET_ALL_USER_MEDIA;
      const { medium } = deleteMedium;

      const data = cache.readQuery({ query });

      data.getCurrentUser.media = data.getCurrentUser.media.filter(m => m.id !== medium.id);

      cache.writeQuery({ query, data });
      onDelete();
    }
  });
  const updateMedium = useMutation(UPDATE_MEDIUM, {
    variables: { id, title: titleState, description: descState },
    update: () => {
      setUpdating(false);
      onUpdate();
    }
  });

  const toggle = () => {
    setOpen(!open);
    setSelected(false);
  };

  const updateUser = useMutation(UPDATE_USER, {
    variables: { avatar: picture },
    update: (cache, mutationResult) => {
      const query = GET_USER;
      const data = cache.readQuery({ query });

      data.getCurrentUser.avatar = picture;
      data.getCurrentUser.thumbnail = [
        picture.slice(0, -41),
        'thumbnail_',
        picture.slice(-41)
      ].join('');

      cache.writeQuery({ query, data });
      setUpdating(false);
      toggle();
      toggleParrent();
    }
  });

  if (mode === 'gallery')
    return (
      <Col
        lg="2"
        md="3"
        sm="6"
        xs="12"
        className="p-2"
        onMouseEnter={() => setSelected(true)}
        onMouseLeave={() => setSelected(false)}
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className="w-100 h-100 rounded mx-auto my-auto text-center align-middle"
          role="button"
          tabIndex={0}
          onClick={() => toggle()}
        >
          <CenterY>
            <img src={thumbnail} alt={title} className="img-fluid" />
          </CenterY>
          <PictureActionsLayout className="p-2" active={selected ? 1 : 0} />
          <Modal centered isOpen={open} toggle={toggle} className="modal-lg">
            <ModalHeader toggle={toggle}>
              <span className="small text-uppercase">{title}</span>
            </ModalHeader>
            <ModalBody>
              <Row className="justify-content-center mt-3">
                <img className="img-fluid" src={picture} alt={title} />
              </Row>
              <hr />
              <ListGroup className="small">
                <InputWithValidation
                  onUpdate={e => setTitleState(e)}
                  validate={e => e !== '' && e.trim() !== ''}
                  type="text"
                  title={t('title')}
                  feedBack="Un titre est nécessaire"
                  defaultValue={title}
                />
                <InputWithValidation
                  onUpdate={e => setDescState(e)}
                  validate={() => true}
                  type="text"
                  title={t('description')}
                  defaultValue={description}
                />
              </ListGroup>
            </ModalBody>
            <ModalFooter>
              <Col xs="6">
                <LoadingButton
                  color="danger"
                  disabled={deleting}
                  onClick={() => {
                    setDeleting(true);
                    deleteM();
                  }}
                  loading={deleting}
                >
                  <span>{t('delete')}</span>
                </LoadingButton>
              </Col>
              <Col xs="6">
                <LoadingButton
                  className="float-right"
                  color="primary"
                  onClick={() => {
                    setUpdating(true);
                    updateMedium();
                  }}
                  loading={updating}
                >
                  <span>{t('save')}</span>
                </LoadingButton>
              </Col>
            </ModalFooter>
          </Modal>
        </div>
      </Col>
    );

  return (
    <Col
      lg="2"
      md="3"
      sm="6"
      xs="12"
      className="p-2"
      onMouseEnter={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="w-100 h-100 rounded mx-auto my-auto text-center align-middle"
        role="button"
        tabIndex={0}
        onClick={() => toggle()}
      >
        <CenterY>
          <img src={thumbnail} alt={title} className="img-fluid" />
        </CenterY>
        <PictureActionsLayout className="p-2" active={selected ? 1 : 0} />
        <Modal centered isOpen={open} toggle={toggle} className="modal-lg">
          <ModalHeader toggle={toggle}>
            <span className="small text-uppercase">{title}</span>
          </ModalHeader>
          <ModalBody>
            <Row className="justify-content-center mt-3">
              <img className="img-fluid" src={picture} alt={title} />
            </Row>
            <hr />
            <Col className="text-center">
              <LoadingButton
                color="primary"
                onClick={() => {
                  setUpdating(true);
                  updateUser();
                }}
                loading={updating}
              >
                <span>{t('selectProfilPic')}</span>
              </LoadingButton>
            </Col>
          </ModalBody>
        </Modal>
      </div>
    </Col>
  );
}

Picture.propTypes = {
  picture: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  toggleParrent: PropTypes.func.isRequired
};

export default withTranslation('picture_gallery')(Picture);
