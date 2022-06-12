/* eslint-disable no-underscore-dangle */
/**
 * CompanyLocationPage
 * This is the onboarding page for the client user, at the '/company-location' route
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import StorageService from 'utils/StorageService';
import { loadRepos } from 'containers/App/actions';
import { reduxForm, change, Field, untouch, touch } from 'redux-form/immutable';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import request from 'utils/request';
import { renderField } from 'utils/Fields';
import { getTimzoneOffest } from 'containers/MyProfilePage/components/utils';
import * as formValidations from 'utils/formValidations';
import { VALIDATION } from 'utils/constants';
import { P, H1, LinkButtonMod, FormWrapper, Button, UserInfoList, FormLabel } from 'components';
import {
  trashIcon,
  editNoteIcon,
  plusSquareIcon,
  toastMessages,
  API_URL,
  CLIENT,
  COMPANY_LOCATION_API,
  CLIENT_SIGNUP_PAGE_URL,
  CLIENT_DASHBOARD,
  timeXZone,
} from 'containers/App/constants';
import { getUserDetails, handleBackButton, storeApiSignupStep } from 'containers/Auth/utils';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import ModalWrapper from 'components/ModalWrapper';
import ToastifyMessage from 'components/ToastifyMessage';
import AddressFields from './AddressFields';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { key } from './constants';

export class CompanyLocationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddLocationsModal: false,
      locationList: [],
      locationsModalType: '',
    };
  }

  componentDidMount() {
    const { history } = this.props;
    getUserDetails(history)
      .then(response => {
        this.fetchFieldValues(response, false);
      })
      .catch(() => {
        history.push('/talent/signup');
        toast.error(<ToastifyMessage message={toastMessages.errorMSG} type="error" />, { className: 'Toast-error' });
      });
  }

  fetchFieldValues = response => {
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      this.setState({ locationList: get(response, 'data.billing.companyLocation', []) });
    }
  };

  handleLocationsOpenModal = (type, id) => {
    const { dispatch } = this.props;
    if (type === 'add') {
      const data = {
        locationName: '',
        addressLineOne: '',
        postcode: '',
        city: '',
        country: [],
        timezone: [],
        state: '',
        addressLineTwo: '',
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeCountry(data.country));
      dispatch(actions.changeTimeZone(data.timezone));
    }
    if (type === 'edit') {
      const { locationList } = this.state;
      // eslint-disable-next-line no-underscore-dangle
      const locationData = locationList.find(obj => obj._id === id);

      const dataObj = {
        locationName: locationData.locationName,
        addressLineOne: locationData.addressLineOne,
        postcode: locationData.postcode,
        city: locationData.city,
        country: { label: locationData.country, value: locationData.country },
        timezone: { label: locationData.timezone, value: locationData.timezone },
        state: locationData.state,
        addressLineTwo: locationData.addressLineTwo,
      };
      Object.keys(dataObj).forEach(fieldKey => {
        dispatch(change(key, fieldKey, dataObj[fieldKey]));
        dispatch(untouch(key, fieldKey));
        dispatch(touch(key, fieldKey));
      });
      dispatch(actions.changeCountry(dataObj.country));
      dispatch(actions.changeTimeZone(dataObj.timezone));
      dispatch(actions.changePostcode(dataObj.postcode));
    }
    this.setState({ showAddLocationsModal: true, locationsModalType: type, selectedLocationID: id });
  };

  handleLocationsCloseModal = () => {
    this.setState({ showAddLocationsModal: false });
  };

  handleSubmitCompanyLocationForm = e => {
    const {
      locationName,
      addressLineOne,
      postcode,
      city,
      country,
      timezone,
      state,
      addressLineTwo,
      onSubmitAddCompanyLocationForm,
      history,
    } = this.props;
    const { locationsModalType, selectedLocationID } = this.state;

    const data = {
      locationName,
      addressLineOne,
      postcode,
      city,
      country: country && country.value,
      timezone: timezone && timezone.value,
      state,
      addressLineTwo,
    };

    if (locationsModalType === 'edit') {
      // eslint-disable-next-line no-underscore-dangle
      data._id = selectedLocationID;
    }

    onSubmitAddCompanyLocationForm(e, locationsModalType, data, () => {
      getUserDetails(history)
        .then(res => {
          this.setState({ showAddLocationsModal: false });
          this.fetchFieldValues(res, false);
        })
        .catch(() => {
          history.push(CLIENT_SIGNUP_PAGE_URL);
          toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
        });
    });
  };

  deleteRecord = id => {
    const { history } = this.props;
    const data = {
      method: 'DELETE',
      body: { _id: id },
    };
    const requestURL = `${API_URL}${CLIENT}${COMPANY_LOCATION_API}`;
    request(requestURL, data).then(response => {
      if (get(response, 'status')) {
        getUserDetails(history)
          .then(res => {
            this.fetchFieldValues(res, false);
          })
          .catch(() => {
            history.push(CLIENT_SIGNUP_PAGE_URL);
            toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
          });
      } else {
        toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      }
    });
  };

  handleSaveForLater = (e, type) => {
    const { onSaveForLater } = this.props;
    if (type !== 'continue') {
      e.preventDefault();
    }
    if (type === 'saveForLater') onSaveForLater(e, {}, type);
  };

  render() {
    const { history, invalid, loading, responseSuccess, responseError, handleSubmit, locationName, onChangeLocationName } = this.props;
    const { locationList, showAddLocationsModal, locationsModalType } = this.state;
    const formValid = locationList.length > 0;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.companyLocations} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.companyLocationsTagLine} />
          </P>
          <FormWrapper>
            <form onSubmit={handleSubmit}>
              <UserInfoList>
                {locationList.map(item => (
                  <li>
                    <div>
                      <div className="list-outer-block">
                        <div className="list-content">
                          <div>
                            <P className="p16 mb-1">{item.locationName}</P>
                            <P className="p14 mb-2" opacityVal="0.5">
                              {item.addressLineOne}, {item.addressLineTwo && `${item.addressLineTwo}, `} {item.city} - {item.postcode},{' '}
                              {item.addressLineTwo && `${item.state}`} ({item.country})
                            </P>
                            <P className="p14 mb-3" opacityVal="0.5">
                              {item.timezone} ({getTimzoneOffest(timeXZone, 'name', item.timezone)})
                            </P>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-action">
                      <Button type="button" className="btn-icon btn-link ms-auto" onClick={() => this.deleteRecord(item._id)}>
                        <SVG src={trashIcon} className="me-1" />
                        Delete
                      </Button>
                      <Button
                        type="button"
                        className="btn-icon btn-link ms-auto"
                        onClick={() => this.handleLocationsOpenModal('edit', item._id)}
                      >
                        <SVG src={editNoteIcon} className="me-1" />
                        Edit
                      </Button>
                    </div>
                  </li>
                ))}
                <li>
                  <Button
                    type="button"
                    className="btn-icon text-primary btn-link ms-auto"
                    onClick={() => this.handleLocationsOpenModal('add')}
                  >
                    <SVG src={plusSquareIcon} className="me-1" />
                    {messages.labelAdd.defaultMessage}
                  </Button>
                </li>
              </UserInfoList>
              <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end my-5">
                <LinkButtonMod
                  color="link"
                  onClick={e => {
                    this.handleSaveForLater(e, 'saveForLater');
                  }}
                >
                  <FormattedMessage {...messages.saveLaterButton} />
                </LinkButtonMod>
                <Button
                  type="button"
                  className={`${getBtnClass(loading, responseSuccess, responseError)} mt-3 mt-md-0 ms-md-3`}
                  disabled={!formValid}
                  onClick={e => {
                    StorageService.set('signupStep', 3, { hash: true });
                    handleBackButton(e, history, CLIENT_DASHBOARD);
                  }}
                >
                  <FormattedMessage {...messages.continueButton} />
                </Button>
              </div>
            </form>
          </FormWrapper>

          <ModalWrapper
            loading={loading}
            responseSuccess={responseSuccess}
            responseError={responseError}
            disabled={invalid}
            isOpen={showAddLocationsModal}
            onDiscard={this.handleLocationsCloseModal}
            onHandleSubmit={handleSubmit(this.handleSubmitCompanyLocationForm)}
            title={`${locationsModalType === 'add' ? 'Add' : 'Edit'} location`}
            primaryBtnText="Save"
          >
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Name</FormLabel>
                <Field
                  name="locationName"
                  component={renderField}
                  type="text"
                  defaultValue={locationName}
                  placeholder="Company name / Headquarter / Subsidiary"
                  onChange={onChangeLocationName}
                  validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
                />
              </FormGroup>
              <AddressFields {...this.props} />
            </form>
          </ModalWrapper>
        </>
      </React.Fragment>
    );
  }
}

CompanyLocationPage.defaultProps = {
  location: {},
  dispatch: () => {},
  history: {},
  invalid: true,
  loading: false,
  responseSuccess: false,
  responseError: false,
  handleSubmit: () => {},
  onSubmitAddCompanyLocationForm: () => {},
  onSaveForLater: () => {},
  onChangeLocationName: () => {},
  locationName: '',
  addressLineOne: '',
  postcode: '',
  city: '',
  country: '',
  timezone: '',
  state: '',
  addressLineTwo: '',
};

CompanyLocationPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
  responseSuccess: PropTypes.bool,
  responseError: PropTypes.bool,
  handleSubmit: PropTypes.func,
  location: PropTypes.object,
  onSubmitAddCompanyLocationForm: PropTypes.func,
  onSaveForLater: PropTypes.func,
  locationName: PropTypes.string,
  addressLineOne: PropTypes.string,
  postcode: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  timezone: PropTypes.string,
  state: PropTypes.string,
  addressLineTwo: PropTypes.string,
  onChangeLocationName: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLocationName: evt => dispatch(actions.changeLocationName(evt.target.value)),
    onChangePostcode: evt => dispatch(actions.changePostcode(evt.target.value)),
    onChangeAddressLineOne: evt => dispatch(actions.changeAddressLineOne(evt.target.value)),
    onChangeAddressLineTwo: evt => dispatch(actions.changeAddressLineTwo(evt.target.value)),
    onChangeCity: evt => dispatch(actions.changeCity(evt.target.value)),
    onChangeCountry: evt => dispatch(actions.changeCountry(evt)),
    onChangeState: evt => dispatch(actions.changeState(evt.target.value)),
    onChangeTimeZone: evt => dispatch(actions.changeTimeZone(evt)),
    // onSaveForLater: () => dispatch(actions.saveForLater('saveForLater')),
    onSaveForLater: (evt, data, type) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitAddCompanyLocationForm(type, data));
    },
    onSubmitAddCompanyLocationForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.submitAddCompanyLocationForm(type, data, onSuccess));
    },
  };
}
const mapStateToProps = createStructuredSelector({
  locationName: selectors.makeSelectLocationName(),
  postcode: selectors.makeSelectPostcode(),
  addressLineOne: selectors.makeSelectAddressLineOne(),
  addressLineTwo: selectors.makeSelectAddressLineTwo(),
  city: selectors.makeSelectCity(),
  country: selectors.makeSelectCountry(),
  state: selectors.makeSelectState(),
  timezone: selectors.makeSelectTimeZone(),
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
)(CompanyLocationPage);
