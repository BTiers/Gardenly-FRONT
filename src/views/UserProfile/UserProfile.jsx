import React from 'react';

import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';

import { useQuery } from 'react-apollo-hooks';
import { GET_USERS } from '../../apollo/queries/queries';

export default function UserProfile() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  if (error) return <div className="animated fadeIn pt-1 text-center">Error</div>;

  const {
    username,
    firstName,
    lastName,
    id,
    phoneNumber,
    age,
    dateOfBirth,
    address,
    avatar
  } = data.getCurrentUser;

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          <i className="icon-user" />
          <strong>Profil</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col sm="12" className="text-center font-weight-bold text-muted text-uppercase small">
              En developpement
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
