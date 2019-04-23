import React from 'react';

import { Row, Col } from 'reactstrap';

export default function CenterY({ children, className }) {
  let classNames = 'mh-100 align-items-center justify-content-center my-auto ';

  if (className) classNames += className;

  return (
    <Row noGutters style={{ minHeight: '100%' }} className={classNames}>
      <Col xs="12" className="my-auto">
        {children}
      </Col>
    </Row>
  );
}
