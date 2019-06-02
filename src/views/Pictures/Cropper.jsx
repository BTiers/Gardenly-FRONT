import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

import LoadingButton from 'components/buttons/LoadingButton';
import PictureUploader from './PictureUploader';

import STEPS from './_AddPictureSteps';

function prepareCanvas(width, height) {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function getMargin(axis, axisLength, minSize) {
  if (axisLength < minSize) return axis + (minSize - axisLength) / 2;
  return 0;
}

function drawImage(ctx, image, crop, scaleX, scaleY) {
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    getMargin(crop.x * scaleX, image.width, crop.minWidth),
    getMargin(crop.y * scaleY, image.height, crop.minWidth),
    crop.width,
    crop.height
  );
}

function getCroppedImg(image, crop) {
  const mainCanvas = prepareCanvas(crop.width, crop.height);

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const ctx = mainCanvas.getContext('2d');

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

  if (image.naturalWidth < crop.minWidth || image.naturalHeight < crop.minWidth) {
    const tmpCanvas = prepareCanvas(image.naturalWidth, image.naturalHeight);

    tmpCanvas.getContext('2d').drawImage(image, 0, 0);
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 30;

    drawImage(ctx, tmpCanvas, crop, scaleX, scaleY);
  } else drawImage(ctx, image, crop, scaleX, scaleY);

  return new Promise(resolve => {
    const b64 = mainCanvas.toDataURL('image/jpeg');
    resolve(b64);
  });
}

const Cropper = React.memo(
  ({ t, file, onCancel, onStepChange, onUpload }) => {
    const DEFAULT_CROP_STATE = { aspect: 1, minWidth: 256, width: 256, height: 256, x: 0, y: 0 };
    const [crop, setCrop] = useState(DEFAULT_CROP_STATE);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [resultingB64, setResultingB64] = useState(null);

    useEffect(() => onStepChange(STEPS.CROP), []);

    if (resultingB64 !== null)
      return (
        <PictureUploader
          b64={resultingB64}
          onCancel={() => {
            URL.revokeObjectURL(resultingB64);
            setResultingB64(null);
            setCrop(DEFAULT_CROP_STATE);
            onStepChange(STEPS.CROP);
          }}
          onUpload={onUpload}
        />
      );

    return (
      <Col xs="12" className="p-xs-0 p-sm-3">
        <Row className="align-items-center h-100">
          <Col xs="12" md="9" className="p-0 p-sm-2 p-md-3 mx-auto">
            <ListGroup>
              <ListGroupItem
                tag="div"
                className="border-0 text-center"
                style={{ minWidth: 256, minHeight: 256 }}
              >
                <ReactCrop
                  src={file.preview}
                  crop={crop}
                  onChange={newCrop => {
                    if (newCrop.width >= 256) setCrop(newCrop);
                  }}
                  onImageLoaded={img => setImage(img)}
                  style={{ backgroundColor: '#f0f3f5' }}
                  imageStyle={{ maxHeight: 'fit-content', margin: 'auto' }}
                />
              </ListGroupItem>
              <ListGroupItem tag="div" className="border-0 text-center">
                <LoadingButton
                  color="primary"
                  className="mx-2"
                  loading={loading}
                  onClick={async () => {
                    if (image && crop.width && crop.height) {
                      setLoading(true);
                      const croppedImageUrl = await getCroppedImg(image, crop, file.name);
                      onStepChange(STEPS.UPLOAD);
                      setResultingB64(croppedImageUrl);
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
  onStepChange: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default withTranslation('crop')(Cropper);
