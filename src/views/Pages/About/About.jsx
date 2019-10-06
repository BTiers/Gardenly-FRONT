import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Logo from 'assets/img/brand/gardenly_black.png';

function About({ t }) {
  return (
    <div>
      <div id=" Logo" className="container">
        <Row>
          <Col className="col align-self-center">
            <img src={Logo} alt="logo" className="container-fluid sm" />
          </Col>
        </Row>
      </div>
      <hr />
      <div id="about">
        <div className="container">
          <Row>
            <Col className="col-sm-4">
              <div className="card bg-success">
                <div className="card-body text-center">
                  <i className="cui-lightbulb" />
                  <h5>CREATION</h5>
                  <hr />
                  <p className="card-text">
                    Profitez de l’outil de création et de visualisation de votre jardin à son plein
                    potentiel.
                  </p>
                  <p>Partagez vos créations.</p>
                </div>
              </div>
            </Col>
            <Col className="col-sm-4 offset-sm-4">
              <div className="card bg-danger">
                <div className="card-body text-center">
                  <i className="icon-user" />
                  <h5>COMMUNAUTÉ</h5>
                  <hr />
                  <p className="card-text">
                    Gérez votre profil, partagez vos créations et demandez des conseils à la
                    communauté.
                  </p>
                  <p>Discutez avec vos amis de votre dernière bouture.</p>
                </div>
              </div>
            </Col>
            <Col className="col-sm-4 offset-sm-4">
              <div className="card bg-info">
                <div className="card-body text-center">
                  <i className="cui-wrench" />
                  <h5>SUIVI CONTINU</h5>
                  <hr />
                  <p className="card-text">
                    Entretenez votre jardin grâce à nos conseils d’entretien.
                  </p>
                  <p>Prévoyez son évolution au fil des saisons et de la météo.</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <hr />
      <div id="contact">
        <div className="container">
          <Row>
            <Col className="col align-self-center text-center">
              <h4>Avec Gardenly : Plus besoin d’avoir la main verte pour paysager</h4>
              <br />
              <Link to="/login">
                <button bsstyle="primary" bssizee="large" type="button" className="btn btn-primary">
                  Inscrivez vous
                </button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

About.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('about')(About);
