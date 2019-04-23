import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import {
  Row,
  Col,
  Spinner,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import { withTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo-hooks';

import { CREATE_MEDIUM } from 'apollo/mutations/mutations';
import { GET_ALL_MEDIA } from 'apollo/queries/queries';

import getBase64FromImage from 'utils/image/getBase64FromImage';

const LargeSpinner = styled(Spinner)`
  width: 3rem;
  height: 3rem;
`;

const UploadOption = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

function UploadPic({ t, file, setFiles, mobile, onUploadSuccess }) {
  const [uploadError, setUploadError] = useState(false);
  const [imgInfos, setImgInfos] = useState({
    picture: null,
    title: '',
    description: ''
  });
  const [blob, setBlob] = useState(null);
  const createMedium = useMutation(CREATE_MEDIUM, {
    variables: {
      picture: blob,
      title: imgInfos.title,
      description: imgInfos.description
    },
    refetchQueries: [{ query: GET_ALL_MEDIA }],
    update: () => setFiles({ acceptedFiles: [], rejectedFiles: [] })
  });

  useEffect(() => {
    getBase64FromImage(
      file.preview,
      b64 => setBlob(b64),
      () => setUploadError(true)
    );
  }, [file]);

  return (
    <Col xs="12" style={{ minHeight: 300 }}>
      <div className="w-75 rounded mb-3 mx-auto">
        {blob ? (
          <React.Fragment>
            <Row className="justify-content-center mt-3">
              <img src={file.preview} alt={file.name} className="img-fluid" />
            </Row>
            <hr />
            <Form>
              <FormGroup>
                <Label for="title" sm={12}>
                  Title
                </Label>
                <Col sm={12}>
                  <Input
                    type="text"
                    placeholder={t('choose_title')}
                    onChange={e =>
                      setImgInfos({ ...imgInfos, title: e.target.value })
                    }
                  />
                </Col>
                <Label for="description" sm={12}>
                  Description
                </Label>
                <Col sm={12}>
                  <Input
                    type="text"
                    placeholder={t('choose_description')}
                    onChange={e =>
                      setImgInfos({ ...imgInfos, description: e.target.value })
                    }
                  />
                </Col>
              </FormGroup>
            </Form>
            <hr />
            <Row className="justify-content-between" noGutters>
              <UploadOption xs={4}>
                <Button
                  color="danger"
                  onClick={() =>
                    setFiles({ acceptedFiles: [], rejectedFiles: [] })
                  }
                >
                  <span style={{ fontSize: '1rem' }} className="icon-trash" />
                  &nbsp;
                  {t('back')}
                </Button>
              </UploadOption>
              <UploadOption xs={4}>
                <Button
                  disabled={!blob}
                  color="primary"
                  onClick={() =>
                    createMedium({
                      variables: {
                        picture: blob,
                        title: imgInfos.title,
                        description: imgInfos.description
                      }
                    })
                  }
                >
                  <span
                    style={{ fontSize: '1rem' }}
                    className="icon-cloud-upload"
                  />
                  &nbsp;
                  {t('upload')}
                </Button>
              </UploadOption>
            </Row>
          </React.Fragment>
        ) : (
          <LargeSpinner color="primary" className="align-middle" />
        )}
      </div>
    </Col>
  );
}

UploadPic.propTypes = {
  t: PropTypes.func.isRequired,
  file: PropTypes.shape({
    preview: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  setFiles: PropTypes.func.isRequired,
  onUploadSuccess: PropTypes.func.isRequired
};

export default withTranslation('picture_gallery')(UploadPic);
