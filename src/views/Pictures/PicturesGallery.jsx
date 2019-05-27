import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import { Row, Card, CardBody } from 'reactstrap';
import { useQuery } from 'react-apollo-hooks';

import { GET_ALL_USER_MEDIA } from 'apollo/queries/queries';
import { Redirect } from 'react-router-dom';

import Picture from './Picture';
import AddPicture from './AddPicture';

export default function PicturesGallery({ history }) {
  const { data, error, loading } = useQuery(GET_ALL_USER_MEDIA);

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
          <Row
            className={className({
              'justify-content-center': !hasMedia,
              'align-items-center': !hasMedia
            })}
            style={{ minHeight: 'calc(100vh - 204px)' }}
          >
            {media.length > 0 ? (
              media.map(picture => <Picture picture={picture} key={picture.id} />)
            ) : (
              <AddPicture asButton/>
            )}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

PicturesGallery.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};
