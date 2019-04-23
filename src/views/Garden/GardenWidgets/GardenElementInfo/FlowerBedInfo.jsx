import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'reactstrap';

import { FaTree } from 'react-icons/fa';
import { withTranslation } from 'react-i18next';

import InfoEntry from './InfoEntry';
import FlowerInfo from './FlowerInfo';

function FlowerBedInfo({ t, element: { name, elements } }) {
  return (
    <Col>
      <InfoEntry Icon={FaTree} iconColor="#3fc380" title={t('flowerbed_name')} data={name} />
      <InfoEntry
        Icon={FaTree}
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
  element: PropTypes.string.isRequired
};

export default withTranslation('garden_canvas')(FlowerBedInfo);
