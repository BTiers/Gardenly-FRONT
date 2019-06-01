import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Row, Card, CardBody } from 'reactstrap';

import { FaTree } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

import CreateGarden from './CreateGarden';

function NewGarden({ onCreate }) {
  const [t] = useTranslation('gardens');
  const [open, toggleModal] = useState(false);

  return (
    <div className="animated fadeIn">
      <Card>
        <CardBody style={{ minHeight: 'calc(100vh - 204px)' }}>
          <Row>
            <CreateGarden open={open} toggleModal={toggleModal} onCreate={onCreate} />
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

NewGarden.propTypes = {
  onCreate: PropTypes.func.isRequired
};

export default NewGarden;
