import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';
import { Row, Col, Modal, ModalBody, ModalHeader, Button, Badge } from 'reactstrap';
import { FiPlus, FiImage } from 'react-icons/fi';

import Dropzone from 'react-dropzone';

import DropZone from './DropZone';
import Cropper from './Cropper';

import STEPS from './_AddPictureSteps';

function AddPicture({ t, asButton }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState({ acceptedFiles: [], rejectedFiles: [] });
  const [currentStep, setStep] = useState(STEPS.DROP);

  useEffect(() => () => files.acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview)), []);

  const toggle = () => {
    setOpen(!open);
    setFiles({ acceptedFiles: [], rejectedFiles: [] });
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
        <Col xs="12" className="py-3" style={{ minHeight: 'calc(100vh - 204px)' }}>
          <Row
            className="align-items-center h-100 text-muted"
            onClick={toggle}
            role="button"
            tabIndex={0}
            onKeyPress={toggle}
          >
            <Col className="mx-auto">
              <div className="my-4 text-center">
                <span>
                  <div className="font-weight-light">
                    <FiImage size={60} className="text-info" />
                    <Badge color="info" className="position-absolute text-light">
                      <FiPlus />
                    </Badge>
                  </div>
                  <div className="m-1">
                    <h4>{t('no_picture_yet')}</h4>
                  </div>
                  <div className="m-1 text-secondary">
                    <h5>{t('get_started_uploading')}</h5>
                  </div>
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      )}
      <Modal centered isOpen={open} toggle={toggle} className="modal-lg text-muted">
        <ModalHeader toggle={toggle}>
          <span className="small text-uppercase">{t(currentStep)}</span>
        </ModalHeader>
        <ModalBody className="p-0 p-sm-2 p-md-3">
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
                      onStepChange={step => setStep(step)}
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
