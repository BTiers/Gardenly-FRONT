import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function About({ t }) {
  return (
    <div className="container-fluid">
      <div id="carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="..." alt="First slide" />
          </div>
        </div>
      </div>
    </div>
  );
}

About.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('about')(About);
