import React from 'react';
import { func, shape } from 'prop-types';

import { Route, Switch, withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import { Container } from 'reactstrap';

import Software from 'views/Unity/Software';
import { USER_GARDENS } from 'apollo/queries/queries';
import NewGarden from './NewGarden';
import Garden from './Garden';

function GardensPage({ history }) {
  const { data, error, loading } = useQuery(USER_GARDENS);

  if (loading) return <div className="animated fadeIn pt-1 text-center">Loading...</div>;
  if (error) {
    console.error(error);
    return 'Error';
  }

  const { nodes } = data.gardens;

  return (
    <Switch>
      <Route
        path="/garden/create"
        render={() => <NewGarden onCreate={name => history.push(`/garden/${name}/edit`)} />}
      />
      <Route
        path="/garden/:name"
        exact
        render={({ match }) => {
          if (nodes.length > 0) {
            const foundEntry = nodes.find(obj => obj.name === match.params.name);

            if (foundEntry) {
              if (foundEntry.datas === '{}') {
                history.push(`/garden/${foundEntry.name}/edit`); // FIXME: Re render Error
                return null;
              }
              return (
                <Container fluid className="h-100 w-100">
                  <Garden
                    name={foundEntry.name}
                    data={JSON.parse(foundEntry.datas)}
                    key={`Garden${foundEntry.name}`}
                  />
                </Container>
              );
            }

            history.push(`/404`);
            return null;
          }

          return <NewGarden onCreate={name => history.push(`/garden/${name}`)} />;
        }}
      />
      <Route
        path="/garden/:name/edit"
        render={({ match }) => {
          const foundEntry = nodes.find(obj => obj.name === match.params.name);

          if (foundEntry)
            return (
              <Software
                id={foundEntry.id}
                data={foundEntry.datas}
                name={foundEntry.name}
                country={foundEntry.country}
              />
            );
          return null;
        }}
      />
    </Switch>
  );
}

GardensPage.propTypes = {
  history: shape({ push: func }).isRequired
};

export default withRouter(GardensPage);
