import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import LoadingButton from 'components/buttons/LoadingButton';
import PictureUploader from './PictureUploader';

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      if (!blob) return;
      // eslint-disable-next-line no-param-reassign
      blob.name = fileName;
      const fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/jpeg');
  });
}

const Cropper = React.memo(
  ({ t, file, onCancel, onValidate }) => {
    const DEFAULT_CROP_STATE = { aspect: 1, minWidth: 256, width: 256 };
    const [crop, setCrop] = useState(DEFAULT_CROP_STATE);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [resultingBlob, setResultingBlob] = useState(null);

    if (resultingBlob !== null)
      return (
        <PictureUploader
          blob={resultingBlob}
          onCancel={() => {
            URL.revokeObjectURL(resultingBlob);
            setResultingBlob(null);
            setCrop(DEFAULT_CROP_STATE);
          }}
        />
      );

    return (
      <Col xs="12" className="p-3">
        <Row className="align-items-center h-100">
          <Col xs="9" md="6" className="mx-auto">
            <ListGroup>
              <ReactCrop
                src={file.preview}
                crop={crop}
                onChange={newCrop => setCrop(newCrop)}
                onImageLoaded={img => setImage(img)}
                style={{ backgroundColor: '#f0f3f5' }}
                imageStyle={{ maxHeight: 'fit-content' }}
              />
              <ListGroupItem tag="div" className="border-0 text-center">
                <LoadingButton
                  color="primary"
                  className="mx-2"
                  loading={loading}
                  onClick={async () => {
                    if (image && crop.width && crop.height) {
                      setLoading(true);
                      const croppedImageUrl = await getCroppedImg(image, crop, file.name);
                      onValidate();
                      setResultingBlob(croppedImageUrl);
                      setLoading(false);
                    }
                  }}
                >
                  <span>{t('validate')}</span>
                </LoadingButton>
                <Button className="mx-2" onClick={onCancel}>
                  {t('cancel')}
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Col>
    );
  },
  ({ file: oldFile }, { file: newFile }) => oldFile.path === newFile.path
);

Cropper.propTypes = {
  t: PropTypes.func.isRequired,
  file: PropTypes.shape({
    preview: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired
};

export default withTranslation('crop')(Cropper);
