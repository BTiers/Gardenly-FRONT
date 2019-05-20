import React from 'react';
import PropTypes from 'prop-types';

import { Row, Card, CardHeader, CardBody } from 'reactstrap';
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

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="icon-camera" />
          <strong>Pictures</strong>
          {media.length > 0 ? (
            <div className="card-header-actions">
              <AddPicture asIcon />
            </div>
          ) : null}
        </CardHeader>
        <CardBody>
          <Row>
            {media.length > 0 ? null : <AddPicture />}
            {media.map(picture => {
              return <Picture picture={picture} key={picture.id} />;
            })}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

PicturesGallery.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};
