import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import get from 'lodash/get';
import * as formValidations from 'utils/formValidations';
import { renderFileReplacement, renderFileAttach } from 'utils/Fields';
import { allowedFileTypes } from 'containers/App/constants';
import { FormLabel, H4 } from 'components';
import { propTypes } from 'containers/proptypes';
import authMessages from 'containers/Auth/PaymentAndBilling/messages';

export class PersonalIdComponent extends React.Component {
  renderIdProof = (index = '') => {
    const { idProof, fileUploading, docError, onFileChange, onDeleteFile, editFlag, state, multi } = this.props;
    let output = '';
    const fieldName = `idProof${index}`;
    const idProofValue = multi ? state[fieldName] || '' : idProof;
    if (!idProofValue) {
      output = (
        <Field
          name={fieldName}
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.payment}
          stateVar={idProofValue}
          wrapperClassName={fileUploading[fieldName]}
          loading={fileUploading[fieldName]}
          onChangeFile={e => onFileChange(e, index)}
          onDeleteFile={() => onDeleteFile(fieldName)}
          validate={[formValidations.requiredDocument]}
          docError={get(docError, fieldName)}
          disabled={!editFlag}
        />
      );
    } else {
      output = (
        <Field
          name={fieldName}
          type="text"
          component={renderFileReplacement}
          disabled
          editFlag={editFlag}
          stateVar={idProofValue}
          onDeleteFile={() => onDeleteFile(fieldName)}
        />
      );
    }
    return output;
  };

  renderAddressProof = (index = '') => {
    const { addressProof, fileUploading, docError, onFileChange, onDeleteFile, editFlag, state, multi } = this.props;
    let output = '';
    const fieldName = `addressProof${index}`;
    const addressProofValue = multi ? state[fieldName] || '' : addressProof;
    if (!addressProofValue) {
      output = (
        <Field
          name={fieldName}
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.payment}
          stateVar={addressProofValue}
          wrapperClassName={fileUploading[fieldName]}
          loading={fileUploading[fieldName]}
          onChangeFile={e => onFileChange(e, index)}
          onDeleteFile={() => onDeleteFile(fieldName)}
          validate={[formValidations.requiredDocument]}
          docError={get(docError, fieldName)}
          disabled={!editFlag}
        />
      );
    } else {
      output = (
        <Field
          name={fieldName}
          type="text"
          component={renderFileReplacement}
          disabled
          editFlag={editFlag}
          stateVar={addressProofValue}
          onDeleteFile={() => onDeleteFile(fieldName)}
        />
      );
    }
    return output;
  };

  getMultipleFileUploadFields = () => {
    const { directorCount } = this.props;
    const inputs = [];
    for (let i = 0; i < directorCount; i++) {
      inputs.push(this.getRow(i));
    }
    return inputs;
  };

  render() {
    const { multi } = this.props;
    return (
      <React.Fragment>
        <div className="row-spacing">
          <small className="p-0">
            <FormattedMessage {...authMessages.noteProof} />
          </small>
        </div>
        {multi ? this.getMultipleFileUploadFields() : this.getRow()}
      </React.Fragment>
    );
  }

  getRow = index => {
    const { directorCount } = this.props;
    return (
      <React.Fragment>
        {directorCount > 1 && <H4>Director {index + 1}</H4>}
        <Row className="mt-4">
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelIdProof} />
              </FormLabel>
              {this.renderIdProof(index)}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...authMessages.labelAddProof} />
              </FormLabel>
              {this.renderAddressProof(index)}
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  };
}

PersonalIdComponent.propTypes = propTypes;
