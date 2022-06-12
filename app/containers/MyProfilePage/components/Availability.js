/** Availability Page
 * This is the Availability page for the App, at the '/my-profile' route
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SVG from 'react-inlinesvg';
import { Card, P } from 'components';
import { reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import Switch from 'components/Switch';
import MultiSelectDatePicker from 'components/MultiSelectDatePicker';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { gtm } from 'utils/Helper';
import reducer from 'containers/Auth/Preferences/reducer';
import { editNoteIcon, calendarIcon } from 'containers/App/constants';
import containerMessage from 'containers/messages';
import saga from 'containers/Auth/Preferences/saga';
import { AvailabilityComponents } from 'components/UserProfileComponents/Availability';
import { makeAvailablity, makeUnavailablity } from 'containers/Auth/Preferences/selectors';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { calendarAvailability, calendarUnavailability, submitPreferenceDetailsForm } from 'containers/Auth/Preferences/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import PopupWrapper from '../PopupWrapper';
import { CardHeader, ActionIcon, SwitchBlock } from '../styles';
import { modals } from '../constants';
import messages from '../messages';

const key = 'preferenceDetails';

export class Availability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditAvailabilityModal: false,
      unavailability: ((props.data && props.data.unavailability) || []).map(d => new Date(d.date)),
    };
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga, loadProfileData, currentModal, modalClose } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.Availability) {
      this.setState({ showEditAvailabilityModal: false });
      modalClose();
      loadProfileData();
    }
  }

  /** call on close button click
   * @author Innovify
   */
  handleEditAvailabilityCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showEditAvailabilityModal: false });
    modalClose();
  };

  /**
   * call on open handleEditPreferenceOpenModal popup
   * @author Innovify
   */
  handleEditAvailabilityOpenModal = () => {
    const { onAvailabilityChange, onUnavailabilityChange, data, modalOpen } = this.props;
    onAvailabilityChange(data.availability);
    onUnavailabilityChange((data.unavailability || []).map(d => new Date(d.date)));
    this.setState({ showEditAvailabilityModal: true });
    modalOpen(modals.Availability);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Availability',
      value: 1,
    });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ unavailability: nextProps.unavailability });
  };

  render() {
    const {
      onSubmitPreferenceForm,
      handleSubmit,
      loading,
      invalid,
      responseSuccess,
      responseError,
      onAvailabilityChange,
      onUnavailabilityChange,
      availability,
      role,
      data = {},
    } = this.props;
    const { showEditAvailabilityModal, unavailability } = this.state;
    return (
      <React.Fragment>
        <Card className="p-30">
          <CardHeader>
            <div className="d-flex align-items-center">
              <SVG src={calendarIcon} className="me-2 title-icon" />
              <P className="p20 mb-0">
                <FormattedMessage {...containerMessage.titleAvailability} />
              </P>
            </div>
            {(role === '1' || role === '3') && (
              <ActionIcon type="button" onClick={this.handleEditAvailabilityOpenModal}>
                <SVG src={editNoteIcon} />
              </ActionIcon>
            )}
          </CardHeader>
          <div className="px-0 pt-0">
            <SwitchBlock>
              <Switch fullWidth checked={data.availability} />
            </SwitchBlock>
            <div id="calendar" className={!data.availability ? 'd-none' : ''}>
              <MultiSelectDatePicker smallSize selectedDays={unavailability} />
            </div>
          </div>
        </Card>
        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showEditAvailabilityModal}
          onDiscard={this.handleEditAvailabilityCloseModal}
          onHandleSubmit={handleSubmit(e => {
            onSubmitPreferenceForm(e);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Availability',
              value: 1,
            });
          })}
          title={messages.modalEditAvailabilityHeader.defaultMessage}
          modalType="edit"
        >
          <form onSubmit={handleSubmit}>
            <AvailabilityComponents
              {...data}
              availability={availability}
              onAvailabilityChange={onAvailabilityChange}
              onUnavailabilityChange={onUnavailabilityChange}
              unavailability={unavailability}
              size="sm"
            />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

Availability.defaultProps = {
  data: {},
  invalid: '',
  responseSuccess: false,
  responseError: false,
  loading: false,
};
Availability.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  invalid: PropTypes.any,
  availability: PropTypes.any,
  unavailability: PropTypes.any,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmitPreferenceForm: PropTypes.func,
  onUnavailabilityChange: PropTypes.func,
  onAvailabilityChange: PropTypes.func,
  dispatch: PropTypes.any,
  loadProfileData: PropTypes.func,
  popUpSaga: PropTypes.bool,
  modalOpen: PropTypes.func,
  modalClose: PropTypes.func,
  currentModal: PropTypes.string,
  role: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    onAvailabilityChange: payload => {
      dispatch(calendarAvailability(payload));
    },
    onUnavailabilityChange: payload => {
      dispatch(calendarUnavailability(payload));
    },
    onSubmitPreferenceForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(submitPreferenceDetailsForm('editAvailability'));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
  availability: makeAvailablity(),
  unavailability: makeUnavailablity(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key, reducer });
const withSaga = injectSaga({ key, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Availability);
