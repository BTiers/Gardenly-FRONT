import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';
import { Row, Col, Modal, ModalBody, ModalHeader, Button } from 'reactstrap';

import Dropzone from 'react-dropzone';

import UploadPic from './UploadPic';
import CenterY from 'components/image/CenterY';

function AddPicture({ t, asIcon }) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState({ acceptedFiles: [], rejectedFiles: [] });

  useEffect(() => () =>
    files.acceptedFiles.forEach(file => URL.revokeObjectURL(file.preview))
  );

  const toggle = () => {
    setOpen(!open);
    setFiles({ acceptedFiles: [], rejectedFiles: [] });
  };

  return (
    <React.Fragment>
      {asIcon ? (
        <span
          style={{ fontSize: '0.8rem' }}
          className="text-primary icon-plus cursor-clickable card-header-action"
          onClick={toggle}
        />
      ) : (
        <Col xs="12" className="mb-4">
          <div
            className="cursor-clickable h-100 bg-light w-100 rounded mx-auto"
            style={{ minHeight: 200 }}
            onClick={toggle}
          >
            <CenterY>
              <Row className="justify-content-center">
                <span style={{ fontSize: '3rem' }} className="icon-camera" />
                <span
                  style={{ fontSize: '1rem' }}
                  className="text-primary icon-plus"
                />
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
      <Modal isOpen={open} toggle={toggle} className="modal-lg modal-primary">
        <ModalHeader toggle={toggle}>{t('add_picture')}</ModalHeader>
        <ModalBody>
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
            {({ getRootProps, getInputProps, isDragActive }) => {
              if (files.rejectedFiles.length > 0) return 'error';
              if (files.acceptedFiles.length > 0)
                return (
                  <UploadPic
                    file={files.acceptedFiles[0]}
                    setFiles={setFiles}
                  />
                );
              return (
                <Col
                  xs="12"
                  className="align-items-center"
                  style={{ minHeight: 300 }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Row className="justify-content-center align-middle">
                    <h3>Drag and Drop a picture</h3>
                  </Row>
                  <Row className="justify-content-center align-middle">
                    <h4>
                      or&nbsp;
                      <span className="text-info">click</span>
                      &nbsp;to select files to upload.
                    </h4>
                  </Row>
                </Col>
              );
            }}
          </Dropzone>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

AddPicture.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('picture_gallery')(AddPicture);
