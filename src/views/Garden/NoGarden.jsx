import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { FaTree } from 'react-icons/fa';

import { withTranslation } from 'react-i18next';
import useMedia from '../Hooks/UseMedia';

import CreateGarden from './CreateGarden';
import { Title1, Title2 } from '../Commons/Titles';

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
  color: ${({ theme }) => theme.success};
  margin-bottom: 1rem;
`;

const InteractiveSpan = styled.span`
  color: ${({ theme }) => theme.interactive.main};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.interactive.minus1};
  }
`;

function NoGarden({ t, onCreate }) {
  const [open, toggleModal] = useState(false);
  const mobile = useMedia('(max-width: 768px)');

  return (
    <AbsDiv>
      <CenterDiv>
        <LargeTree size={mobile ? 100 : 200} />
        <Title1 center>{t('no_garden')}</Title1>
        <Title2 center>
          <InteractiveSpan onClick={() => toggleModal(!open)}>{t('create_one')}</InteractiveSpan>
        </Title2>
      </CenterDiv>
      <CreateGarden open={open} toggleModal={toggleModal} onCreate={onCreate} />
    </AbsDiv>
  );
}

NoGarden.propTypes = {
  t: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

export default withTranslation('gardens')(NoGarden);
