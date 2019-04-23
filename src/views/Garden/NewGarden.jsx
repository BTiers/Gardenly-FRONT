import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { FaTree } from 'react-icons/fa';

import { withTranslation } from 'react-i18next';

import CreateGarden from './CreateGarden';

const AbsDiv = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
`;

const CenterDiv = styled.div`
  min-height: 100%;
  width: 200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const LargeTree = styled(FaTree)`
  margin: auto;
  margin-bottom: 1rem;
`;

const InteractiveSpan = styled.span`
  cursor: pointer;

  &:hover {
  }
`;

function NewGarden({ t, onCreate }) {
  const [open, toggleModal] = useState(false);

  return (
    <AbsDiv>
      <CenterDiv>
        <LargeTree size={100} />
        <h4 className="text-center">{t('new_garden')}</h4>
        <h5 className="text-center">
          <InteractiveSpan onClick={() => toggleModal(!open)}>{t('create_one')}</InteractiveSpan>
        </h5>
      </CenterDiv>
      <CreateGarden open={open} toggleModal={toggleModal} onCreate={onCreate} />
    </AbsDiv>
  );
}

NewGarden.propTypes = {
  t: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default withTranslation('gardens')(NewGarden);
