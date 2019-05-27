import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';

import { FiImage } from 'react-icons/fi';

const DropZone = ({ t, getRootProps, getInputProps }) => (
  <Col style={{ border: '1px dashed #73818f' }} xs="12" className="p-3" {...getRootProps()}>
    <input {...getInputProps()} />
    <Row className="align-items-center h-100">
      <Col xs="9" md="6" className="mx-auto">
        <div className="my-4 text-center">
          <span>
            <div>
              <FiImage size={30} className="text-primary" />
            </div>
            <div className="m-1">{t('drag-and-drop-pic')}</div>
            <div className="m-1 text-secondary">{t('or-click')}</div>
          </span>
        </div>
      </Col>
    </Row>
  </Col>
);

DropZone.propTypes = {
  t: PropTypes.func.isRequired,
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired
};

export default withTranslation('picture_gallery')(DropZone);
