import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Link from 'react-router-dom/Link';

import { useQuery } from 'react-apollo-hooks';
import { GET_USER_GARDEN_ACT } from '../../apollo/queries/queries';

import FlowerTooltip from '../../components/tooltips/FlowerTooltip';

function FakeActivity({ id }) {
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
              <FlowerTooltip id={id} link="/flowers" plantId="58ec8c67-411e-4b4c-9bb0-e88ad18a8a1b">
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

// ROAD TO GARDEN : /garden/TestDB

function GardenActivities({ nodes: { name, plants } }) {
  return (
    <div>
      <Row>
        <Col>
          <h2 className="text-primary text-uppercase font-weight-bold">Mon jardin : {name} </h2>
          {plants.length !== 0 ? (
            <h4 className="text-dark text-uppercase font-weight-bold">
              Vous avez {plants.length} plantes à entretenir en cette journee
            </h4>
          ) : (
            <h4 className="text-muted text-uppercase font-weight-bold">
              Savez vous plantez des choux ? Votre jardin est vide pour le moment.
            </h4>
          )}
          {plants.length !== 0 ? (
            <Col className="col-6 col-md-4">
              <Row>
                <img src={plants[0].plant.photo} className="img-fluid" alt={plants[0].plant.name} />
                <h4 className="text-uppercase">
                  <FlowerTooltip
                    id={plants[0].plant.name}
                    link="/flowers"
                    plantId={plants[0].plant.id}
                  >
                    <span className="text-primary">{plants[0].plant.name}</span>
                  </FlowerTooltip>
                </h4>
              </Row>
              <h4>
                Planté le :{' '}
                {new Intl.DateTimeFormat('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit'
                }).format(new Date(plants[0].plant.createdAt))}
              </h4>
              <h8>Des informations utiles : {plants[0].plant.tips}</h8>
            </Col>
          ) : (
            <Link to={'/garden/' + name}>
              <br />
              <h4 className="text-primary text-center text-uppercase font-weight-bold">
                Allez editer votre jardin maintenant.
              </h4>
            </Link>
          )}
        </Col>
      </Row>
      <hr />
    </div>
  );
}

function Activities() {
  const date = new Date();

  const { data, loading, error } = useQuery(GET_USER_GARDEN_ACT);

  if (loading) return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  if (error) return <div className="animated fadeIn pt-1 text-center">Error</div>;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardBody className="pb-0">
              <h2 className="text-primary text-uppercase font-weight-bold">Cette semaine</h2>
              <h4 className="text-dark text-uppercase font-weight-bold">
                {`Aujourd'hui : ${new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(
                  date
                )} ${date.getDate()} ${new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(
                  date
                )}`}
              </h4>
              <hr />
              <h2 className="text-primary text-center text-uppercase font-weight-bold">
                Meteo de la journee
              </h2>
              <hr />
              {data ? (
                data.gardens.nodes.map(nodes => {
                  return <GardenActivities key={nodes.id} nodes={nodes} />;
                })
              ) : (
                <h2 className="text-primary text-center text-uppercase font-weight-bold">Prout</h2>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Activities;
