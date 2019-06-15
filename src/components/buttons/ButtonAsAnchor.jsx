import React from 'react';
import { Button } from 'reactstrap';

export default function ButtonAsAnchor(props) {
  // No need to validate children only
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  return (
    <Button {...props} style={{ backgroundColor: 'rgba(0,0,0,0)', border: 'none' }}>
      {children}
    </Button>
  );
}
