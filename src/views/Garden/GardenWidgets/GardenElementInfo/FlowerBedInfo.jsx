import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'reactstrap';

import { withTranslation } from 'react-i18next';

import InfoEntry from './InfoEntry';
import FlowerInfo from './FlowerInfo';

function FlowerBedInfo({ t, element: { name, elements } }) {
  return (
    <Col>
      <InfoEntry iconColor="#3fc380" title={t('flowerbed_name')} data={name} />
      <InfoEntry
        iconColor="#3fc380"
        title={t('ground_type')}
        subtitle="ph 7"
        data="Argileux"
      />
      <FlowerInfo data={elements} />
    </Col>
  );
}

FlowerBedInfo.propTypes = {
  t: PropTypes.func.isRequired,
  element: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

export default withTranslation('garden_canvas')(FlowerBedInfo);
