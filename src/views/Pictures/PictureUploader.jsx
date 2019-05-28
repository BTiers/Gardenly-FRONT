import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import { Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { useMutation } from 'react-apollo-hooks';
import { CREATE_MEDIUM } from 'apollo/mutations/mutations';
import { GET_ALL_USER_MEDIA } from 'apollo/queries/queries';

import InputWithValidation from 'components/input/InputWithValidation';
import LoadingButton from 'components/buttons/LoadingButton';
import Option from 'components/input/Option';

const uploadStatus = {
  NONE: -1,
  LOADING: 0,
  ERROR: 1,
  SUCCESS: 2
};

const PictureUploader = ({ t, b64, onCancel }) => {
  const [uploadState, setUploadState] = useState(uploadStatus.NONE);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const createMedium = useMutation(CREATE_MEDIUM, {
    variables: {
      picture: b64,
      title,
      description
    },
    refetchQueries: [{ query: GET_ALL_USER_MEDIA }],
    update: () => setUploadState(uploadStatus.SUCCESS)
  });

  const isAnyError = title === '' || title.trim() === '';

  return (
    <React.Fragment>
      <Col xs="12" md="6" className="bg-info">
        <Row className="align-items-center h-100">
          <img src={b64} alt="to upload" className="img-fluid mx-auto shadow-sm" />
        </Row>
      </Col>
      <Col xs="12" md="6" className="small">
        <ListGroup>
          <InputWithValidation
            onUpdate={e => setTitle(e)}
            validate={e => e !== '' && e.trim() !== ''}
            type="text"
            title={t('title')}
            feedBack="Un titre est nécessaire"
          />
          <InputWithValidation
            onUpdate={e => setDescription(e)}
            validate={() => true}
            type="text"
            title={t('description')}
          />
          <ListGroupItem className="border-0">
            <Option
              title="Rendre privée"
              description="Une photo privée ne peut être vue que par vos amis"
              color="primary"
            />
          </ListGroupItem>
          <ListGroupItem tag="div" className="border-0 text-center">
            <LoadingButton
              color="primary"
              className="mx-2"
              loading={uploadState === uploadStatus.LOADING}
              disabled={isAnyError}
              onClick={() => {
                if (!isAnyError) {
                  setUploadState(uploadStatus.LOADING);
                  createMedium().then(null, () => {
                    setUploadState(uploadStatus.ERROR);
                  });
                }
              }}
            >
              <span>{t('upload')}</span>
            </LoadingButton>
            <Button className="mx-2" onClick={onCancel}>
              {t('back')}
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </React.Fragment>
  );
};

PictureUploader.propTypes = {
  t: PropTypes.func.isRequired,
  b64: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withTranslation('picture_gallery')(PictureUploader);
