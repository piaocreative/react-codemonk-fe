/* eslint-disable import/order */
/** ApplyBrief
 * This is the Modal page for the Talent to apply to brief,
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormGroup } from 'reactstrap';
import { renderTextAreaForm } from 'utils/Fields';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { redirectToPage, checkTalentSignupIsCompleted } from 'containers/App/utils';
import moment from 'moment';
import * as formValidations from 'utils/formValidations';
import * as selectors from './selectors';
import StorageService from 'utils/StorageService';
import { reduxForm, Field, change, untouch } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { loadRepos, reset } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import ModalWrapper from 'components/ModalWrapper';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import { API_URL, JOB_POST, VERSION2, APPLY, closeIcon, circleTickIcon } from 'containers/App/constants';
import { UserBulletPointList } from 'containers/Auth/SignUp/signup-styles';
import { H3, Button, ToastifyMessage, P, FormLabel, DatePickers } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import containerMessage from 'containers/messages';
import { getUserRegisterType } from 'utils/Helper';
import messages from './messages';
import { CompleteProfileModal } from './styles';
import { key } from './constants';

export class ApplyBrief extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showApplyModal: false,
      showCompleteProfileModal: false,
      roleType: getUserRegisterType(),
    };
  }

  submitApply = () => {
    const { dispatch, briefID, notesOfMotivation, availableJoiningDate } = this.props;
    dispatch(loadRepos());
    const data = {
      method: 'POST',
      body: { jobPostId: briefID, notesOfMotivation, availableJoiningDate: moment(availableJoiningDate).format('DD/MM/YYYY') },
    };
    const requestURL = `${API_URL}${VERSION2}${JOB_POST}${APPLY}`;
    request(requestURL, data)
      .then(this.briefApplied)
      .catch(() => {
        dispatch(reset());
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  briefApplied = response => {
    const { dispatch, loadDetails } = this.props;
    if (get(response, 'status')) {
      dispatch(reset());
      this.setState({ showApplyModal: false }, () => {
        toast.success(<ToastifyMessage message={get(response, 'message')} type="success" />, { className: 'Toast-success' });
        loadDetails();
      });
    } else {
      dispatch(reset());
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  renderApplyModal = () => {
    const { showApplyModal } = this.state;
    const { loading, seniority, role, companyName, invalid, handleSubmit } = this.props;
    return (
      <ModalWrapper
        loading={loading}
        disabled={invalid}
        isOpen={showApplyModal}
        onDiscard={this.handleApplyProjectCloseModal}
        onHandleSubmit={handleSubmit(this.submitApply)}
        title={messages.modalTitle.defaultMessage}
        modalClassName="modal-sm"
        primaryBtnText={messages.btnApplyNow.defaultMessage}
      >
        <form onSubmit={handleSubmit}>
          <H3 className="mb-4">
            Apply for the role of {seniority} - {role} {companyName && `at ${companyName}`}
          </H3>
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.motivateLabel} />
            </FormLabel>
            <Field
              name="notesOfMotivation"
              component={renderTextAreaForm}
              rows={3}
              placeholder="message"
              validate={[formValidations.required, formValidations.minLength10, formValidations.maxLength500]}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.whenToStartLabel} />
            </FormLabel>
            <Field
              name="availableJoiningDate"
              component={DatePickers}
              showYearDropDown
              yearDropdownItemNumber={5}
              scrollableYearDropdown
              placeholder={containerMessage.placeholderDate.defaultMessage}
              placement="top-start"
              minDate={moment().toDate()}
              withIcon
              validate={[formValidations.requiredDate]}
            />
          </FormGroup>
        </form>
      </ModalWrapper>
    );
  };

  handleProfileCompleteOpenModal = () => {
    this.setState({ showCompleteProfileModal: true });
  };

  handleProfileCompleteCloseModal = () => {
    this.setState({ showCompleteProfileModal: false });
  };

  completeProfile = () => {
    const { history, location } = this.props;
    const currentSignupStep = StorageService.get('signupStep');
    redirectToPage(history, location.redirection, currentSignupStep, 8);
  };

  handleApplyProjectOpenModal = e => {
    e.preventDefault();
    const { roleType } = this.state;
    const isSignupCompleted = checkTalentSignupIsCompleted(roleType);
    if (isSignupCompleted) {
      this.setState({ showApplyModal: true });
    } else {
      this.handleProfileCompleteOpenModal();
    }
  };

  handleApplyProjectCloseModal = () => {
    const { dispatch } = this.props;

    const data = {
      notesOfMotivation: '',
      availableJoiningDate: '',
    };
    Object.keys(data).forEach(fieldKey => {
      dispatch(change(key, fieldKey, data[fieldKey]));
      dispatch(untouch(key, fieldKey));
    });
    this.setState({ showApplyModal: false });
  };

  render() {
    const { showCompleteProfileModal } = this.state;
    return (
      <React.Fragment>
        <Button className="btn btn-sm btn-outline" onClick={e => this.handleApplyProjectOpenModal(e)}>
          <span>{containerMessage.applyButton.defaultMessage}</span>
        </Button>
        {this.renderApplyModal()}
        <CompleteProfileModal
          isOpen={showCompleteProfileModal}
          contentLabel="Complete Profile"
          onRequestClose={this.handleProfileCompleteCloseModal}
          className="modal-dialog"
          style={{ overlay: { zIndex: 12 } }}
          shouldCloseOnOverlayClick={false}
          ariaHideApp={false}
          ariaModal
        >
          <div className="modal-content">
            <div className="modal-header modal-close">
              <button type="button" className="modal-dismiss ms-auto" onClick={this.handleProfileCompleteCloseModal}>
                <img src={closeIcon} alt="close" />
                <span className="visually-hidden">Close</span>
              </button>
            </div>
            <div className="modal-body">
              <H3 className="text-center">
                <FormattedMessage {...messages.ProfileCompleteHeading} />
              </H3>
              <P className="p16 text-center" opacityVal="0.5">
                <FormattedMessage {...messages.ProfileCompleteContent} />
              </P>
              <div className="benefits-list">
                <P className="p16">
                  <FormattedMessage {...messages.benefitsInfo} />
                </P>
                <UserBulletPointList>
                  <li>
                    <SVG src={circleTickIcon} />
                    <P className="p16" opacityVal="0.5">
                      <FormattedMessage {...messages.benefitsItem1} />
                    </P>
                  </li>
                  <li>
                    <SVG src={circleTickIcon} />
                    <P className="p16" opacityVal="0.5">
                      <FormattedMessage {...messages.benefitsItem2} />
                    </P>
                  </li>
                  <li>
                    <SVG src={circleTickIcon} />
                    <P className="p16" opacityVal="0.5">
                      <FormattedMessage {...messages.benefitsItem3} />
                    </P>
                  </li>
                </UserBulletPointList>
              </div>
              <Button type="button" className="btn btn-primary px-5 mx-auto d-block" onClick={this.completeProfile}>
                <FormattedMessage {...containerMessage.BtnProfileComplete} />
              </Button>
            </div>
          </div>
        </CompleteProfileModal>
      </React.Fragment>
    );
  }
}

ApplyBrief.defaultProps = defaultProps;
ApplyBrief.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  notesOfMotivation: selectors.notesOfMotivation,
  availableJoiningDate: selectors.availableJoiningDate,
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(ApplyBrief);
