import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import Link from 'react-router-dom/Link';

import { useQuery } from 'react-apollo-hooks';
import { GET_USER_GARDEN_ACT } from '../../apollo/queries/queries';

import { FillableDroplet } from '../../components/icons/FillableIcon';
import { GardenWeather } from '../../components/weather/weather';

import FlowerTooltip from '../../components/tooltips/FlowerTooltip';

function WaterNeed(scale, id) {
  const output = [];
  const dropCount = scale / 3;

  for (let i = dropCount; i >= 0; i -= 1) {
    output.push(<FillableDroplet color="#63c2de" fillAt={10} size={18} id={id} key={id + i} />);
  }

  for (let j = 1; j + dropCount < 4; j += 1) {
    output.push(<FillableDroplet color="#63c2de" fillAt={0} size={18} id={id + j} key={id + -j} />);
  }

  return output;
}

function GardenPlantInfo({ plant: { name, id, createdAt, tips, photo, waterNeed } }) {
  return (
    <Col className="col-sm-4">
      <Row>
        <img src={photo} className="img-fluid" alt={name} />
        <h4 className="text-uppercase">
          <FlowerTooltip id={name} link="/flowers" plantId={id}>
            <span className="text-primary">{name}</span>
          </FlowerTooltip>
        </h4>
      </Row>
      <h4>
        {'Planté le : '}
        {new Intl.DateTimeFormat('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }).format(new Date(createdAt))}
      </h4>
      <div>{`Besoin en eau : ${WaterNeed(waterNeed, id)}`}</div>
      <h6>{`Des informations utiles : ${tips}`}</h6>
    </Col>
  );
}

function GardenActivities({ nodes: { name, plants } }) {
  return (
    <div>
      <Row>
        <Col>
          <h2 className="text-primary text-uppercase font-weight-bold">{`Mon jardin : ${name}`}</h2>
          {plants.length !== 0 ? (
            <h4 className="text-dark text-uppercase font-weight-bold">
              {`Vous avez ${plants.length} plantes à entretenir en cette journee`}
            </h4>
          ) : (
            <h4 className="text-muted text-uppercase font-weight-bold">
              Savez vous plantez des choux ? Votre jardin est vide pour le moment.
            </h4>
          )}
          <Row>
            {plants.length !== 0 ? (
              plants.map(({ plant, id }) => <GardenPlantInfo key={id} plant={plant} />)
            ) : (
              <Link to={`/garden/${name}`}>
                <br />
                <h4 className="text-primary text-center text-uppercase font-weight-bold">
                  Allez editer votre jardin maintenant.
                </h4>
              </Link>
            )}
          </Row>
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

  // console.log(data.gardens.nodes[0].country);
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
              {data.gardens.nodes.length ? (
                <GardenWeather city={data.gardens.nodes[0].country} />
              ) : (
                <GardenWeather city="France" />
              )}
              <hr />
              {data.gardens.nodes.length ? (
                data.gardens.nodes.map(nodes => <GardenActivities key={nodes.id} nodes={nodes} />)
              ) : (
                <Link to="/garden/create">
                  <br />
                  <h4 className="text-primary text-center text-uppercase font-weight-bold">
                    Allez creer votre premier jardin maintenant.
                  </h4>
                </Link>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Activities;
