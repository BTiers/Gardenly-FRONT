import React from 'react';

import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';

import LunarPhase from './GardenWidgets/LunarPhase/LunarPhase';

export default function GardenActivity() {
  return (
    <Row className="h-100 p-2" noGutters>
      <Col sm={9} className="p-2">
        <Card>
          <CardHeader>Activities</CardHeader>
          <CardBody>Activities goes here</CardBody>
        </Card>
      </Col>
      <Col sm={3} className="w-100">
        <Row className="p-2" noGutters>
          <Card className="w-100">
            <CardHeader>Meteo</CardHeader>
            <CardBody>Meteo goes here</CardBody>
          </Card>
        </Row>
        <Row className="p-2" noGutters>
          <LunarPhase />
        </Row>
      </Col>
    </Row>
  );
}
