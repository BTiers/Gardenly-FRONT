import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Card, CardBody } from 'reactstrap';
import { useQuery } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GET_ALL_USER_MEDIA } from 'apollo/queries/queries';
import Snackbar from 'components/snackbar/Snackbar';
import Picture from './Picture';
import AddPicture from './AddPicture';

const snackType = {
  NONE: '',
  UPLOAD_S: 'successful_upload',
  DELETE_S: 'successful_delete',
  UPDATE_S: 'successful_update'
};

export default function PicturesGallery({ mode, toggle }) {
  const [t] = useTranslation('picture_gallery');
  const { data, error, loading } = useQuery(GET_ALL_USER_MEDIA);
  const [snackState, setSnackState] = useState(snackType.NONE);

  if (loading) return null;
  if (error) return <Redirect to="/500" />;

  const {
    getCurrentUser: { media }
  } = data;

  const hasMedia = media.length > 0;
  return (
    <div className="animated fadeIn">
      <Card>
        <CardBody style={{ minHeight: 'calc(100vh - 204px)' }}>
          <Row noGutters>
            {mode === 'gallery' ? (
              <AddPicture
                asVignette={hasMedia}
                onUpload={() => setSnackState(snackType.UPLOAD_S)}
              />
            ) : null}
            {media.map(picture => (
              <Picture
                mode={mode}
                toggleParrent={toggle}
                picture={picture}
                key={picture.id}
                onUpdate={() => setSnackState(snackType.UPDATE_S)}
                onDelete={() => setSnackState(snackType.DELETE_S)}
              />
            ))}
            <Snackbar
              autoHideDuration={6000}
              onClose={() => setSnackState(snackType.NONE)}
              message={t(snackState)}
              open={snackState !== snackType.NONE}
            />
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

PicturesGallery.propTypes = {
  mode: PropTypes.string,
  toggle: PropTypes.func.isRequired
};

PicturesGallery.defaultProps = {
  mode: 'gallery'
};
