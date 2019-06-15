import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardBody, Col, Row } from 'reactstrap';
import { FaTree } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

import ButtonAsAnchor from 'components/buttons/ButtonAsAnchor';
import CreateGarden from './CreateGarden';

function NewGarden({ t, onCreate }) {
  const [open, toggleModal] = useState(false);

  return (
    <div className="animated fadeIn">
      <Card>
        <CardBody style={{ minHeight: 'calc(100vh - 204px)' }}>
          <Row
            noGutters
            className="align-items-center"
            style={{ minHeight: 'calc(100vh - 204px)' }}
          >
            <Col className="text-center">
              <span className="text-info text-center">
                <FaTree size={100} className="mb-3" />
              </span>
              <h4>{t('new_garden')}</h4>
              <h5>
                <ButtonAsAnchor className="text-info" onClick={() => toggleModal(!open)}>
                  {t('create_one')}
                </ButtonAsAnchor>
              </h5>
              <CreateGarden open={open} toggleModal={toggleModal} onCreate={onCreate} />
            </Col>
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
