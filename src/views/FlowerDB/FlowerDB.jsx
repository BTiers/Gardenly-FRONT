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
import { useQuery } from 'react-apollo-hooks';

import { Mobile, Default } from 'components/responsive/responsive';
import { GET_ALL_PLANTS } from '../../apollo/queries/queries';

import Flower from './Flower';
import { AdvancedSearch } from './AdvancedSearch';

function FlowersTable({ query: { query, variables } }) {
  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: { ...variables, first: 20 }
  });
  const { getAllPlants: plants } = data;

  if (error)
    return (
      <FlowersEmptyTable
        message={'Une erreur est survenue, essayez une autre recherche'}
      />
    );
  if (loading)
    return <FlowersEmptyTable children={<Spinner color="primary" />} />;
  if (plants.edges.length === 0)
    return (
      <FlowersEmptyTable
        message={'Aucune plante connue ne correspond à votre recherche'}
      />
    );

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
          <th className="col-1 border-0 text-center" />
        </tr>
      </thead>
      <tbody>
        {plants.edges.map(plant => (
          <Flower flower={plant.node} key={plant.node.id} />
        ))}
        {plants.pageInfo.hasNextPage ? (
          <tr className="d-flex text-uppercase text-white bg-primary small text-center my-3 justify-content-center">
            <td
              className="text-center col-12 border-0"
              onClick={() => {
                fetchMore({
                  variables: { after: plants.pageInfo.endCursor },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    const newEdges = fetchMoreResult.getAllPlants.edges;
                    const pageInfo = fetchMoreResult.getAllPlants.pageInfo;

                    return newEdges.length
                      ? {
                          getAllPlants: {
                            __typename: prev.getAllPlants.__typename,
                            edges: [...prev.getAllPlants.edges, ...newEdges],
                            pageInfo
                          }
                        }
                      : prev;
                  }
                });
              }}
            >
              Charger plus de résultat
            </td>
          </tr>
        ) : null}
      </tbody>
    </Table>
  );
}

function FlowersEmptyTable({ warning, message, children }) {
  const messageClassName = `d-flex text-uppercase ${
    warning ? 'text-danger' : 'text-muted'
  } small text-center my-3 justify-content-center`;

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
          <th className="col-1 border-0 text-center" />
        </tr>
      </thead>
      <tbody>
        <tr className={messageClassName}>
          <td className="text-center col-12 border-0">
            {message ? message : children}
          </td>
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
                onKeyPress={e => {
                  if (e.key === 'Enter') onSearch();
                }}
              />
              {advancedOpen ? null : (
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
              )}
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
          <AdvancedSearch onSearch={onSearch} />
        </Collapse>
        {query ? (
          <FlowersTable query={query} />
        ) : (
          <FlowersEmptyTable message={'Saisissez votre recherce'} />
        )}
      </CardBody>
    </Card>
  );
}

FlowerDB.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation('flower_search')(FlowerDB);
