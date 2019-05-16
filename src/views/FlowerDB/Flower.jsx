import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import classNames from 'classnames';
import {
  Collapse,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip
} from 'reactstrap';
import { FillableDroplet } from '../../components/icons/FillableIcon';
import {
  GetRusticityNamingFromScale,
  GetRusticityTypeFromScale,
  GetWaterNeedNamingFromScale
} from '../../utils/flowers/ScaleToWord';
import { FiSquare, FiPlus, FiMinus } from 'react-icons/fi';
import { MonthPeriod, MonthHeader } from './MonthPeriod';
import { PHSlider } from './PHSlider';

function WaterNeed(scale, id) {
  let output = [];
  const dropCount = scale / 3;

  for (let i = dropCount; i >= 0; i -= 1) {
    output.push(
      <FillableDroplet
        color="#63c2de"
        fillAt={10}
        size={18}
        id={id}
        key={id + i}
      />
    );
  }

  for (let j = 1; j + dropCount < 4; j += 1) {
    output.push(
      <FillableDroplet
        color="#63c2de"
        fillAt={0}
        size={18}
        id={id + j}
        key={id + -j}
      />
    );
  }

  return output;
}

function FlowerFull({ isOpen, flower }) {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <React.Fragment>
      <Collapse tag="tr" isOpen={isOpen}>
        <td className="col-12">
          <Row>
            <Col xs="12" md="3" className="text-center align-self-center">
              <img
                className="img-fluid"
                src={flower.thumbnail}
                alt={flower.name + ' thumbnail'}
              />
            </Col>
            <Col xs="12" md="9">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: activeTab === '1'
                    })}
                    onClick={() => setActiveTab('1')}
                  >
                    <span className="font-weight-bold text-muted text-uppercase small">
                      Description & Conseils
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: activeTab === '2'
                    })}
                    onClick={() => setActiveTab('2')}
                  >
                    <span className="font-weight-bold text-muted text-uppercase small">
                      Calendrier
                    </span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: activeTab === '3'
                    })}
                    onClick={() => setActiveTab('3')}
                  >
                    <span className="font-weight-bold text-muted text-uppercase small">
                      Informations complémentaires
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <ListGroup
                    className="list-group-accent list-group-item-action"
                    tag={'div'}
                  >
                    <ListGroupItem className="list-group-item-accent-secondary bg-light font-weight-bold text-muted text-uppercase small">
                      Description
                    </ListGroupItem>
                    <ListGroupItem tag="a" className="list-group-item-divider">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      At modo dixeras nihil in istis rebus esse, quod
                      interesset. Dic in quovis conventu te omnia facere, ne
                      doleas. Duo Reges: constructio interrete. At habetur! Et
                      ego id scilicet nesciebam! Sed ut sit, etiamne post mortem
                      coletur? Polemoni et iam ante Aristoteli ea prima visa
                      sunt, quae paulo ante dixi. Quicquid porro animo cernimus,
                      id omne oritur a sensibus; Laboro autem non sine causa;
                    </ListGroupItem>
                    <ListGroupItem className="list-group-item-accent-secondary bg-light font-weight-bold text-muted text-uppercase small">
                      Conseils d'entretien
                    </ListGroupItem>
                    <ListGroupItem tag="a" className="list-group-item-divider">
                      Taillez avec parcimonie: la taille s'effectue en fin
                      d'hiver, au redémarrage de la végétation. Elle doit être
                      légère pour ne pas freiner la croissance de la plante. Il
                      est préférable de recourber les branches à l'horizontale
                      ou vers le sol. Cette technique stimulant d'ailleurs
                      efficacement la ramification.sa;
                    </ListGroupItem>
                  </ListGroup>
                </TabPane>
                <TabPane tabId="2">
                  <ListGroup
                    className="list-group-accent list-group-item-action"
                    tag={'div'}
                  >
                    <ListGroupItem className="list-group-item-accent-secondary bg-light font-weight-bold text-muted text-uppercase small">
                      Calendrier d'entretien
                    </ListGroupItem>
                    <ListGroupItem tag="a" className="list-group-item-divider">
                      <Row>
                        <Col md="2" className="align-self-center" />
                        <Col md="10">{MonthHeader()}</Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md="2" className="align-self-center">
                          Période de <strong>floraison</strong>
                        </Col>
                        <Col md="10">
                          {MonthPeriod(
                            flower.blossomingStart,
                            flower.blossomingEnd,
                            '#63c2de'
                          )}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md="2" className="align-self-center">
                          Période de <strong>taille</strong>
                        </Col>
                        <Col md="10">
                          {MonthPeriod(
                            flower.blossomingStart,
                            flower.blossomingEnd,
                            '#4dbd74'
                          )}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md="2" className="align-self-center">
                          Période de <strong>plantation</strong>
                        </Col>
                        <Col md="10">
                          {MonthPeriod(
                            flower.blossomingStart,
                            flower.blossomingEnd,
                            '#ffc107'
                          )}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </TabPane>
                <TabPane tabId="3">
                  <ListGroup className="list-group-accent" tag={'div'}>
                    <ListGroupItem
                      tag="a"
                      className="list-group-item-divider list-group-item-action"
                    >
                      <Row>
                        <Col sm="6" md="4" className="mt-3 align-self-center">
                          <div className="font-weight-bold text-muted text-uppercase small">
                            Teinte(s):
                          </div>
                          {flower.colors.map(({ name }) => (
                            <React.Fragment key={`${name}${flower.id}`}>
                              <FiSquare
                                className="ml-3 mt-2"
                                size="15"
                                id={`${name}${flower.id}`}
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target={`${name}${flower.id}`}
                              >
                                {name}
                              </UncontrolledTooltip>
                            </React.Fragment>
                          ))}
                        </Col>
                        <Col sm="6" md="4" className="mt-3 align-self-center">
                          <div className="font-weight-bold text-muted text-uppercase small">
                            Hauteur à maturité:
                          </div>
                          <span className="font-weight-bold text-muted text-uppercase small mt-2 mr-2">
                            De:
                          </span>
                          <span className="font-weight-bold small mt-2 mr-2">
                            {flower.heightLow / 10}cm
                          </span>
                          <span className="font-weight-bold text-muted text-uppercase small mt-2 mr-2">
                            A
                          </span>
                          <span className="font-weight-bold small mt-2 mr-2">
                            {flower.heightHigh
                              ? flower.heightHigh / 10
                              : flower.heightLow / 10}
                            cm
                          </span>
                        </Col>
                        <Col sm="6" md="4" className="mt-3 align-self-center">
                          <div className="font-weight-bold text-muted text-uppercase small">
                            Convient au(x) sol(s):
                          </div>
                          {flower.groundTypes.map(type => (
                            <span
                              className="font-weight-bold small mt-2 mr-2"
                              key={`${type.name}${flower.id}`}
                            >
                              {type.name}
                            </span>
                          ))}
                        </Col>
                        <Col sm="6" md="4" className="mt-3 align-self-center">
                          <div className="font-weight-bold text-muted text-uppercase small">
                            Convient au(x) sol(s):
                          </div>
                          {flower.groundTypes.map(type => (
                            <span
                              className="font-weight-bold small mt-2 mr-2"
                              key={`${type.name}${flower.id}`}
                            >
                              {type.name}
                            </span>
                          ))}
                        </Col>
                        <Col sm="6" md="4" className="mt-3 align-self-center">
                          <div className="font-weight-bold text-muted text-uppercase small">
                            Silhouette:
                          </div>
                          {flower.shapes.map(shape => (
                            <span
                              className="font-weight-bold small mt-2 mr-2"
                              key={`${shape.name}${flower.id}`}
                            >
                              {shape.name === '-1'
                                ? 'Non renseignée'
                                : shape.name}
                            </span>
                          ))}
                        </Col>
                        <Col sm="6" md="4" className="mt-3 align-self-center">
                          <div className="font-weight-bold text-muted text-uppercase small">
                            Ph:
                          </div>
                          <PHSlider
                            min={flower.phRangeLow}
                            max={flower.phRangeHigh}
                          />
                        </Col>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </td>
      </Collapse>
    </React.Fragment>
  );
}

const Flower = React.memo(function({ flower }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <React.Fragment>
      <tr className="d-flex" onClick={toggle}>
        <td className="text-center col-1">
          <div className="avatar">
            <img
              src={flower.thumbnail}
              style={{ minHeight: 35, maxHeight: 35, objectFit: 'cover' }}
              className="img-avatar"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </td>
        <td className="col-6">
          <div>
            <strong>{flower.name}</strong>
          </div>
          <div className="small text-muted">
            Périodicité: <strong>{flower.periodicities[0].name}</strong>
          </div>
        </td>
        <td className="col-2 text-center">
          <div>
            {WaterNeed(flower.waterNeed, flower.id)}
            <div className="small text-muted">
              {GetWaterNeedNamingFromScale(flower.waterNeed)}
            </div>
          </div>
        </td>
        <td className="text-center col-2">
          <strong>{GetRusticityNamingFromScale(flower.rusticity)}</strong>
          <div className="small text-muted">
            {GetRusticityTypeFromScale(flower.rusticity)}
          </div>
        </td>
        <td className="text-center col-1">
          {open ? (
            <FiMinus size={18} className="mt-2" />
          ) : (
            <FiPlus size={18} className="mt-2" />
          )}
        </td>
      </tr>
      <FlowerFull isOpen={open} flower={flower} />
    </React.Fragment>
  );
});

export default Flower;
