import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { withTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';

import { Col, Row, Card, CardHeader, CardBody, Container, UncontrolledTooltip } from 'reactstrap';

import useMedia from 'hooks/UseMedia';
import { GET_LUNAR_PHASES } from 'apollo/queries/queries';

import NightBackground from './NightBackground';
import LunarPhaseIcon from './LunarPhaseIcon';

const PaddedCol = styled(Col)`
  padding: ${({ mobile }) => (mobile ? 0 : 15)}px;

  .card-body {
    position: relative !important;
  }

  .centered-top-moon {
    width: 80%;
    height: 80%;
    margin: auto 10%;
  }

  .main-title-moon {
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
  }

  .main-date-moon {
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    padding-top: 1rem;
  }

  .forecast-phases {
    font-size: 0.8rem;
    text-align: center;
  }
`;

const HCenteredCol = styled(Col)`
  margin-bottom: auto;
  margin-top: auto;
`;

const Background = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
`;

const HeightedRow = styled(Row)`
  min-height: ${({ mobile }) => (mobile ? 200 : 300)}px;
  width: 100%;
  margin: 0px;
`;

const HalfSizeRow = styled(Row)`
  min-height: 50%;
`;

const ForecastContainer = styled.div`
  text-align: center;
  padding-top: 10%;
`;

const UnpaddedContainer = styled(Container)`
  padding: 0px;
`;

function LunarPhase({ t }) {
  const { data, loading, error } = useQuery(GET_LUNAR_PHASES);
  const mobile = useMedia('(max-width: 768px)');

  if (error) return error;
  if (loading) return null;

  const parsedCycle = JSON.parse(data.getLunarCycleFromToday.data).phasedata;
  const moonPhases = parsedCycle.map(e => ({ phase: e.phase, date: new Date(e.date) }));

  return (
    <PaddedCol sm="12" md="12" mobile={mobile ? 1 : 0} className="w-100">
      <Card>
        <CardHeader>{t('lunar_phase')}</CardHeader>
        <CardBody>
          <Background>
            <NightBackground />
          </Background>
          <UnpaddedContainer>
            <HeightedRow mobile={mobile ? 1 : 0}>
              <HCenteredCol sm="12" md="5">
                <Row>
                  <Col sm="12">
                    <p className="main-title-moon">{t(moonPhases[0].phase)}</p>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <div className="centered-top-moon">
                      <LunarPhaseIcon state={moonPhases[0].phase} size={100} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12">
                    <p className="main-date-moon">
                      {t('since_the')}
                      {moonPhases[0].date.toLocaleDateString()}
                    </p>
                  </Col>
                </Row>
              </HCenteredCol>
              {mobile ? null : (
                <Col md="7" style={{ borderLeft: '1px solid white' }}>
                  <HalfSizeRow>
                    <HCenteredCol sm="6">
                      <ForecastContainer id="MoonForecastPlusOne">
                        <LunarPhaseIcon state={moonPhases[1].phase} size={50} />
                      </ForecastContainer>
                      <UncontrolledTooltip placement="top" target="MoonForecastPlusOne">
                        {t(moonPhases[1].phase)}
                      </UncontrolledTooltip>
                      <p className="main-date-moon">{moonPhases[1].date.toLocaleDateString()}</p>
                    </HCenteredCol>
                    <HCenteredCol sm="6">
                      <ForecastContainer id="MoonForecastPlusTwo">
                        <LunarPhaseIcon state={moonPhases[2].phase} size={50} />
                      </ForecastContainer>
                      <UncontrolledTooltip placement="top" target="MoonForecastPlusTwo">
                        {t(moonPhases[2].phase)}
                      </UncontrolledTooltip>
                      <p className="main-date-moon">{moonPhases[2].date.toLocaleDateString()}</p>
                    </HCenteredCol>
                  </HalfSizeRow>
                  <HalfSizeRow>
                    <HCenteredCol sm="6">
                      <ForecastContainer id="MoonForecastPlusThree">
                        <LunarPhaseIcon state={moonPhases[3].phase} size={50} />
                      </ForecastContainer>
                      <UncontrolledTooltip placement="top" target="MoonForecastPlusThree">
                        {t(moonPhases[3].phase)}
                      </UncontrolledTooltip>
                      <p className="main-date-moon">{moonPhases[3].date.toLocaleDateString()}</p>
                    </HCenteredCol>
                    <HCenteredCol sm="6">
                      <ForecastContainer id="MoonForecastPlusFour">
                        <LunarPhaseIcon state={moonPhases[4].phase} size={50} />
                      </ForecastContainer>
                      <UncontrolledTooltip placement="top" target="MoonForecastPlusFour">
                        {t(moonPhases[4].phase)}
                      </UncontrolledTooltip>
                      <p className="main-date-moon">{moonPhases[4].date.toLocaleDateString()}</p>
                    </HCenteredCol>
                  </HalfSizeRow>
                </Col>
              )}
            </HeightedRow>
          </UnpaddedContainer>
        </CardBody>
      </Card>
    </PaddedCol>
  );
}

LunarPhase.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('lunar')(LunarPhase);
