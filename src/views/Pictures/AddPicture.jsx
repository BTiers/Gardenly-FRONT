import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';
import { Row, Col, Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import { FiPlus } from 'react-icons/fi';

import Dropzone from 'react-dropzone';

import CenterY from 'components/image/CenterY';

import UploadPic from './UploadPic';
import DropZone from './DropZone';
import Cropper from './Cropper';

function AddPicture({ t, asButton }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState({ acceptedFiles: [], rejectedFiles: [] });
  const [acceptedCrop, setAcceptedCrop] = useState(false);

  useEffect(() => () => files.acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview)), []);

  const toggle = () => {
    setOpen(!open);
    setFiles({ acceptedFiles: [], rejectedFiles: [] });
  };

  const getModalTitle = () => {
    if (acceptedCrop) return t('infos');
    if (files.acceptedFiles.length) return t('crop-image');
    return t('add_picture');
  };

  return (
    <React.Fragment>
      {asButton ? (
        <Button
          className="position-absolute"
          style={{ right: '1rem', bottom: '1rem' }}
          color="primary"
          onClick={toggle}
        >
          <FiPlus />
        </Button>
      ) : (
        <Col xs="12" className="mb-4 h-100">
          <div
            className="cursor-clickable h-100 bg-light w-100 rounded mx-auto"
            style={{ minHeight: 200 }}
            onClick={toggle}
            onKeyPress={toggle}
            role="button"
            tabIndex={0}
          >
            <CenterY>
              <Row className="justify-content-center">
                <span style={{ fontSize: '3rem' }} className="icon-camera" />
                <span style={{ fontSize: '1rem' }} className="text-primary icon-plus" />
              </Row>
              <Row className="justify-content-center mt-3">
                <h5 className="text-primary">
                  <strong>{t('add_picture')}</strong>
                </h5>
              </Row>
            </CenterY>
          </div>
        </Col>
      )}
      <Modal centered isOpen={open} toggle={toggle} className="modal-lg text-muted">
        <ModalHeader toggle={toggle}>
          <span className="small text-uppercase">{getModalTitle()}</span>
        </ModalHeader>
        <ModalBody>
          <Row style={{ minHeight: 300 }} className="mx-2 my-2">
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles, rejectedFiles) => {
                let acceptedWithThumb;

                if (rejectedFiles.length === 0) {
                  acceptedWithThumb = acceptedFiles.map(file =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file)
                    })
                  );
                  setFiles({ acceptedFiles: acceptedWithThumb, rejectedFiles });
                } else setFiles({ acceptedFiles, rejectedFiles });
              }}
              accept="image/jpeg, image/png"
            >
              {({ getRootProps, getInputProps }) => {
                if (files.rejectedFiles.length > 0) return 'error';
                if (files.acceptedFiles.length > 0)
                  return (
                    <Cropper
                      file={files.acceptedFiles[0]}
                      onCancel={() => setFiles({ acceptedFiles: [], rejectedFiles: [] })}
                      onValidate={() => setAcceptedCrop(true)}
                    />
                  );
                //                return <UploadPic file={files.acceptedFiles[0]} setFiles={setFiles} />;
                return <DropZone getInputProps={getInputProps} getRootProps={getRootProps} />;
              }}
            </Dropzone>
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

AddPicture.defaultProps = {
  asButton: false
};

AddPicture.propTypes = {
  t: PropTypes.func.isRequired,
  asButton: PropTypes.bool
};

export default withTranslation('picture_gallery')(AddPicture);
