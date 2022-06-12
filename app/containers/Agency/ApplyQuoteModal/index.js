/** ApplyQuoteModal
 * This is the Modal page for the agnecy to apply to quote,
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { FormGroup } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { FormLabel } from 'components';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { renderField, renderTextEditor, renderFileAttach, renderFileReplacement } from 'utils/Fields';
import { MAX_AGENCY_QUOTE_FILE_SIZE } from 'utils/constants';
import * as formValidations from 'utils/formValidations';
import * as normalize from 'utils/normalize';
import injectSaga from 'utils/injectSaga';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { allowedFileTypes, toastMessages } from 'containers/App/constants';
import { defaultProps, propTypes } from 'containers/proptypes';
import { checkIfQuoteFile } from 'containers/Client/ProjectDetailPage/utils';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as selectors from './selectors';
import saga from './saga';
import * as actions from './actions';
import messages from './messages';
import { key } from './constants';

export class ApplyQuoteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploading: { projectPlan: '', effortsBreakdown: '' },
      docError: {
        projectPlan: '',
        effortsBreakdown: '',
      },
      projectPlan: '',
      effortsBreakdown: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { showApplyModal, dispatch } = this.props;
    if (!prevProps.showApplyModal && showApplyModal) {
      this.clearData(dispatch);
    }
  }

  clearData = dispatch => {
    const data = {
      assumptions: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
      outOfScope: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
      teamStructure: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
      totalCost: '',
      additionalInfo: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
      projectPlan: '',
      effortsBreakdown: '',
    };
    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });

    const docError = {
      projectPlan: '',
      effortsBreakdown: '',
    };
    this.setState({ projectPlan: '', effortsBreakdown: '', docError });
  };

  submitApply = e => {
    const {
      projectId,
      quoteId,
      assumptions: propAssumptions,
      outOfScope: propOutOfScope,
      teamStructure: propTeamStructure,
      totalCost,
      additionalInfo: propAdditionalInfo,

      projectPlan,
      effortsBreakdown,

      onSubmitQuoteForm,
    } = this.props;

    const assumptions = draftToHtml(convertToRaw(propAssumptions.getCurrentContent()));
    const outOfScope = draftToHtml(convertToRaw(propOutOfScope.getCurrentContent()));
    const teamStructure = draftToHtml(convertToRaw(propTeamStructure.getCurrentContent()));
    const additionalInfo = draftToHtml(convertToRaw(propAdditionalInfo.getCurrentContent()));

    const data = {
      quoteId,
      projectId,
      assumptions,
      outOfScope,
      teamStructure,
      totalCost,
      otherInfo: additionalInfo,
      projectPlan,
      effortsBreakdown,
    };

    onSubmitQuoteForm(e, data, this.submitSuccess);
  };

  submitSuccess = () => {
    const { handleSuccess } = this.props;
    handleSuccess();
  };

  onFileChange = e => {
    const { dispatch } = this.props;
    const { name, files } = e.target;
    this.validateDoc(name, files);
    dispatch(untouch(key, name));
  };

  onDeleteFile = docName => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    docError[docName] = '';
    this.setState({ [docName]: '', docError });
    dispatch(change(key, docName, ''));
  };

  validateDoc = (name, files) => {
    const { dispatch } = this.props;
    const { docError } = this.state;
    const { state } = this;
    const stateValue = state[name];
    if (files.length === 1) {
      const checkForError = checkIfQuoteFile(files[0], MAX_AGENCY_QUOTE_FILE_SIZE, toastMessages.maxAgencyQuoteFileSize);
      if (!checkForError) {
        this.setState({ [name]: files[0].name });
        dispatch(change(key, name, files[0]));
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

  renderProjectPlanFile = projectPlan => {
    const { fileUploading, docError } = this.state;
    let output = '';
    if (!projectPlan) {
      output = (
        <Field
          name="projectPlan"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.quoteFile}
          stateVar={projectPlan}
          wrapperClassName={fileUploading.projectPlan}
          loading={fileUploading.projectPlan}
          onChangeFile={e => this.onFileChange(e)}
          onDeleteFile={() => this.onDeleteFile('projectPlan')}
          validate={[formValidations.agencyQuoteDocument]}
          docError={docError.projectPlan}
        />
      );
    } else {
      output = (
        <Field
          name="projectPlan"
          type="text"
          component={renderFileReplacement}
          disabled
          stateVar={projectPlan}
          onDeleteFile={() => this.onDeleteFile('projectPlan')}
        />
      );
    }
    return output;
  };

  renderEffortBreakdownFile = effortsBreakdown => {
    const { fileUploading, docError } = this.state;
    let output = '';
    if (!effortsBreakdown) {
      output = (
        <Field
          name="effortsBreakdown"
          type="file"
          component={renderFileAttach}
          accept={allowedFileTypes.quoteFile}
          stateVar={effortsBreakdown}
          wrapperClassName={fileUploading.effortsBreakdown}
          loading={fileUploading.effortsBreakdown}
          onChangeFile={e => this.onFileChange(e)}
          onDeleteFile={() => this.onDeleteFile('effortsBreakdown')}
          validate={[formValidations.agencyQuoteDocument]}
          docError={docError.effortsBreakdown}
        />
      );
    } else {
      output = (
        <Field
          name="effortsBreakdown"
          type="text"
          component={renderFileReplacement}
          disabled
          stateVar={effortsBreakdown}
          onDeleteFile={() => this.onDeleteFile('effortsBreakdown')}
        />
      );
    }
    return output;
  };

  render() {
    const {
      showApplyModal,
      handleApplyModalClose,
      loading,
      handleSubmit,
      invalid,
      responseSuccess,
      responseError,

      assumptions,
      outOfScope,
      teamStructure,

      totalCost,
      additionalInfo,
    } = this.props;
    const { projectPlan, effortsBreakdown } = this.state;
    return (
      <PopupWrapper
        modalId="showApplyModal"
        loading={loading}
        responseSuccess={responseSuccess}
        responseError={responseError}
        disabled={invalid}
        isOpen={showApplyModal}
        onDiscard={handleApplyModalClose}
        onHandleSubmit={handleSubmit(e => {
          this.submitApply(e);
        })}
        modalType="submit"
        title={messages.modelSubmitQuoteHeader.defaultMessage}
      >
        <form onSubmit={handleSubmit}>
          {/* 1st assumptions*/}
          <FormGroup className="input-sm">
            <FormLabel>
              <FormattedMessage {...messages.labelAssumptions} />
            </FormLabel>
            <Field
              name="assumptions"
              component={renderTextEditor}
              editorState={assumptions}
              placeholder={messages.placeholderAssumptions.defaultMessage}
              validate={[formValidations.minLengthRichText2, formValidations.maxLengthRichText1000]}
            />
          </FormGroup>

          {/* 2nd out of scope */}
          <FormGroup className="input-sm">
            <FormLabel>
              <FormattedMessage {...messages.labelOutOfScope} />
            </FormLabel>
            <Field
              name="outOfScope"
              component={renderTextEditor}
              editorState={outOfScope}
              placeholder={messages.placeholderOutOfScope.defaultMessage}
              validate={[formValidations.minLengthRichText2, formValidations.maxLengthRichText1000]}
            />
          </FormGroup>

          {/* 3rd team structure */}
          <FormGroup className="input-sm">
            <FormLabel>
              <FormattedMessage {...messages.labelTeamStructure} />
            </FormLabel>
            <Field
              name="teamStructure"
              component={renderTextEditor}
              editorState={teamStructure}
              placeholder={messages.placeholderTeamStructure.defaultMessage}
              validate={[formValidations.minLengthRichText2, formValidations.maxLengthRichText1000]}
            />
          </FormGroup>

          {/* 4th project plan file */}
          <FormGroup className="input-sm">
            <FormLabel>
              <FormattedMessage {...messages.labelProjectPlan} />
              <small className="optional-text">{messages.labelProjectPlanSmallText.defaultMessage}</small>
            </FormLabel>
            {this.renderProjectPlanFile(projectPlan)}
          </FormGroup>

          {/* 5th effort breakdown file */}
          <FormGroup className="input-sm">
            <FormLabel>
              <FormattedMessage {...messages.labelEffortBreakdown} />
              <small className="optional-text">{messages.labelProjectPlanSmallText.defaultMessage}</small>
            </FormLabel>
            {this.renderEffortBreakdownFile(effortsBreakdown)}
          </FormGroup>

          {/* 6th total cost */}
          <FormGroup className="input-sm">
            <FormLabel>
              <FormattedMessage {...messages.labelTotalCost} />
              <small className="optional-text">{messages.labelTotalCostSmallText.defaultMessage}</small>
            </FormLabel>
            <Field
              name="totalCost"
              type="number"
              component={renderField}
              placeholder={messages.placeholderTotalCost.defaultMessage}
              value={totalCost}
              normalize={normalize.trimSpace}
              validate={[formValidations.requiredField, formValidations.positiveInteger]}
            />
          </FormGroup>

          {/* 7th effort breakdown */}
          <FormGroup className="input-sm">
            <FormLabel>
              <FormattedMessage {...messages.labelAdditionalInfo} />
            </FormLabel>
            <Field
              name="additionalInfo"
              component={renderTextEditor}
              editorState={additionalInfo}
              placeholder={messages.placeholderAdditionalInfo.defaultMessage}
              validate={[formValidations.minLengthRichText2, formValidations.maxLengthRichText1000]}
            />
          </FormGroup>
        </form>
      </PopupWrapper>
    );
  }
}

ApplyQuoteModal.defaultProps = defaultProps;
ApplyQuoteModal.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  assumptions: selectors.assumptions,
  outOfScope: selectors.outOfScope,
  teamStructure: selectors.teamStructure,
  totalCost: selectors.totalCost,
  additionalInfo: selectors.additionalInfo,

  projectPlan: selectors.projectPlan,
  effortsBreakdown: selectors.effortsBreakdown,

  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitQuoteForm: (evt, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitQuote(data, onSuccess));
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
)(ApplyQuoteModal);
