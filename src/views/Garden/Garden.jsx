import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import styled from 'styled-components';

import { FiEdit, FiArrowLeftCircle } from 'react-icons/fi';
import Link from 'react-router-dom/Link';
import { UncontrolledTooltip, Card, CardBody, CardHeader, Row, Col, Button } from 'reactstrap';
import GardenCanvas from './GardenWidgets/GardenCanvas/GardenCanvas';
import GardenActivity from './GardenActivity';
import ElementInfo from './GardenWidgets/GardenElementInfo/ElementInfo';

const SizedRow = styled(Row)`
  min-height: calc(100vh - 99px);
  height: calc(100vh - 99px);
`;

function Garden({ t, data }) {
  const [focusElement, setFocusElement] = useState(null);

  return (
    <div className="animated fadeIn">
      <SizedRow className="w-100 p-3" noGutters>
        <Col md="8" className="h-100">
          <Card className="h-100 mh-100">
            <CardHeader>{data.name}</CardHeader>
            <CardBody>
              <GardenCanvas gardenData={data} onElementFocus={e => setFocusElement(e)} />
            </CardBody>
          </Card>
        </Col>
        <Col md="4" className="h-100 mh-100">
          <Card className="h-100 mh-100">
            <CardHeader>
              <Row>
                <Col md="6">
                  {focusElement ? (
                    <FiArrowLeftCircle
                      size={18}
                      onClick={() => {
                        focusElement.releaseCallback();
                        setFocusElement(null);
                      }}
                    />
                  ) : null}
                </Col>
                <Col md="6">
                  <Row noGutters className="justify-content-end align-items-center">
                    {t('details')}
                  </Row>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <ElementInfo element={focusElement} />
            </CardBody>
          </Card>
        </Col>
      </SizedRow>
      <GardenActivity />
      <Link to={`/garden/${data.name}/edit`}>
        <Button id="GoToEditor">
          <FiEdit />
        </Button>
      </Link>
      <UncontrolledTooltip placement="top" target="GoToEditor">
        Edit in the garden builder
      </UncontrolledTooltip>
    </div>
  );
}

Garden.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired
};

export default withTranslation('gardens')(Garden);
