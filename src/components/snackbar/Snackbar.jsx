import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import { FiX } from 'react-icons/fi';

function Snackbar({
  anchorOrigin: { vertical, horizontal },
  autoHideDuration,
  onClose,
  message,
  actions,
  open,
  color
}) {
  useEffect(() => {
    if (open && autoHideDuration !== -1) {
      const timer = setTimeout(() => onClose(), autoHideDuration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  if (!open) return null;
  return (
    <div
      className={`position-fixed bg-${color} d-flex justify-content-center align-items-center rounded p-3`}
      style={{ height: '3rem', minWidth: '15rem', [vertical]: '3rem', [horizontal]: '2rem' }}
    >
      <span className="">
        {message}
        {actions}
      </span>
      <Button size="sm" color={color} className="ml-3 p-0 align-center text-light">
        <FiX size={18} onClick={onClose} />
      </Button>
    </div>
  );
}

Snackbar.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  autoHideDuration: -1,
  message: '',
  actions: [],
  color: 'info'
};

Snackbar.propTypes = {
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['bottom', 'top']),
    horizontal: PropTypes.oneOf(['left', 'right'])
  }),
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.node),
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'warning', 'danger'])
};

export default React.memo(Snackbar);
