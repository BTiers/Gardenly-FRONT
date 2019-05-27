import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import { Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';

import InputWithValidation from 'components/input/InputWithValidation';
import LoadingButton from 'components/buttons/LoadingButton';
import Option from 'components/input/Option';

const uploadStatus = {
  NONE: -1,
  LOADING: 0,
  ERROR: 1,
  SUCCESS: 2
};

const PictureUploader = ({ t, blob, onCancel }) => {
  const [uploadState, setUploadState] = useState(uploadStatus.NONE);
  const [title, setTitle] = useState('Titre par défaut');
  const [description, setDescription] = useState('');

  return (
    <React.Fragment>
      <Col xs="12" md="6" className="bg-info">
        <Row className="align-items-center h-100">
          <img src={blob} alt="to upload" className="img-fluid mx-auto shadow-sm" />
        </Row>
      </Col>
      <Col xs="12" md="6" className="small">
        <ListGroup>
          <InputWithValidation
            onUpdate={e => setTitle(e)}
            validate={e => e !== ''}
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
  blob: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withTranslation('picture_gallery')(PictureUploader);
