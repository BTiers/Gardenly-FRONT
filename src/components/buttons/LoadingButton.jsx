import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';

// The current implementation does not support direct text input as children
// Use <span>Your text</span> instead

const LoadingButton = ({ loading, children, ...rest }) => (
  <Button {...rest}>
    {loading ? (
      <Spinner style={{ left: 'calc(50% - .5rem)' }} className="position-relative " size="sm" />
    ) : null}
    {React.Children.map(children, child => {
      const visibility = loading ? 'invisible' : 'visible';
      return React.cloneElement(child, {
        className: classNames(child.props.className, visibility)
      });
    })}
  </Button>
);

LoadingButton.defaultProps = {
  loading: false
};

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default LoadingButton;
