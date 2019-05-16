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
  Table,
  Spinner
} from 'reactstrap';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaTree } from 'react-icons/fa';
import { useQuery, useApolloClient } from 'react-apollo-hooks';

import { Mobile, Default } from 'components/responsive/responsive';
import { GET_ALL_PLANTS } from '../../apollo/queries/queries';

import Flower from './Flower';
import { AdvancedSearch } from './AdvancedSearch';

function FlowersTable({ query: { query, variables } }) {
  const { data, loading, error } = useQuery(query, { variables: variables });

  return (
    <Table
      hover
      responsive
      className="table-outline mb-0 d-none d-sm-table mt-4"
    >
      <thead className="thead-light">
        <tr className="d-flex">
          <th className="text-center col-1 border-0">
            <FaTree />
          </th>
          <th className="col-6 border-0">Nom</th>
          <th className="col-2 border-0 text-center">Besoin en eau</th>
          <th className="col-2 border-0 text-center">Rusticité</th>
          <th className="col-1 border-0 text-center">Plus</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr className="d-flex text-uppercase text-warning small text-center my-3 justify-content-center">
            Une erreur est survenue, veuillez recharger la page
          </tr>
        ) : null}
        {loading ? (
          <tr className="d-flex my-3 justify-content-center">
            <Spinner color="primary" />
          </tr>
        ) : null}
        {loading || error
          ? null
          : data.getAllPlants.edges.map(plant => (
              <Flower flower={plant.node} key={plant.node.id} />
            ))}
      </tbody>
    </Table>
  );
}

function FlowersEmptyTable() {
  return (
    <Table
      hover
      responsive
      className="table-outline mb-0 d-none d-sm-table mt-4"
    >
      <thead className="thead-light">
        <tr className="d-flex">
          <th className="text-center col-1 border-0">
            <FaTree />
          </th>
          <th className="col-6 border-0">Nom</th>
          <th className="col-2 border-0 text-center">Besoin en eau</th>
          <th className="col-2 border-0 text-center">Rusticité</th>
          <th className="col-1 border-0 text-center">Plus</th>
        </tr>
      </thead>
      <tbody>
        <tr className="d-flex text-uppercase text-muted small text-center my-3 justify-content-center">
          Saisissez votre recherche
        </tr>
      </tbody>
    </Table>
  );
}

function FlowerDB({ t }) {
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [searchedName, setSearchedName] = useState('');
  const [query, setQuery] = useState(null);

  const onSearch = state => {
    const variables =
      state !== undefined
        ? {
            shapeIds: state.shapes.map(obj => obj.id),
            groundTypeIds: state.groundType.map(obj => obj.id),
            periodicityIds: state.periodicities.map(obj => obj.id)
          }
        : null;

    setQuery({
      query: GET_ALL_PLANTS,
      variables: {
        name: searchedName,
        ...variables
      }
    });
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xs="12">
            <InputGroup>
              <Input
                className="form-control font-weight-bold"
                type="text"
                placeholder="Rechercher une plante"
                onChange={e => setSearchedName(e.target.value)}
              />
              <Button
                color="primary"
                className="rounded-right rounded-0"
                onClick={() => onSearch()}
              >
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
        <Row>
          <Col xs="12">
            <Button
              color="primary"
              className="bg-white mt-2 rounded-0 text-uppercase text-muted border-0"
              style={{ fontSize: '80%' }}
              onClick={() => setAdvancedOpen(!advancedOpen)}
            >
              Recherche avancée
              <FiChevronDown className="ml-2" />
            </Button>
          </Col>
        </Row>
        <Collapse isOpen={advancedOpen}>
          <AdvancedSearch onSearch={onSearch}/>
        </Collapse>
        {query ? <FlowersTable query={query} /> : <FlowersEmptyTable />}
      </CardBody>
    </Card>
  );
}

FlowerDB.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('flower_search')(FlowerDB);
