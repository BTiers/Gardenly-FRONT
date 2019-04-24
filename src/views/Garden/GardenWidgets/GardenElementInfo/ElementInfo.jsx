import React from 'react';
import PropTypes from 'prop-types';

import { Row } from 'reactstrap';

import Placeholder from './Placeholder';
import FlowerBedInfo from './FlowerBedInfo';

export default function ElementInfo({ element }) {
  if (!element) return <Placeholder />;

  return (
    <React.Fragment>
      <Row noGutters>
        <FlowerBedInfo element={element} />
      </Row>
    </React.Fragment>
  );
}

ElementInfo.propTypes = {
  element: PropTypes.shape({
    name: PropTypes.string
  })
};
