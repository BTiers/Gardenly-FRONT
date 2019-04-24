import React from 'react';
import PropTypes from 'prop-types';

import { FaTree } from 'react-icons/fa';

import styled from 'styled-components';
import { Row, Col } from 'reactstrap';

const TitleRow = styled(Row)`
  font-size: 0.9rem;
  font-weight: bolder;
  color: ${({ theme }) => theme.HightContrastBackground};
`;

const SubtitleRow = styled(Row)`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.reducedHightContrastBackground};
`;

const DataRow = styled(Row)`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.reducedHightContrastBackground};
`;

const InfoEntry = ({ title, subtitle, data, iconColor }) => {
  return (
    <React.Fragment>
      <Row noGutters>
        <Col sm={1}>
          <Row
            noGutters
            className="h-100 justify-content-center align-items-center"
          >
            <FaTree color={iconColor} />
          </Row>
        </Col>
        <Col sm={7}>
          <TitleRow noGutters>{title}</TitleRow>
          <SubtitleRow noGutters>{subtitle}</SubtitleRow>
        </Col>
        <Col sm={4}>
          <DataRow
            noGutters
            className="h-100 justify-content-end align-items-center"
          >
            {data}
          </DataRow>
        </Col>
      </Row>
      <hr />
    </React.Fragment>
  );
};

InfoEntry.defaultProps = {
  title: null,
  subtitle: null,
  data: null,
  iconColor: undefined
};

InfoEntry.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.string,
  iconColor: PropTypes.string
};

export default InfoEntry;
