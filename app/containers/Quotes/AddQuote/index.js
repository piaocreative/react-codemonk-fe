import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { FormGroup, Row, Col } from 'reactstrap';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { FormLabel, ToastifyMessage, Button } from 'components';
import AsyncSelects from 'components/AsyncSelects';
import { VALIDATION, MAX_QUOTE_FILE_SIZE } from 'utils/constants';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Emitter from 'utils/emitter';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import * as formValidations from 'utils/formValidations';
import { API_URL, CLIENT, PROJECT_API, LIST, allowedFileTypes, toastMessages, plusIcon, editIcon } from 'containers/App/constants';
import request from 'utils/request';
import { ActionIcon } from 'containers/MyProfilePage/styles';
import { renderField, renderFileAttach, renderTextEditor, renderFileReplacement } from 'utils/Fields';
import { loadRepos } from 'containers/App/actions';
import { processData } from 'containers/Client/AddBrief/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import injectSaga from 'utils/injectSaga';
import containerMessage from 'containers/messages';
import messages from 'containers/Client/ProjectDetailPage/messages';
import * as actions from './actions';
import * as selectors from './selectors';
import saga from './saga';
import { key } from './constants';
import { checkIfQuoteFile } from '../utils';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class AddQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuoteModal: false,
      fileUploading: { quoteFile: '' },
      docError: {
        quoteFile: '',
      },
      quoteFile: '',
      quoteFileObj: '',
    };
    this.debouncedGetOptions = debounce(this.getAddQuoteProjectOptions, 500);
  }

  onFileChange = e => {
    const { dispatch } = this.props;
    const { name, files } = e.target;
    this.validateDoc(name, files);
    dispatch(untouch(key, name));
  };

  validateDoc = (name, files) => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    const { state } = this;
    const stateValue = state[name];
    if (files.length === 1) {
      const checkForError = checkIfQuoteFile(files[0], MAX_QUOTE_FILE_SIZE, toastMessages.maxQuoteFileSize);
      if (!checkForError) {
        this.setState({ quoteFileObj: files[0], [name]: files[0].name });
      } else {
        docError[name] = checkForError;
        this.setState({ [name]: '', docError });
        dispatch(change(key, name, ''));
      }
    } else if (files.length >= 1) {
      dispatch(change(key, name, stateValue));
    } else {
      dispatch(untouch(key, name));
      dispatch(change(key, name, stateValue));
    }
  };

  onDeleteFile = docName => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    docError[docName] = '';
    this.setState({ [docName]: '', docError });
    dispatch(change(key, docName, ''));
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
          validate={[formValidations.quoteDocument]}
          docError={docError.quoteFile}
        />
      );
    } else {
      output = (
        <Field
          name="quoteFile"
          type="text"
          component={renderFileReplacement}
          disabled
          stateVar={quoteFile}
          onDeleteFile={() => this.onDeleteFile('quoteFile')}
        />
      );
    }
    return output;
  };

  fetchAddQuoteProject = async value => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${CLIENT}${PROJECT_API}${LIST}?q=${value}`;
    return request(requestURL, data);
  };

  getAddQuoteProjectOptions = (inputValue, cb) => {
    const projectData = this.fetchAddQuoteProject(inputValue);
    projectData
      .then(response => {
        const { status, data } = response;
        if (status) {
          const projectOptions = processData(data);
          this.setState({ projectOptions });
          cb(projectOptions);
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  loadAddQuoteProjectOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      this.debouncedGetOptions(inputValue, callback);
    }
  };

  handleChangeProject = option => {
    const { dispatch } = this.props;
    dispatch(change(key, 'project', option));
  };

  handleOpenModal = () => {
    const { dispatch, type, projectObj, projectDetailsPage } = this.props;
    let data = {};

    let quoteFile = '';
    let quoteFileObj = '';

    if (type === 'add') {
      data = { project: '', quoteTitle: '', quoteDescription: EditorState.createEmpty() };

      if (projectDetailsPage) data.project = projectObj;
    } else if (type === 'edit') {
      const quoteDescription = EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(get(projectObj, 'quoteDescription'))),
      );
      quoteFile = get(projectObj, 'quoteFile');
      quoteFileObj = get(projectObj, 'quoteFile');

      data = { project: get(projectObj, 'project'), quoteTitle: get(projectObj, 'quoteTitle'), quoteDescription };
    }

    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });
    this.setState({ showQuoteModal: true, quoteFile, quoteFileObj });
  };

  handleCloseModal = () => this.setState({ showQuoteModal: false });

  renderAddQuote = () => {
    const { showQuoteModal, projectOptions, quoteFile } = this.state;
    const { type, project, quoteTitle, quoteDescription, handleSubmit, invalid, loading } = this.props;

    const title = type === 'add' ? containerMessage.addQuotePopupTitle.defaultMessage : containerMessage.editQuotePopupTitle.defaultMessage;
    return (
      <PopupWrapper
        modalId="showQuoteModal"
        loading={loading}
        disabled={invalid}
        isOpen={showQuoteModal}
        onDiscard={this.handleCloseModal}
        onHandleSubmit={handleSubmit(e => {
          this.handleQuoteModalSubmit(e);
        })}
        modalType={type}
        title={title}
      >
        <form onSubmit={handleSubmit}>
          {type === 'add' && (
            <Row>
              <Col>
                <FormGroup className="input-sm">
                  <FormLabel>{containerMessage.projectLabel.defaultMessage}</FormLabel>
                  <Field
                    name="project"
                    type="text"
                    component={AsyncSelects}
                    defaultValue={project}
                    cacheOptions
                    loadOptions={this.loadAddQuoteProjectOptions}
                    defaultOptions={projectOptions}
                    handleChange={this.handleChangeProject}
                    placeHolder={containerMessage.placeholderProjectName.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
            </Row>
          )}
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
        </form>
      </PopupWrapper>
    );
  };

  handleQuoteModalSubmit = e => {
    const { type, projectObj, quoteTitle: name, project, quoteDescription, onSubmitQuote } = this.props;
    const { quoteFileObj } = this.state;

    const description = draftToHtml(convertToRaw(quoteDescription.getCurrentContent()));
    const data = {
      projectId: get(project, 'value'),
      name,
      description,
      quote: quoteFileObj,
    };

    if (type === 'edit') {
      data.id = get(projectObj, 'id');
    }
    onSubmitQuote(e, type, data, this.quoteSuccess);
  };

  quoteSuccess = () => {
    this.setState({ showQuoteModal: false });
    Emitter.emit('quoteAdded', true);
  };

  render() {
    const { type } = this.props;
    return (
      <React.Fragment>
        {type === 'add' ? (
          <React.Fragment>
            <div className="d-flex mt-4 mt-md-0">
              <Button className="btn btn-sm btn-outline btn-plus ms-md-3 top-0" onClick={() => this.handleOpenModal('add')}>
                <SVG className="me-2" src={plusIcon} />
                <span>
                  <FormattedMessage {...containerMessage.addQuotePopupTitle} />
                </span>
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <ActionIcon type="button" onClick={() => this.handleOpenModal('edit')}>
            <SVG src={editIcon} />
          </ActionIcon>
        )}
        {this.renderAddQuote()}
      </React.Fragment>
    );
  }
}

AddQuote.defaultProps = defaultProps;
AddQuote.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  project: selectors.project,
  quoteTitle: selectors.quoteTitle,
  quoteDescription: selectors.quoteDescription,

  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitQuote: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitQuote(type, data, onSuccess));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(AddQuote);
