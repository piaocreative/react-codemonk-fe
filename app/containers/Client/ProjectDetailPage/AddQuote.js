import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { Field, change, untouch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { FormLabel, FormWrapper } from 'components';
import { MAX_QUOTE_FILE_SIZE } from 'utils/constants';
import * as formValidations from 'utils/formValidations';
import { allowedFileTypes, toastMessages } from 'containers/App/constants';
import { renderField, renderFileAttach, renderTextEditor, renderFileReplacement } from 'utils/Fields';
import { defaultProps, propTypes } from 'containers/proptypes';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { key } from './constants';
import messages from './messages';
import { checkIfQuoteFile } from './utils';

export class AddQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploading: { quoteFile: '' },
      docError: {
        quoteFile: '',
      },
      quoteFile: props.quoteFile,
    };
  }

  onFileChange = e => {
    const { dispatch } = this.props;
    const { name, files } = e.target;
    this.validateDoc(name, files);
    dispatch(untouch(key, name));
  };

  validateDoc = (name, files) => {
    const { dispatch, quoteFileChanged } = this.props;
    const { docError } = this.state;
    const { state } = this;
    const stateValue = state[name];
    if (files.length === 1) {
      const checkForError = checkIfQuoteFile(files[0], MAX_QUOTE_FILE_SIZE, toastMessages.maxQuoteFileSize);
      if (!checkForError) {
        quoteFileChanged(files[0]);
        this.setState({ [name]: files[0].name });
      } else {
        docError[name] = checkForError;
        dispatch(change(key, name, ''));
        this.setState({ [name]: '', docError });
      }
    } else if (files.length >= 1) {
      dispatch(change(key, name, stateValue));
    } else {
      dispatch(change(key, name, stateValue));
      dispatch(untouch(key, name));
    }
  };

  onDeleteFile = docName => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    docError[docName] = '';
    dispatch(change(key, docName, ''));
    this.setState({ [docName]: '', docError });
  };

  renderQuoteFile = quoteFile => {
    const { fileUploading, docError } = this.state;
    let output = '';
    if (!quoteFile) {
      output = (
        <Field
          name="quoteFile"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.quoteFile}
          stateVar={quoteFile}
          wrapperClassName={fileUploading.quoteFile}
          loading={fileUploading.quoteFile}
          onChangeFile={e => this.onFileChange(e)}
          onDeleteFile={() => this.onDeleteFile('quoteFile')}
          docError={docError.quoteFile}
          validate={[formValidations.quoteDocument]}
        />
      );
    } else {
      output = (
        <Field
          name="quoteFile"
          component={renderFileReplacement}
          disabled
          stateVar={quoteFile}
          onDeleteFile={() => this.onDeleteFile('quoteFile')}
        />
      );
    }
    return output;
  };

  render() {
    const { quoteFile } = this.state;

    const { quoteTitle, quoteDescription } = this.props;
    return (
      <FormWrapper>
        <Row className="row-spacing">
          <Col>
            <FormGroup className="input-sm">
              <FormLabel>
                <FormattedMessage {...messages.labelTitle} />
              </FormLabel>
              <Field
                name="quoteTitle"
                type="text"
                component={renderField}
                placeholder={messages.placeHolderTitle.defaultMessage}
                value={quoteTitle}
                validate={[formValidations.requiredField, formValidations.minLength2, formValidations.maxLength70]}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup className="input-sm">
          <FormLabel>
            <FormattedMessage {...messages.labelDescription} />
          </FormLabel>
          <Field
            name="quoteDescription"
            component={renderTextEditor}
            editorState={quoteDescription}
            placeholder={messages.placeHolderDescription.defaultMessage}
            validate={[formValidations.minLengthRichText2, formValidations.maxLengthRichText1000]}
          />
        </FormGroup>
        <FormGroup className="input-sm">
          <FormLabel>
            <FormattedMessage {...messages.labelAttachment} />
            <small className="optional-text">{messages.labelAttachmentSmallText.defaultMessage}</small>
          </FormLabel>
          {this.renderQuoteFile(quoteFile)}
        </FormGroup>
      </FormWrapper>
    );
  }
}

AddQuote.defaultProps = defaultProps;
AddQuote.propTypes = propTypes;

export default AddQuote;
