import React from 'react';
import PropTypes from 'prop-types';

import { AppSwitch } from '@coreui/react';

const Option = ({ color, title, description }) => (
  <div className="aside-options">
    <div className="clearfix">
      <small>
        <b>{title}</b>
      </small>
      <AppSwitch className="float-right" variant="pill" label color={color} size="sm" />
    </div>
    <div>
      <small className="text-muted">{description}</small>
    </div>
  </div>
);

Option.defaultProps = {
  color: 'secondary',
  title: '',
  description: ''
};

Option.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger']),
  title: PropTypes.string,
  description: PropTypes.string
};

export default Option;
