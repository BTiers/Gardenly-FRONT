import React, { useState } from 'react';

import { Row, ButtonGroup, Button } from 'reactstrap';

const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];

function SpeciesFilter({ isActive }) {
  const [selectedChar, setSelectedChar] = useState('A');
  const className = isActive
    ? 'justify-content-center'
    : 'justify-content-center invisible';

  return (
    <Row className={className}>
      <ButtonGroup>
        {alphabet.map(letter => (
          <Button
            key={letter}
            color={selectedChar === letter ? 'primary' : 'secondary'}
            onClick={() => setSelectedChar(letter)}
          >
            {letter}
          </Button>
        ))}
      </ButtonGroup>
    </Row>
  );
}

export default SpeciesFilter;
