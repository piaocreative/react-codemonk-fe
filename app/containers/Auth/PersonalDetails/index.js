/** PersonalDetails
 * This is the Signup page for the App, at the '/about-you' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, change, touch } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import injectReducer from 'utils/injectReducer';
import StorageService from 'utils/StorageService';
import injectSaga from 'utils/injectSaga';
import * as formValidations from 'utils/formValidations';
import ReactModal from 'react-modal';
import Cropper from 'react-cropper';
import get from 'lodash/get';
import split from 'lodash/split';
import moment from 'moment';
import {
  closeIcon,
  API_URL,
  VERSION2,
  TALENT,
  CV,
  USER,
  PICTURE_API,
  DETAILS,
  countryData,
  defaultCountryCode,
  languageData,
  timeXZone,
  genderArray,
  roles,
  roleYears,
} from 'containers/App/constants';
import request from 'utils/request';
import { VALIDATION, MIN_CROPBOX_HEIGHT, MIN_CROPBOX_WIDTH } from 'utils/constants';
import Emitter from 'utils/emitter';
import { PersonalDetailsComponents } from 'components/UserProfileComponents/PersonalDetails';
import { LanguageRating } from 'components/UserProfileComponents/LanguageRating';
import { getFieldValidator } from 'components/UserProfileComponents/fields';
import { ProfessionalProfiles } from 'components/UserProfileComponents/ProfessionalProfiles';
import { H1, H4, LinkButtonMod, FormWrapper, Button, P } from 'components';
import AuthTokenService from 'utils/AuthTokenService';
import { loadRepos } from 'containers/App/actions';
import containerMessage from 'containers/messages';
import { redirectToPage } from 'containers/App/utils';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import ToastifyMessage from 'components/ToastifyMessage';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { defaultProps, propTypes } from 'containers/proptypes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { formFields } from './fields';
import { getPictureDropZone } from './pictureDropZone';
import { getFileDropZone } from './fileDropZone';
import { key } from './constants';
import {
  getDate,
  getFormattedObject,
  getSelectedFieldFromList,
  getSelectedLanguage,
  getSelectedCountryCode,
  getLanguageRatings,
  setInitialReduxState,
  getBtnClass,
  setTouchPersonalDetails,
} from './utils';
import 'cropperjs/dist/cropper.css';

const cropper = React.createRef(null);

export class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      imagePreviewUrl: '',
      aspectRatio: 1,
      isloading: false,
      minCropBoxWidth: MIN_CROPBOX_WIDTH,
      minCropBoxHeight: MIN_CROPBOX_HEIGHT,
      image: '',
      fileName: '',
      uploadedFileSize: '',
    };
  }

  /** onDrop callback
   * @param {*} acceptedFiles is array of accepted files
   * @param {*} rejectedFiles is array of accepted files
   * @author Innovify
   */
  onDrop = (acceptedFiles, rejectedFiles, type) => {
    let errorFiles = '';
    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });
    if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, { className: 'Toast-error' });
    } else if (
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-large' ||
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-small'
    ) {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFile} type="error" />, { className: 'Toast-error' });
    } else if (rejectedFiles.length > 1) {
      toast.error(<ToastifyMessage message={VALIDATION.maxOneFileLength} type="error" />, { className: 'Toast-error' });
    } else {
      const reader = new FileReader();
      const selectedFile = acceptedFiles[0];

      if (type === 'profilePhotoUploader') {
        this.checkFileType(selectedFile, reader);
      } else if (type === 'cvUploader') {
        this.checkCVType(selectedFile, reader);
      }
    }
  };

  /** call on close button click
   * @author Innovify
   */
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  checkCVType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(doc|docx|pdf)$');
    if (regex.test(file.path)) {
      reader.onloadend = () => {
        this.setState(
          {
            // eslint-disable-next-line react/no-unused-state
            csvImage: reader.result,
            fileName: file.path,
            uploadedFileSize: file.size,
            selectedFile,
          },
          () => {
            this.handleSubmitCV();
          },
        );
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCVFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  // eslint-disable-next-line react/no-unused-state
  deleteFile = () => this.setState({ csvImage: '', someErrorInFile: '', fileName: '', uploadedFileSize: '' });

  handleSubmitCV = () => {
    const { selectedFile } = this.state;
    let submitData = '';
    if (selectedFile) {
      const formData = new FormData();
      formData.append('talentCV', selectedFile);
      submitData = formData;
    }
    const apiCallData = {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      data: submitData,
    };
    const requestURL = `${API_URL}${VERSION2}${TALENT}${CV}`;
    request(requestURL, apiCallData)
      .then(this.setCSVFile)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
          className: 'Toast-error',
        });
      });
  };

  setCSVFile = response => {
    if (response.status === 1) {
      this.loaderUserDetails();
    } else {
      toast.error(<ToastifyMessage message={response.message} type="error" />, { className: 'Toast-error' });
      this.setState({ isloading: false });
    }
  };

  checkFileType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(png|jpg|jpeg)$');
    if (regex.test(file.type)) {
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          this.setState({ showModal: true, imagePreviewUrl: reader.result, fileType: file.type });
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  componentDidMount() {
    this.loaderUserDetails();
  }

  /** call on click on crop
   * @author Innovify
   */
  handleClick = () => {
    this.setState({ isloading: true });
    const { fileType } = this.state;
    const requestURL = `${API_URL}${USER}${PICTURE_API}`;
    cropper.current.getCroppedCanvas().toBlob(blob => {
      const formData = new FormData();
      formData.append('photo', blob);
      const dataImg = {
        method: 'PUT',
        headers: {
          Authorization: AuthTokenService.get(),
          'Access-Control-Allow-Origin': '*',
        },
        data: formData,
      };
      request(requestURL, dataImg)
        .then(this.setProfileImage)
        .catch(() => {
          toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, {
            className: 'Toast-error',
          });
        });
    }, fileType || 'image/jpeg');
  };

  setProfileImage = response => {
    if (response.status === 1) {
      StorageService.set('profilePicture', response.data.profilePicture, { hash: true });
      this.handleCloseModal();
      Emitter.emit('profilePicture', get(response, 'data.profilePicture'));
      this.setState({
        image: `${response.data.profilePicture}?_t=${new Date().getTime()}`,
        isloading: false,
      });
    } else {
      toast.error(<ToastifyMessage message={response.message} type="error" />, { className: 'Toast-error' });
      this.setState({ isloading: false });
    }
  };

  loaderUserDetails = () => {
    const data = { method: 'GET' };
    const { history } = this.props;
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(this.setPersonalDetails)
      .catch(() => {
        history.push('/talent/signup');
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setPersonalDetails = response => {
    const { dispatch, history, onChangeLanguage, location } = this.props;
    if (get(response, 'status')) {
      StorageService.set('userVersion', get(response, 'data.version'), { hash: true });
      storeApiSignupStep(get(response, 'data.signupStep'));
      if (get(response, 'data.signupStep') && (history.location && history.location.state && !history.location.state.fromMyProfile)) {
        const currentSignupStep = get(response, 'data.signupStep') + 1;
        redirectToPage(history, location.redirection, currentSignupStep, 1);
      }

      const registerType = get(response, 'data.registerType', '');
      StorageService.set('registerType', registerType, { hash: true });

      this.setState({ image: response.data.profilePicture });
      const countryCode = getSelectedCountryCode(countryData, get(response, 'data.countryCode', defaultCountryCode));
      const country = getSelectedFieldFromList(countryData, 'name', response.data.country);
      const timeZone = getSelectedFieldFromList(timeXZone, 'name', response.data.timeZone);
      const gender = getSelectedFieldFromList(genderArray, 'name', response.data.gender);
      const language = getSelectedLanguage(languageData, response.data.language);
      const primaryRole = getSelectedFieldFromList(roles, 'name', response.data.primaryRole);
      const yearsOfExperience = getSelectedFieldFromList(roleYears, 'value', response.data.yearsOfExperience);
      this.updateInitialStoreValue({
        dispatch,
        response,
        countryCode,
        country,
        timeZone,
        language,
        onChangeLanguage,
        gender,
        primaryRole,
        yearsOfExperience,
      });
      setInitialReduxState({
        response,
        change,
        countryCode,
        country,
        key,
        timeZone,
        dispatch,
        gender,
        primaryRole,
        yearsOfExperience,
      });
      setTouchPersonalDetails(dispatch, key, response);
    } else {
      history.push('/talent/signup');
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleSaveForLater = e => {
    e.preventDefault();
    const {
      dispatch,
      onSaveForLater,
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      dob,
      gender,
      postcode,
      addressLineOne,
      addressLineTwo,
      city,
      country,
      state,
      timeZone,
      language,
      linkedInUrl,
      gitHubUrl,
      stackOverFlowUrl,
      dribbbleUrl,
      behanceUrl,
      portfolioUrl,
      primaryRole,
      yearsOfExperience,
    } = this.props;

    let statePhoneNumber = phoneNumber ? phoneNumber.replace(/ /g, '') : '';
    statePhoneNumber = statePhoneNumber.replace(/^0+/, '');

    const data = {
      firstName,
      lastName,
      countryCode,
      phoneNumber: statePhoneNumber,
      dob,
      gender,
      postcode,
      addressLineOne,
      addressLineTwo,
      city,
      country,
      state,
      timeZone,
      language,
      linkedInUrl,
      gitHubUrl,
      stackOverFlowUrl,
      dribbbleUrl,
      behanceUrl,
      portfolioUrl,
      primaryRole: get(primaryRole, 'value', ''),
      yearsOfExperience: get(yearsOfExperience, 'value', ''),
    };

    const dataKeys = Object.keys(data);
    dataKeys.forEach(fields => {
      if (typeof data[fields] === 'undefined') {
        data[fields] = '';
      }
    });

    const validateObject = {};
    formFields.forEach(fieldName => {
      validateObject[fieldName] = getFieldValidator(fieldName, false);
    });

    const validator = formValidations.createValidator(validateObject, true)(this.props);
    if (Object.keys(validator).length) {
      const keys = Object.keys(validator);
      if (validator.languageRating) {
        dispatch(touch(key, 'languageRating'));
        data.language = [];
      }

      keys.forEach(fields => {
        if (fields !== 'languageCount') data[fields] = '';
      });
    }

    const [, countryNumber] = split(get(countryCode, 'label', ''), '+', 2);
    data.countryCode = countryNumber;
    data.dob = data.dob ? moment(data.dob).format('DD/MM/YYYY') : '';
    data.gender = get(data, 'gender.value', '');
    data.country = get(data, 'country.value', '');
    data.timeZone = get(data, 'timeZone.value', '');
    const userLanguage = data.language;
    const formattedLanguages = [];
    for (let i = 0; i < userLanguage.length; i++) {
      const languages = {
        name: userLanguage[i].value,
        rate: userLanguage[i].rating,
      };
      formattedLanguages.push(languages);
    }
    data.language = formattedLanguages;
    onSaveForLater(e, data);
  };

  deletePhoto = () => {
    const data = { method: 'DELETE' };
    const requestURL = `${API_URL}${USER}${PICTURE_API}`;
    request(requestURL, data).then(response => {
      if (get(response, 'status')) {
        Emitter.emit('profilePicture', '');
        this.setState({ image: '' });
      } else {
        toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      }
    });
  };

  updateInitialStoreValue = ({
    dispatch,
    response,
    countryCode,
    country,
    timeZone,
    language,
    onChangeLanguage,
    gender,
    primaryRole,
    yearsOfExperience,
  }) => {
    dispatch(actions.changeFirstName(response.data.firstName));
    dispatch(actions.changeLastName(response.data.lastName));
    dispatch(actions.changeCountryCode(getFormattedObject({ countryCode }, 'countryCode', 'name', 'phoneCode')));
    dispatch(actions.changePhoneNumber(response.data.phoneNumber));
    dispatch(actions.changeDob(getDate(response.data.dob)));
    dispatch(actions.changeGender(response.data.gender));
    dispatch(actions.changePostcode(response.data.postcode));
    dispatch(actions.changeAddressLineOne(response.data.addressLineOne));
    dispatch(actions.changeAddressLineTwo(response.data.addressLineTwo));
    dispatch(actions.changeCity(response.data.city));
    dispatch(actions.changeCountry(country ? { label: country.name, value: country.name } : ''));
    dispatch(actions.changeState(response.data.state));
    dispatch(actions.changeTimeZone(timeZone ? { value: timeZone.name, label: timeZone.name } : ''));
    dispatch(actions.changeGender(gender ? { value: gender.name, label: gender.name } : ''));
    dispatch(actions.changeLinkedInProfile(response.data.linkedInUrl));
    dispatch(actions.changeGithubProfile(response.data.gitHubUrl));
    dispatch(actions.changeStackoverflowProfile(response.data.stackOverFlowUrl));
    dispatch(actions.changeDribbleProfile(response.data.dribbbleUrl));
    dispatch(actions.changeBehanceProfile(response.data.behanceUrl));
    dispatch(actions.changePersonalProfile(response.data.portfolioUrl));
    dispatch(actions.changePrimaryRole(primaryRole ? { label: primaryRole.name, value: primaryRole.name } : ''));
    dispatch(actions.changeExperience(yearsOfExperience ? { label: yearsOfExperience.name, value: yearsOfExperience.name } : ''));
    this.setInitialRatings(language, response, dispatch, onChangeLanguage);
  };

  setInitialRatings = (language, response, dispatch, onChangeLanguage) => {
    const setLanguages = getLanguageRatings(language, response.data.language);
    dispatch(change(key, 'languageCount', setLanguages));
    dispatch(change(key, 'languageRating', setLanguages));
    onChangeLanguage(setLanguages);
  };

  render() {
    const {
      showModal,
      imagePreviewUrl,
      aspectRatio,
      image,
      isloading,
      minCropBoxWidth,
      minCropBoxHeight,
      fileName,
      uploadedFileSize,
    } = this.state;
    const { addressLineOne, invalid, loading, responseSuccess, responseError, handleSubmit, onSubmitPersonalDetailsForm } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.headingPersonalDetails} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.aboutYouTagLine} />
          </P>
          <FormWrapper>
            <Row>
              <Col className="col-12 col-xl-4 d-flex align-items-center">
                <div className="d-inline">
                  <P className="p20 mb-3 m-xl-0 d-inline">Automatically import data from your resume</P>
                  <P className="p14 mb-0 ms-1 d-inline text-capitalize" opacityVal="0.5">
                    <FormattedMessage {...containerMessage.optionalText} />
                  </P>
                </div>
              </Col>
              <Col className="col-12 col-xl-8">
                <div id="dropZone">{getFileDropZone(this, 'cvUploader', true, fileName, uploadedFileSize)}</div>
              </Col>
            </Row>
            <Row>
              <Col className="col-12 col-xl-4 d-flex align-items-center">
                <P className="p20 mb-3 m-xl-0">
                  <FormattedMessage {...containerMessage.uploadProfilePicture} />
                </P>
              </Col>
              <Col className="col-12 col-xl-8">
                <div id="dropZone">{getPictureDropZone(this, 'profilePhotoUploader')}</div>
              </Col>
            </Row>
            <form onSubmit={handleSubmit}>
              <H4 className="newH4 mt-5 mb-3" opacityVal="0.5">
                <FormattedMessage {...containerMessage.yourDetails} />
              </H4>
              <PersonalDetailsComponents {...this.props} />
              <H4 className="newH4 mt-5 mb-3 d-inline-flex align-items-center" opacityVal="0.5">
                Social profiles
                <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                  <FormattedMessage {...containerMessage.optionalText} />
                </P>
              </H4>
              <ProfessionalProfiles {...this.props} formKey={key} onBoarding />

              <LanguageRating {...this.props} formKey={key} onBoarding />

              <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end my-5">
                <LinkButtonMod
                  color="link"
                  onClick={e => {
                    this.handleSaveForLater(e);
                  }}
                >
                  <FormattedMessage {...containerMessage.skipButton} />
                </LinkButtonMod>
                <Button
                  type="submit"
                  className={`${getBtnClass(loading, responseSuccess, responseError)} mt-3 mt-md-0 ms-md-3`}
                  disabled={invalid || !image || !addressLineOne}
                  onClick={handleSubmit(e => {
                    onSubmitPersonalDetailsForm(e);
                  })}
                >
                  <FormattedMessage {...containerMessage.continueButton} />
                </Button>
              </div>
            </form>
            {this.getReactModal(showModal, imagePreviewUrl, aspectRatio, minCropBoxWidth, minCropBoxHeight, isloading)}
          </FormWrapper>
        </>
      </React.Fragment>
    );
  }

  getReactModal(showModal, imagePreviewUrl, aspectRatio, minCropBoxWidth, minCropBoxHeight, isloading) {
    return (
      <ReactModal
        isOpen={showModal}
        contentLabel="crop"
        onRequestClose={this.handleCloseModal}
        className="modal-dialog"
        style={{ overlay: { zIndex: 12 } }}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
        ariaModal
      >
        <div className="modal-content">
          <div className="modal-header">
            <H4 className="modal-title newH4 d-flex align-items-center my-0">
              <FormattedMessage {...containerMessage.cropperModalHeader} />
            </H4>
            <button type="button" className="modal-dismiss" onClick={this.handleCloseModal}>
              <img src={closeIcon} alt="close" />
              <span className="visually-hidden">Close</span>
            </button>
          </div>
          <div className="modal-body">
            <Cropper
              ref={cropper}
              style={{ height: '400px' }}
              viewMode={1}
              aspectRatio={aspectRatio}
              preview=".img-preview"
              guides={false}
              className="inner-cropper"
              src={imagePreviewUrl}
              toggleDragModeOnDblclick={false}
              responsive={false}
              minCropBoxWidth={minCropBoxWidth}
              minCropBoxHeight={minCropBoxHeight}
            />
          </div>
          <div className="modal-footer modal-footer justify-content-end">
            <Button
              className={`${isloading ? 'loading' : ''} btn-primary`}
              type="button"
              ref={input => {
                this.submit = input;
              }}
              onClick={this.handleClick}
            >
              <FormattedMessage {...containerMessage.btnSave} />
            </Button>
          </div>
        </div>
      </ReactModal>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    onChangeFirstName: evt => dispatch(actions.changeFirstName(evt.target.value)),
    onChangeLastName: evt => dispatch(actions.changeLastName(evt.target.value)),
    onChangeCountryCode: evt => dispatch(actions.changeCountryCode(evt)),
    onChangePhoneNumber: evt => dispatch(actions.changePhoneNumber(evt.target.value)),
    onChangeDob: value => dispatch(actions.changeDob(value)),
    onChangeGender: evt => dispatch(actions.changeGender(evt)),
    onChangePostcode: evt => dispatch(actions.changePostcode(evt.target.value)),
    onChangeAddressLineOne: evt => dispatch(actions.changeAddressLineOne(evt.target.value)),
    onChangeAddressLineTwo: evt => dispatch(actions.changeAddressLineTwo(evt.target.value)),
    onChangeCity: evt => dispatch(actions.changeCity(evt.target.value)),
    onChangeCountry: evt => dispatch(actions.changeCountry(evt)),
    onChangeState: evt => dispatch(actions.changeState(evt.target.value)),
    onChangeTimeZone: evt => dispatch(actions.changeTimeZone(evt)),
    onChangeLanguage: language => dispatch(actions.changeLanguage(language)),
    onChangeLinkedInProfile: evt => dispatch(actions.changeLinkedInProfile(evt.target.value)),
    onChangeGithubProfile: evt => dispatch(actions.changeGithubProfile(evt.target.value)),
    onChangeStackoverflowProfile: evt => dispatch(actions.changeStackoverflowProfile(evt.target.value)),
    onChangeDribbleProfile: evt => dispatch(actions.changeDribbleProfile(evt.target.value)),
    onChangeBehanceProfile: evt => dispatch(actions.changeBehanceProfile(evt.target.value)),
    onChangePersonalProfile: evt => dispatch(actions.changePersonalProfile(evt.target.value)),
    onChangePrimaryRole: evt => dispatch(actions.changePrimaryRole(evt)),
    onChangeExperience: evt => dispatch(actions.changeExperience(evt)),
    onSaveForLater: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(actions.submitPersonalDetailsForm('saveForLater', data));
    },
    onSubmitPersonalDetailsForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.submitPersonalDetailsForm('continue'));
    },
  };
}
PersonalDetails.defaultProps = defaultProps;
PersonalDetails.propTypes = propTypes;
const mapStateToProps = createStructuredSelector({
  firstName: selectors.makeSelectFirstName(),
  lastName: selectors.makeSelectLastName(),
  countryCode: selectors.makeSelectCountryCode(),
  phoneNumber: selectors.makeSelectPhoneNumber(),
  dob: selectors.makeSelectDob(),
  gender: selectors.makeSelectGender(),
  postcode: selectors.makeSelectPostcode(),
  addressLineOne: selectors.makeSelectAddressLineOne(),
  addressLineTwo: selectors.makeSelectAddressLineTwo(),
  city: selectors.makeSelectCity(),
  country: selectors.makeSelectCountry(),
  state: selectors.makeSelectState(),
  timeZone: selectors.makeSelectTimeZone(),
  language: selectors.makeSelectLanguage(),
  languageCount: selectors.makeSelectLanguageCount(),
  languageRating: selectors.makeSelectLanguageRating(),
  linkedInUrl: selectors.makeSelectLinkedInProfile(),
  gitHubUrl: selectors.makeSelectGithubProfile(),
  stackOverFlowUrl: selectors.makeSelectStackoverflowProfile(),
  dribbbleUrl: selectors.makeSelectDribbleProfile(),
  behanceUrl: selectors.makeSelectBehanceProfile(),
  portfolioUrl: selectors.makeSelectPersonalProfile(),
  primaryRole: selectors.makeSelectPrimaryRole(),
  yearsOfExperience: selectors.makeSelectExperience(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
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
    destroyOnUnmount: false,
    enableReinitialize: true,
    touchOnChange: true,
  }),
)(PersonalDetails);
