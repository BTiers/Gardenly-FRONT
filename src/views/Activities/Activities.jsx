/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Table, Collapse } from 'reactstrap';
import Moment from 'react-moment';

import { useQuery } from 'react-apollo-hooks';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'react-router-dom/Link';
import { GET_USER_GARDEN_ACT } from '../../apollo/queries/queries';

import { FillableDroplet } from '../../components/icons/FillableIcon';
import { GardenWeather } from '../../components/weather/weather';

import FlowerTooltip from '../../components/tooltips/FlowerTooltip';
import Flower from '../FlowerDB/Flower';

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

function GardenPlantInfo({ name, plants, isOpen }) {
  if (plants.length === 0)
    return (
      <Collapse
        tag="tr"
        isOpen={isOpen}
        className="text-uppercase text-primary text-muted small text-center my-3 justify-content-center"
      >
        <td className="text-center col-12 border-0">
          Aucune fleur encore plantés dans ce jardin
          <br />
          <Link to={`/garden/${name}/edit`}>
            <strong>Cliquer içi pour éditer ce jardin</strong>
          </Link>
        </td>
      </Collapse>
    );

  return (
    <Collapse tag="tr" isOpen={isOpen}>
      <td className="col-12">
        {plants.map(({ id, plant }) => (
          <Row key={id} className="my-4">
            <Col xs="12" md="3" className="text-center align-self-center">
              <img className="img-fluid" src={plant.photo} alt={plant.name} />
              <br />
              <span className="small text-muted">
                Planté <Moment fromNow>{plant.createdAt}</Moment>
              </span>
            </Col>
            <Col xs="12" md="6" className="align-self-center">
              <span className="small text-muted">
                <strong>Conseils d'entretien:</strong>
              </span>
              <br />
              <span className="small text-muted">{plant.tips}</span>
            </Col>
            <Col xs="12" md="3" className="text-center align-self-center">
              <span className="small text-muted">Besoin en eau</span>
              <br />
              {WaterNeed(plant.waterNeed, plant.id)}
            </Col>
            <hr />
          </Row>
        ))}
      </td>
    </Collapse>
  );
}

function GardenActivities({ updatedAt, name, plants, country }) {
  const [uniqueFlowerCount, setUniqueFlowerCount] = useState(0);
  const [mostRepresentedFlowerURL, setMostRepresentedFlowerURL] = useState(null);
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const plantCount = {};
    let highestKey = { count: 0, photo: '' };
    let uniqueFC = 0;

    plants.forEach(({ plant }) => {
      if (plant)
        plantCount[plant.name] = {
          photo: plant.photo,
          count: (plantCount[plant.name] ? plantCount[plant.name].count : 0) + 1
        };
    });

    // eslint-disable-next-line no-undef
    for (const key in plantCount)
      if (Object.prototype.hasOwnProperty.call(plantCount, key)) {
        highestKey = highestKey.count < plantCount[key].count ? plantCount[key] : highestKey;
        uniqueFC += 1;
      }
    setUniqueFlowerCount(uniqueFC);
    setMostRepresentedFlowerURL(highestKey.photo);
  }, []);

  return (
    <React.Fragment>
      <tr className="d-flex" onClick={toggle}>
        <td className="text-center col-1">
          <div className="avatar">
            <img
              src={mostRepresentedFlowerURL}
              style={{ minHeight: 35, maxHeight: 35, objectFit: 'cover' }}
              className="img-avatar"
              alt=""
            />
          </div>
        </td>
        <td className="col-6">
          <div>
            <strong>{name}</strong>
          </div>
          <div className="small text-muted">{country || 'Non localisé'}</div>
        </td>
        <td className="col-2 text-center">
          <div>
            <strong>{`${uniqueFlowerCount} fleurs`}</strong>
            <div className="small text-muted">Unique</div>
          </div>
        </td>
        <td className="text-center col-2">
          <strong>Météo</strong>
          <GardenWeather city={country || 'France'} />
        </td>
        <td className="text-center col-1">
          {open ? <FiMinus size={18} className="mt-2" /> : <FiPlus size={18} className="mt-2" />}
        </td>
      </tr>
      <GardenPlantInfo name={name} plants={plants} isOpen={open} />
    </React.Fragment>
  );
}

function Activities() {
  const date = new Date();

  const { data, loading, error } = useQuery(GET_USER_GARDEN_ACT);

  if (loading) return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  if (error) return <div className="animated fadeIn pt-1 text-center">Error</div>;

  const { gardens } = data;

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
              <Table hover responsive className="table-outline mb-0 d-none d-sm-table mt-4">
                <tbody>
                  {gardens.nodes.map(({ id, updatedAt, country, name, plants }) => (
                    <GardenActivities
                      key={id}
                      updatedAt={updatedAt}
                      country={country}
                      name={name}
                      plants={plants}
                    />
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Activities;

/*
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
*/
