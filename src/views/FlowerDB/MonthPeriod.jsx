import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { FiSquare } from 'react-icons/fi';

const months = [
  'Janv',
  'Fevr',
  'Mars',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sept',
  'Oct',
  'Nov',
  'Déc'
];

export function MonthPeriod(start, end, fillColor) {
  const isActive = idx => {
    let ret = false;
    start.forEach((st, index) => {
      if (st < end[index])
        ret = ret || (idx + 1 >= st && idx + 1 <= end[index]);
      else if (st > end[index])
        ret = ret || idx + 1 >= st || idx + 1 <= end[index];
    });
    return ret;
  };

  return (
    <Row className="ml-2">
      {months.map((month, idx) => (
        <Col xs="1" className="text-center" key={month}>
          <FiSquare size="15" fill={isActive(idx) ? fillColor : 'white'} />
        </Col>
      ))}
    </Row>
  );
}

MonthPeriod.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  fillColor: PropTypes.string.isRequired
};

export function MonthHeader() {
  return (
    <Row className="ml-2">
      {months.map(month => (
        <Col xs="1" className="text-center" key={month}>
          <div className="d-md-block d-lg-none small">{month[0]}</div>
          <div className="d-none d-lg-block small">{month}</div>
        </Col>
      ))}
    </Row>
  );
}
