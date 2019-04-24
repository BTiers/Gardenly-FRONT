import React, { useState } from 'react';
// FIXME
//import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Row, Col, Input, InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap';
import { FiSearch } from 'react-icons/fi';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const TitleRow = styled(Row)`
  font-size: 0.9rem;
  font-weight: bolder;
  color: ${({ theme }) => theme.HightContrastBackground};
`;

const SubtitleRow = styled(Row)`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.reducedHightContrastBackground};
`;

const SearchBarRow = styled(Row)`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ theme }) => theme.reducedHightContrastBackground};
`;

const SpacedRow = styled(Row)`
  padding-top: 0.5rem;
`;

const FlowerMedium = styled.img`
  height: 90%;
  max-height: 50px;
  border-radius: 3%;
  object-fit: contain;
`;

function FlowerEntry() {
  const faker = require('faker'); // FIXME: For debug purpose

  return (
    <SpacedRow noGutters>
      <Col sm={2}>
        <Row noGutters className="h-100 justify-content-center align-items-center">
          <FlowerMedium src={faker.image.nature()} alt="Fake flower" />
        </Row>
      </Col>
      <Col sm={8}>
        <TitleRow noGutters>Placeholder flower name</TitleRow>
        <SubtitleRow noGutters>Plant nomen eius</SubtitleRow>
      </Col>
      <Col sm={2} />
    </SpacedRow>
  );
}

export default function FlowerInfo({ data }) {
  const [search, setSearch] = useState('');
  const empty = data.length === 0;

  // FIXME: Overflow mal géré quand trop de plantes.
  return (
    <React.Fragment>
      <Row noGutters>
        <Col sm="6">
          <TitleRow noGutters>Les plantes de ce parterre :</TitleRow>
        </Col>
        <Col sm="6">
          <SearchBarRow className="h-100 justify-content-end align-items-center" noGutters>
            <InputGroup>
              <Input
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher une plante"
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <FiSearch />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </SearchBarRow>
        </Col>
      </Row>
      {empty ? (
        <Row noGutters>
          <Col>
            <SubtitleRow noGutters>Aucune plante présente dans ce parterre</SubtitleRow>
          </Col>
        </Row>
      ) : (
        <Row style={{ position: 'relative', overflow: 'hidden' }}>
          <Col>
            <PerfectScrollbar>
              {data.map((e, idx) => { // FIXME: Naive implementation en attendant les noms correct
                if (search === '' || search === e.subID.toString())
                  return <FlowerEntry key={idx} />;
                return null;
              })}
            </PerfectScrollbar>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
}

FlowerInfo.propTypes = {}; // FIXME: En attente de la structure de donnée correcte
