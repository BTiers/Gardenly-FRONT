import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Unity, { UnityContent } from 'react-unity-webgl';
import { Prompt } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import gql from 'graphql-tag';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { UPDATE_GARDEN } from 'apollo/mutations/mutations';
import { USER_GARDENS } from 'apollo/queries/queries';

class Software extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      readyToQuit: false
    };

    this.unityContent = new UnityContent(
      `${process.env.REACT_APP_HOST_SOFTWARE}Build.json`,
      `${process.env.REACT_APP_HOST_SOFTWARE}UnityLoader.js`,
      {
        adjustOnWindowResize: false
      }
    );

    this.unityContent.on('progress', progression => {
      if (progression === 1) {
        console.log('Unity load successfully, sending initialization data', JSON.stringify(data));
        this.unityContent.send('ReactProxy', 'InitScene', JSON.stringify(data));
      }
    });

    this.unityContent.on('unsavedWork', state => {
      this.setState({ readyToQuit: state === 1 });
    });
  }

  render() {
    const { id, name, t } = this.props;

    return (
      <React.Fragment>
        <Prompt
          when={this.state.readyToQuit}
          message={() => `${t('unsaved_work_left_on')} "${name}"
            ${t('lost_unsaved')}
          `}
        />
        <Mutation mutation={UPDATE_GARDEN} refetchQueries={[{ query: USER_GARDENS }]}>
          {(updateGarden, { loading, error }) => {
            this.unityContent.on('save', datas => {
              console.log('Saving garden ...');
              console.log('Datas received from Unity : ', datas);

              console.log('Parsing data JSON.parse ...');
              const { modifications, additions, deletions, data } = JSON.parse(datas);
              const vMod = modifications ? JSON.stringify(modifications) : '';
              const vAdd = additions ? JSON.stringify(additions) : '';
              const vDel = deletions ? JSON.stringify(deletions) : '';

              console.log('Data parsed successfully');
              console.log('Modifications: ', vMod);
              console.log('Additions: ', vAdd);
              console.log('Deletions: ', vDel);

              console.log('Sending save request to the server');
              updateGarden({
                variables: {
                  id,
                  name,
                  data,
                  additions: vAdd,
                  modifications: vMod,
                  deletions: vDel
                }
              });

              console.log('Request errror:', error);
              this.unityContent.send(
                'ReactProxy',
                'OnSaveResult',
                JSON.stringify({ success: !error })
              );
            });
            return null;
          }}
        </Mutation>
        <ApolloConsumer>
          {client => {
            this.unityContent.on('query', async payload => {
              console.log('Query received from Unity before parsing : ', payload);
              console.log('Trying to JSON.parse the given payload...');
              const parsedPayload = JSON.parse(payload);
              console.log('Payload parsed successfully, resulting object : ', parsedPayload);
              console.log('Sending request to the server ...');
              const { data, errors } = await client.query({
                query: gql`
                  ${parsedPayload.query}
                `,
                variables: parsedPayload.variables
              });

              console.log('Payload received from the server : ', data);
              console.log('Error received : ', errors);

              console.log(
                'Sending result back to Unity : ',
                JSON.stringify({ data: { ...data } }) || JSON.stringify(errors)
              );
              this.unityContent.send(
                'ReactProxy',
                'DispatchQueryResult',
                JSON.stringify({ data: { ...data } }) || JSON.stringify(errors)
              );

              console.log('Success');
            });
          }}
        </ApolloConsumer>
        <Unity unityContent={this.unityContent} width="100%" height="100%" />
      </React.Fragment>
    );
  }
}

Software.defaultProps = {
  country: ''
};

Software.propTypes = {
  t: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  country: PropTypes.string
};

export default withTranslation('garden_editor')(Software);
