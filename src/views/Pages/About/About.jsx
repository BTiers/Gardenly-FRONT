import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardImg,
  CardImgOverlay,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import AboutHeader from 'assets/img/AboutHeader.jpg';
import JardinNuit from 'assets/img/jardin-nuit.jpg';
import AboutGroupPic from 'assets/img/AboutGroupPic.jpg';

function About({ t }) {
  return (
    <div>
      <div>
        <div
          className="page-header-image w-100"
          style={{
            backgroundImage: `url(${AboutHeader})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: 350
          }}
        >
          <div className="text-center" style={{ paddingTop: 75 }}>
            <h1 className="display-2 text-white font-weight-bold">
              <strong>Gardenly.</strong>
            </h1>
          </div>
        </div>
      </div>

      <Container id="about-descr" style={{ padding: '0px 0 60px' }}>
        <Row className="mt-5 pt-5">
          <Col className="mt-5 mr-auto ml-auto col-md-8 text-center">
            <h1 className="display-3 mb-5 font-weight-normal">
              <strong>{t('descrTitle')}</strong>
            </h1>
            <br />
            <h3 className="text-dark font-weight-light">{t('descrText')}</h3>
          </Col>
        </Row>
        <Row className="mt-4 pt-4">
          <Col className="col-md-4 text-center" style={{ padding: '70px 10px 30px' }}>
            <i className="cui-lightbulb text-success" style={{ fontSize: '3em' }} />
            <h4 style={{ padding: '15px' }}>
              <strong className="text-success">{t('titleFirstPoint')}</strong>
            </h4>
            <p className="h5 text-body">
              {t('textFirstPoint')}
              <br />
              <br />
              {t('secondTextFirstPoint')}
            </p>
          </Col>
          <Col className="col-md-4 text-center" style={{ padding: '70px 10px 30px' }}>
            <i className="cui-user text-danger" style={{ fontSize: '3em' }} />
            <h4 style={{ padding: '15px' }}>
              <strong className="text-danger">{t('titleSecondPoint')}</strong>
            </h4>
            <p className="h5 text-body">
              {t('textSecondPoint')}
              <br />
              <br />
              {t('secondTextSecondPoint')}
            </p>
          </Col>
          <Col className="col-md-4 text-center" style={{ padding: '70px 10px 30px' }}>
            <i className="cui-wrench text-info" style={{ fontSize: '3em' }} />
            <h4 style={{ padding: '15px' }}>
              <strong className="text-info">{t('titleThirdPoint')}</strong>
            </h4>
            <p className="h5 text-body">
              {t('textThirdPoint')}
              <br />
              <br />
              {t('secondTextThirdPoint')}
            </p>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container id="about-project" style={{ padding: '160px 0 120px' }}>
        <Row>
          <Col className="text-center col-md-8 ml-auto mr-auto mb-5">
            <h2 className="font-weight-bold">{t('titleProject')}</h2>
            <br />
            <h4 className="text-dark font-weight-light">{t('titleProject')}</h4>
          </Col>
        </Row>
        <Row>
          <Col className="ml-auto col-md-5">
            <Card className="text-center" inverse>
              <CardImg width="400px" height="540px" src={JardinNuit} alt="cardAboutBg" />
              <CardImgOverlay className="align-items-center" style={{ margin: '160px 0' }}>
                <CardTitle className="h1 font-weight-bold pb-4">{t('titleCard')}</CardTitle>
                <CardText className="h5 text-muted font-weight-normal">{t('textCard')}</CardText>
              </CardImgOverlay>
            </Card>
          </Col>
          <Col className="mr-auto col-md-5">
            <div className="text-center">
              <h4 className="text-success">
                <i
                  className="cui-magnifying-glass"
                  style={{ fontSize: '1.5em', paddingRight: '10px' }}
                />
                <strong>{t('titlePointCardOne')}</strong>
              </h4>
              <br />
              <p className="h5 text-body">{t('textPointCardOne')}</p>
            </div>
            <div className="mt-5 text-center">
              <h4 className="text-danger">
                <i className="cui-star" style={{ fontSize: '1.5em', paddingRight: '10px' }} />
                <strong>{t('titlePointCardTwo')}</strong>
              </h4>
              <br />
              <p className="h5 text-body">{t('textPointCardTwo')}</p>
            </div>
            <div className="mt-5 text-center">
              <h4 className="text-info">
                <i className="cui-pencil" style={{ fontSize: '1.5em', paddingRight: '10px' }} />
                <strong>{t('titlePointCardThree')}</strong>
              </h4>
              <br />
              <p className="h5 text-body">{t('textPointCardThree')}</p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="ml-auto mr-auto col-md-6 text-center">
            <h3>{t('titleLogin')}</h3>
            <br />
            <Link to="/login">
              <Button className="btn-pill btn-block btn-lg btn-success">
                <i
                  className="cui-user-follow"
                  style={{ fontSize: '1.5em', paddingRight: '10px' }}
                />
                {t('buttonLogin')}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container id="about-team">
        <Row style={{ padding: '130px 0 50px' }}>
          <Col className="text-center col-md-8 ml-auto mr-auto mb-5">
            <h2 className="font-weight-bold">{t('teamTitle')}</h2>
            <br />
            <h4 className="text-dark font-weight-light">{t('teamText')}</h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center col-md-8 ml-auto mr-auto mb-5">
            <img className="img-fluid" src={AboutGroupPic} alt="AboutGroupPic" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

About.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('about')(About);
