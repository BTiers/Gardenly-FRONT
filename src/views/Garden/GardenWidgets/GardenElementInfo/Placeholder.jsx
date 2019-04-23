import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTranslation } from 'react-i18next';

import { Row, Col } from 'reactstrap';

const CenteredText = styled.p`
  font-size: 20px;
  margin: 20%;
  font-weight: bold;
  text-align: center;
`;

function Placeholder({ t }) {
  return (
    <Row className="w-100 h-100 justify-content-center align-items-center" noGutters>
      <Col sm={12}>
        <CenteredText>{t('more_info')}</CenteredText>
      </Col>
    </Row>
  );
}

Placeholder.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('garden_canvas')(Placeholder);
