import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Unity, { UnityContent } from 'react-unity-webgl';
import { Prompt } from 'react-router-dom';
import ReactResizeDetector from 'react-resize-detector';

import { UPDATE_GARDEN } from 'apollo/mutations/mutations';
import { Mutation } from 'react-apollo';
import { withTranslation } from 'react-i18next';
import { USER_GARDENS } from 'apollo/queries/queries';

class Software extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.unityContent = new UnityContent(
      'https://s3.greefine.ovh/unity/Build/Build.json',
      'https://s3.greefine.ovh/unity/Build/UnityLoader.js',
      {
        adjustOnWindowResize: false
      }
    );

    this.unityContent.on('progress', progression => {
      if (progression === 1) {
        this.unityContent.send('ReactProxy', 'InitScene', data);
      }
    });

    this.IsUnsavedWorkLeft = () => this.unityContent.send('ReactProxy', 'IsUnsavedWorkLeft');
  }

  static onResize() {
    const appContent = document.getElementById('AppContentWrapper');
    const canvas = document.getElementById('#canvas');

    if (canvas !== null && appContent !== null) {
      if (canvas.width !== appContent.offsetWidth || canvas.height !== appContent.offsetHeight) {
        canvas.width = appContent.offsetWidth;
        canvas.height = appContent.offsetHeight;
      }
    }
  }

  render() {
    const { id, name, country, t } = this.props;

    return (
      <React.Fragment>
        <Prompt
          when={this.IsUnsavedWorkLeft()}
          message={() => `${t('unsaved_work_left_on')} "${name}"
            ${t('lost_unsaved')}
          `}
        />
        <Mutation mutation={UPDATE_GARDEN} refetchQueries={[{ query: USER_GARDENS }]}>
          {updateGarden => {
            this.unityContent.on('SaveScene', data => {
              updateGarden({
                variables: {
                  id,
                  name,
                  data,
                  country
                }
              });
            });
            return null;
          }}
        </Mutation>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={Software.onResize}
          resizableElementId="AppContentWrapper"
          refreshMode="debounce"
          refreshRate={30}
        />
        <Unity unityContent={this.unityContent} />
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
