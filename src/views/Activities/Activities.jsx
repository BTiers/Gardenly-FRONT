import React from 'react';

import { Row, Col, Card, CardBody } from 'reactstrap';
import FlowerTooltip from '../../components/tooltips/FlowerTooltip';

function FakeActivity() {
  return (
    <Col s="12" md="6" xl="4" className="my-2">
      <Row>
        <Col xs="4">
          <img
            src="https://s3.greefine.ovh/dev/7ddab77e73276eba7637da8b54e28423c330ef26/5d6ed914-3478-466c-be4c-9a67f188f3b1.png"
            className="img-fluid"
            alt="admin@bootstrapmaster.com"
          />
        </Col>
        <Col xs="8">
          <Row>
            <h4 className="text-uppercase">
              <span className="text-primary">Arroser mes </span>
              <FlowerTooltip
                id="rose"
                link="/flowers"
                plantId="58ec8c67-411e-4b4c-9bb0-e88ad18a8a1b"
              >
                <span className="text-primary">roses</span>
              </FlowerTooltip>
            </h4>
          </Row>
          <Row>
            <p>
              <span className="text-muted">
                Deux fois par semaine le premier mois s'il fait sec
              </span>
              <br />
              <strong>Dernière fois: le lundi 12 juin 2017</strong>
            </p>
          </Row>
        </Col>
      </Row>
    </Col>
  );
}

function Activities() {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardBody className="pb-0">
              <h2 className="text-primary text-uppercase font-weight-bold">Cette semaine</h2>
              <h4 className="text-dark text-uppercase font-weight-bold">Mercredi 14 Juin 2019</h4>
              <hr />
              <Row>
                <FakeActivity />
                <FakeActivity />
              </Row>
              <h2 className="mt-3 text-primary text-uppercase font-weight-bold">
                Les tâches à prevoir
              </h2>
              <h4 className="text-dark text-uppercase font-weight-bold">
                Pour les semaines à venir
              </h4>
              <hr />
              <Row>
                <FakeActivity />
                <FakeActivity />
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Activities;
