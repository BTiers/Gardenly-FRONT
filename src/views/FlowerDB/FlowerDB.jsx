import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';
import {
  Row,
  Col,
  Input,
  Card,
  CardBody,
  Button,
  InputGroup,
  Collapse,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { FiFilter, FiSearch, FiChevronDown } from 'react-icons/fi';

import { Mobile, Default } from 'components/responsive/responsive';
import SpeciesFilter from './Filters/SpeciesFilter';
import CharacteristicsFilter from './Filters/CharacteristicsFilter';

function FlowerDB({ t }) {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('species');
  const [filters, setFilters] = useState({
    species: [],
    characteristics: {
      height: null,
      exposure: null,
      flowering: { from: null, to: null },
      planting_period: { from: null, to: null },
      rusticity: null
    }
  });

  const activeClasses =
    'list-group-item-accent-primary list-group-item-divider';
  const inactiveClasses =
    'list-group-item-accent-secondary list-group-item-divider';

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xs="12">
            <InputGroup>
              <Button
                color="secondary"
                className="rounded"
                onClick={() => setAdvancedOpen(!advancedOpen)}
              >
                <FiFilter />
                <FiChevronDown />
              </Button>
              <Input
                className="form-control"
                type="text"
                placeholder="Rechercher un nom de plante"
              />
              <Button color="primary" className="rounded">
                <Default>
                  Search&nbsp;&nbsp;
                  <FiSearch />
                </Default>
                <Mobile>
                  <FiSearch />
                </Mobile>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Collapse isOpen={advancedOpen}>
          <Row className="mt-3">
            <Col xs="3">
              <ListGroup className="list-group-accent" tag={'div'}>
                <ListGroupItem
                  action
                  className={
                    selectedFilter === 'species'
                      ? activeClasses
                      : inactiveClasses
                  }
                  onClick={() => setSelectedFilter('species')}
                >
                  <div>
                    <strong>Par espèces</strong>
                  </div>
                </ListGroupItem>
                <ListGroupItem
                  action
                  className={
                    selectedFilter === 'charac'
                      ? activeClasses
                      : inactiveClasses
                  }
                  onClick={() => setSelectedFilter('charac')}
                >
                  <div>
                    <strong>Par caractéristiques</strong>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs="9">
              <SpeciesFilter isActive={selectedFilter === 'species'} />
              <CharacteristicsFilter isActive={selectedFilter === 'charact'} />
            </Col>
          </Row>
        </Collapse>
      </CardBody>
    </Card>
  );
}

FlowerDB.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('flower_search')(FlowerDB);
