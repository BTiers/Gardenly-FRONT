import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Button } from 'reactstrap';
import Spinner from 'reactstrap/lib/Spinner';

// The current implementation does not support direct text input as children
// Use <span>Your text</span> instead

const LoadingButton = React.memo(
  ({ loading, timeout, children, ...rest }) => {
    const [spin, setSpin] = useState(false);

    useEffect(() => {
      if (loading) {
        const timer = setTimeout(() => {
          setSpin(true);
        }, timeout);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [loading]);

    return (
      <Button {...rest} className="clearfix position-relative">
        {loading && spin ? (
          <Spinner
            tag="span"
            style={{ left: 'calc(50% - .5rem)', top: 'calc(50% - .5rem)' }}
            className="position-absolute"
            size="sm"
          />
        ) : null}
        {React.Children.map(children, child => {
          const visibility = loading && spin ? 'invisible' : 'visible';
          return React.cloneElement(child, {
            className: classNames(child.props.className, visibility)
          });
        })}
      </Button>
    );
  },
  // eslint-disable-next-line react/prop-types
  ({ loading: oldLoading, disabled: oldDisabled }, { loading, disabled }) => false // oldLoading === loading && oldDisabled === disabled
);

LoadingButton.defaultProps = {
  loading: false,
  timeout: 200
};

LoadingButton.propTypes = {
  loading: PropTypes.bool,
  timeout: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default LoadingButton;
