import React from 'react';
import PropTypes from 'prop-types';

import { Row, Card, CardHeader, CardBody } from 'reactstrap';
import { useQuery } from 'react-apollo-hooks';

import { GET_ALL_MEDIA } from 'apollo/queries/queries';
import { Redirect } from 'react-router-dom';

import Picture from './Picture';
import AddPicture from './AddPicture';

export default function PicturesGallery({ history }) {
  const { data, error, loading } = useQuery(GET_ALL_MEDIA);

  if (loading) return null;
  if (error) return <Redirect to="/500" />;

  const { getAllMedia } = data;
  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="icon-camera" />
          <strong>Pictures</strong>
          {getAllMedia.edges.length > 0 ? (
            <div className="card-header-actions">
              <AddPicture asIcon />
            </div>
          ) : null}
        </CardHeader>
        <CardBody>
          <Row>
            {getAllMedia.edges.length > 0 ? null : <AddPicture />}
            {getAllMedia.edges.map(picture => {
              return <Picture picture={picture.node} key={picture.node.id} />;
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
