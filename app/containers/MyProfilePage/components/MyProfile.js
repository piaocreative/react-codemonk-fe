/** MyProfile Page
 * This is the MyProfile page for the App, at the '/my-profile' route
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import get from 'lodash/get';
import split from 'lodash/split';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import SVG from 'react-inlinesvg';
import { FormattedMessage } from 'react-intl';
import { Card, H3, H4, ToastifyMessage, P, Button } from 'components';
import SwitchComponent from 'components/Switch';
import { reduxForm } from 'redux-form/immutable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { gtm, getUserType } from 'utils/Helper';
import Cropper from 'react-cropper';
import { defaultProps, propTypes } from 'containers/proptypes';
import { PersonalDetailsComponents } from 'components/UserProfileComponents/PersonalDetails';
import { ProfessionalDetailsComponents } from 'components/UserProfileComponents/ProfessionalDetails';
import ProxyLogin from 'containers/Admin/ProxyLogin';
import { redirectPageURL } from 'containers/App/utils';
import HireTalent from 'containers/TalentListingPage/HireTalent';
import request from 'utils/request';
import AuthTokenService from 'utils/AuthTokenService';
import StorageService from 'utils/StorageService';
import { VALIDATION, MIN_CROPBOX_HEIGHT, MIN_CROPBOX_WIDTH } from 'utils/constants';
import Emitter from 'utils/emitter';
import ToolTip from 'components/ToolTip';
import {
  earthIcon,
  timeXZone,
  genderArray,
  roles,
  roleYears,
  countryData,
  PICTURE_API,
  API_URL,
  USER,
  TALENT,
  VERSION2,
  DOWNLOAD,
  VERIFIED_PROFILE_API,
  userProfileIcon,
  editNoteIcon,
  downloadIcon,
  shareIcon,
  phoneIcon,
  emailIcon,
  githubIcon,
  linkedinNewIcon,
  stackoverflowIcon,
  behanceIcon,
  dribbleIcon,
  starTickIcon,
} from 'containers/App/constants';
import reducer from 'containers/Auth/PersonalDetails/reducer';
import saga from 'containers/Auth/PersonalDetails/saga';
import { getFormattedObject, getSelectedFieldFromList, getSelectedCountryCode } from 'containers/Auth/PersonalDetails/utils';
import { setChangeAndUntouch } from 'containers/Auth/utils';
import { loadRepos } from 'containers/App/actions';
import * as actions from 'containers/Auth/PersonalDetails/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError } from 'containers/App/selectors';
import PopupWrapper from '../PopupWrapper';
import { UserProfile, UserProfileImg, UserInfo, ActionIconLink, ProfileAction, ProfileList, VerifiedContainer } from '../styles';
import * as selectors from './myProfileSelectors';
import messages from '../messages';
import 'cropperjs/dist/cropper.css';
import { getTimzoneOffest, checkIfFileSize, handleLinkClick } from './utils';

const key = 'personalDetails';
const cropper = React.createRef(null);
const formFields = [
  'firstName',
  'lastName',
  'countryCode',
  'phoneNumber',
  'dob',
  'gender',
  'postcode',
  'timeZone',
  'addressLineOne',
  'addressLineTwo',
  'city',
  'country',
  'primaryRole',
  'yearsOfExperience',
];

export class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    const talentLink = get(props, 'data.profileURL', '');
    this.state = {
      showProfilePhotoModal: false,
      showProfileEditModal: false,
      aspectRatio: 1,
      minCropBoxWidth: MIN_CROPBOX_WIDTH,
      minCropBoxHeight: MIN_CROPBOX_HEIGHT,
      isloading: false,
      stateProfilePicture: '',
      imagePreviewUrl: '',
      showHireModal: false,
      pdfButtonDisabled: false,
      talentLink,
      verifiedProfile: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      stateProfilePicture: get(data, 'profilePicture', ''),
      imagePreviewUrl: get(data, 'profilePicture', ''),
      verifiedProfile: get(data, 'verifiedProfile', false),
    });

    Emitter.on('editIntro', () => {
      this.setState({ showProfileEditModal: false });
    });
  }

  componentWillUnmount() {
    Emitter.off('editIntro');
  }

  componentDidUpdate() {
    const { data } = this.props;
    const { stateProfilePicture } = this.state;

    if (get(data, 'profilePicture', '') !== stateProfilePicture) {
      this.setState({ stateProfilePicture: get(data, 'profilePicture', ''), imagePreviewUrl: get(data, 'profilePicture', '') });
    }
  }

  /** call on close button click
   * @author Innovify
   */
  handleProfilePhotoCloseModal = () => {
    this.setState({ showProfilePhotoModal: false });

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit_saved',
      category: 'Talent Portal',
      sectionName: 'Change Photo',
      value: 1,
    });
  };

  /**
   * call on open handleProfilePhotoOpenModal popup
   * @author Innovify
   */
  handleProfilePhotoOpenModal = () => {
    this.setState({ showProfilePhotoModal: true });

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Change Photo',
      value: 1,
    });
  };

  handleProfleEditCloseModal = () => this.setState({ showProfileEditModal: false });

  /**
   * call on open popup
   * @author Innovify
   */
  handleProfileEditOpenModal = () => {
    const { dispatch, data } = this.props;

    const getCountryCode = get(data, 'countryCode') ? getSelectedCountryCode(countryData, data.countryCode) : '';
    const countryCodeValue = get(data, 'countryCode')
      ? getFormattedObject({ countryCode: getCountryCode }, 'countryCode', 'name', 'phoneCode')
      : '';
    const countryCode = get(data, 'countryCode')
      ? { value: get(countryCodeValue, 'value'), label: `${getCountryCode.alpha2code} ${getCountryCode.phoneCode}` }
      : '';

    const country = get(data, 'country') ? getSelectedFieldFromList(countryData, 'name', data.country) : '';

    const genderValue = get(data, 'gender') ? getSelectedFieldFromList(genderArray, 'name', data.gender) : '';
    const gender = genderValue ? { value: genderValue.name, label: genderValue.name } : '';

    const timeZoneValue = get(data, 'timeZone') ? getSelectedFieldFromList(timeXZone, 'name', data.timeZone) : '';
    const timeZone = timeZoneValue ? { value: timeZoneValue.name, label: timeZoneValue.name } : '';

    const primaryRoleValue = get(data, 'primaryRole') ? getSelectedFieldFromList(roles, 'name', data.primaryRole) : '';
    const primaryRole = primaryRoleValue ? { value: primaryRoleValue.name, label: primaryRoleValue.name } : '';

    const yearsOfExperienceValue = get(data, 'yearsOfExperience')
      ? getSelectedFieldFromList(roleYears, 'name', data.yearsOfExperience)
      : '';
    const yearsOfExperience = yearsOfExperienceValue ? { value: yearsOfExperienceValue.name, label: yearsOfExperienceValue.name } : '';

    const dob = get(data, 'dob') ? moment(get(data, 'dob')) : '';

    const fieldData = {
      firstName: get(data, 'firstName'),
      lastName: get(data, 'lastName'),
      countryCode,
      phoneNumber: get(data, 'phoneNumber'),
      dob,
      gender,
      addressLineOne: get(data, 'addressLineOne'),
      addressLineTwo: get(data, 'addressLineTwo'),
      city: get(data, 'city'),
      country,
      postcode: get(data, 'postcode'),
      timeZone,
      primaryRole,
      yearsOfExperience,
    };
    setChangeAndUntouch(dispatch, 'personalDetails', fieldData);
    this.setState({ showProfileEditModal: true });

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'My Profile',
      value: 1,
    });
  };

  handlePicChange = e => {
    const { files } = e.target;
    if (files.length === 1) {
      const checkForError = checkIfFileSize(files[0]);
      if (!checkForError) {
        const reader = new FileReader();
        const selectedFile = files[0];
        this.checkFileType(selectedFile, reader);
      } else {
        toast.error(<ToastifyMessage message={checkForError} type="error" />, { className: 'Toast-error' });
      }
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
          this.setState({ imagePreviewUrl: reader.result, fileType: file.type });
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  profilePhotoUpload = () => {
    this.setState({ isloading: true });
    const requestURL = `${API_URL}${USER}${PICTURE_API}`;
    const { fileType } = this.state;

    cropper.current.getCroppedCanvas().toBlob(blob => {
      const formData = new FormData();
      formData.append('photo', blob);

      const userType = StorageService.get('userType');
      if (userType === '3') formData.append('talentId', StorageService.get('talentId'));

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
    const { loadProfileData } = this.props;
    if (get(response, 'status') === 1) {
      StorageService.set('profilePicture', get(response, 'data.profilePicture'), { hash: true });
      Emitter.emit('profilePicture', get(response, 'data.profilePicture'));
      this.setState({
        stateProfilePicture: `${response.data.profilePicture}?_t=${new Date().getTime()}`,
        imagePreviewUrl: `${response.data.profilePicture}?_t=${new Date().getTime()}`,
        isloading: false,
      });
      this.handleProfilePhotoCloseModal();
      loadProfileData();
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      this.setState({ isloading: false });
    }
  };

  hireMe = e => {
    e.preventDefault();
    this.setState({ showHireModal: true });
    gtm({
      action: 'Button Click',
      label: 'request_hire',
      category: 'Client Portal',
      value: 1,
      directGA: true,
    });
  };

  hireModalClose = () => {
    this.setState({ showHireModal: false });
  };

  showProxyLoginCTA = talentData => {
    let output = '';
    if (!isEmpty(talentData) && get(talentData, 'status') !== 'Suspend') {
      output = (
        <div className="me-auto mt-3 mt-md-0 me-sm-0">
          <ProxyLogin type="talent" userId={get(talentData, 'talentUserId')} {...this.props} />
        </div>
      );
    }
    return output;
  };

  handlePersonalEditSubmit = e => {
    const {
      firstName,
      lastName,
      countryCode: propCountryCode,
      phoneNumber: propPhoneNumber,
      dob,
      gender,
      postcode,
      addressLineOne,
      addressLineTwo,
      city,
      country,
      timeZone,
      primaryRole,
      yearsOfExperience,
      onHandlePersonalEditSubmit,
    } = this.props;

    const [, countryCode] = split(propCountryCode.label, '+', 2);
    let phoneNumber = propPhoneNumber;
    phoneNumber = phoneNumber ? phoneNumber.replace(/ /g, '') : '';
    phoneNumber = phoneNumber.replace(/^0+/, '');

    const formData = {
      firstName,
      lastName,
      countryCode,
      phoneNumber,
      dob: moment(dob).format('DD/MM/YYYY'),
      gender: gender.value,
      postcode,
      addressLineOne,
      addressLineTwo,
      city,
      country: country.value,
      timeZone: timeZone.value,
      primaryRole: primaryRole.value,
      yearsOfExperience: yearsOfExperience.value,
    };
    onHandlePersonalEditSubmit(e, formData);
  };

  renderShareLink = () => {
    const { talentLink } = this.state;
    return (
      <React.Fragment>
        <ProfileAction className="me-2 " onClick={() => handleLinkClick(talentLink)}>
          <ToolTip
            titleClass="action-icon"
            type="other"
            otherIcon={shareIcon}
            placement="top"
            content={messages.shareLabel.defaultMessage}
            tooltipId="shareTooltip"
          />
        </ProfileAction>
      </React.Fragment>
    );
  };

  downloadProfilePdf = response => {
    if (get(response, 'status')) {
      this.setState({ pdfButtonDisabled: false });
      const url = get(response, 'data.pdfPath');
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handlePdfClick = talentId => {
    const { role } = this.props;
    this.setState({ pdfButtonDisabled: true });
    const data = { method: 'GET' };
    const requestURL = role === '1' ? `${API_URL}${TALENT}${DOWNLOAD}` : `${API_URL}${TALENT}${DOWNLOAD}/${talentId}`;
    request(requestURL, data)
      .then(this.downloadProfilePdf)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  renderPdfIcon = () => {
    const { talentID } = this.props;
    const { pdfButtonDisabled } = this.state;
    return (
      <React.Fragment>
        <ProfileAction className="me-2" onClick={() => this.handlePdfClick(talentID)} disabled={pdfButtonDisabled}>
          <ToolTip
            titleClass="action-icon"
            type="other"
            otherIcon={downloadIcon}
            placement="top"
            content={messages.savePDF.defaultMessage}
            tooltipId="pdfTooltip"
          />
        </ProfileAction>
      </React.Fragment>
    );
  };

  renderProfileImagePopup = () => {
    const { invalid, loading, responseSuccess, responseError } = this.props;
    const { imagePreviewUrl, showProfilePhotoModal, aspectRatio, minCropBoxWidth, minCropBoxHeight, isloading } = this.state;

    return (
      <PopupWrapper
        loading={loading}
        responseSuccess={responseSuccess}
        responseError={responseError}
        disabled={invalid}
        isOpen={showProfilePhotoModal}
        onDiscard={this.handleProfilePhotoCloseModal}
        onHandleSubmit={this.profilePhotoUpload}
        handlePicChange={this.handlePicChange}
        title={messages.modelChangePhotoHeader.defaultMessage}
        otherActions
        photoChange
        btnClass={isloading}
        ref={input => {
          this.submit = input;
        }}
      >
        <Row>
          <Col md={8} className="col-12">
            <Cropper
              src={imagePreviewUrl}
              className="inner-cropper"
              ref={cropper}
              style={{ height: '400px' }}
              aspectRatio={aspectRatio}
              guides={false}
              preview=".img-preview"
              zoomable={false}
              zoomOnTouch={false}
              zoomOnWheel={false}
              toggleDragModeOnDblclick={false}
              responsive={false}
              viewMode={1}
              minCropBoxWidth={minCropBoxWidth}
              minCropBoxHeight={minCropBoxHeight}
            />
          </Col>
          <Col md={4} className="d-none d-md-block">
            <H3 className="text-center mt-0 mb-4">
              <FormattedMessage {...messages.titlePreview} />
            </H3>
            <div className="img-preview" style={{ height: 200, margin: '0 auto', borderRadius: '100%', overflow: 'hidden' }} />
          </Col>
        </Row>
      </PopupWrapper>
    );
  };

  handleSwitch = () => {
    const { verifiedProfile } = this.state;
    const { data = [] } = this.props;
    const id = get(data, '_id', '');
    const body = { verifiedProfile: !verifiedProfile };
    const apiCallData = { method: 'PATCH', body };
    const requestURL = `${API_URL}${VERSION2}${TALENT}/${id}${VERIFIED_PROFILE_API}`;
    request(requestURL, apiCallData)
      .then(response => {
        if (get(response, 'status')) {
          this.setState({
            verifiedProfile: !verifiedProfile,
          });
          toast.error(<ToastifyMessage message={get(response, 'message')} type="success" />, { className: 'Toast-success' });
        } else {
          toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
        }
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  render() {
    const { verifiedProfile } = this.state;
    const { handleSubmit, invalid, loading, responseSuccess, responseError, data = [], role, talentID } = this.props;
    const { showProfileEditModal, showHireModal } = this.state;
    const userType = getUserType();
    return (
      <React.Fragment>
        <Card className="p-30">
          <div className="d-flex">
            <UserProfile>
              <UserProfileImg>
                <img
                  src={`${get(data, 'profilePicture', '')}?_t=${new Date().getTime()}`}
                  alt="user profile"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = userProfileIcon;
                  }}
                />
              </UserProfileImg>
              {(role === '1' || role === '3') && (
                <ActionIconLink className="profile-edit" to={{ pathname: redirectPageURL(1), state: { fromMyProfile: true } }}>
                  <SVG src={editNoteIcon} />
                </ActionIconLink>
              )}
              {/* <ActionIcon type="button" onClick={this.handleProfilePhotoOpenModal}>
                  <SVG src={editNoteIcon} />
                </ActionIcon> */}
            </UserProfile>

            <div className="d-flex justify-content-between w-100 flex-column flex-md-row">
              <UserInfo>
                <div className="d-flex">
                  <H3 className="mb-1">
                    {get(data, 'firstName', '')} {get(data, 'lastName', '').charAt(0)}.
                  </H3>
                  <VerifiedContainer>
                    {verifiedProfile && (
                      <ToolTip
                        titleClass={`d-flex ${userType === 'admin' ? 'ms-1' : 'ms-1'}`}
                        type="other"
                        otherIcon={starTickIcon}
                        placement="right"
                        content={
                          <ul className="m-0 ps-2">
                            <li className="text-start">{messages.interviewedForSkillsAndExpertise.defineMessages}</li>
                            <li className="text-start">{messages.checkedForEducationAndExperiences.defineMessages}</li>
                            <li className="text-start">{messages.verifiedPhotoIDandAddress.defineMessages}</li>
                          </ul>
                        }
                        tooltipId="verifiedProfileToltip"
                      />
                    )}
                  </VerifiedContainer>
                  {userType === 'admin' && (
                    <div className="ms-1">
                      <SwitchComponent checked={verifiedProfile} showLabel={false} onChange={() => this.handleSwitch()} />
                    </div>
                  )}
                </div>
                <div className="user-location">
                  <P className="p14 mb-0" opacityVal="0.5">
                    {get(data, 'city', '')}, {get(data, 'country', '')}
                  </P>
                  <P className="p14 mb-0 ms-1" opacityVal="0.5">
                    | {getTimzoneOffest(timeXZone, 'name', data.timeZone)} ({data.timeZone})
                  </P>
                </div>
                <P className="p16 mb-2">
                  {get(data, 'primaryRole', '')} - {get(data, 'yearsOfExperience', '')}
                </P>
                <ProfileList>
                  {get(data, 'linkedInUrl', '') !== '' ? (
                    <li>
                      {role === '2' ? (
                        <SVG src={linkedinNewIcon} />
                      ) : (
                        <a href={get(data, 'linkedInUrl', '')} target="_blank" title="Linkdin">
                          <SVG src={linkedinNewIcon} />
                        </a>
                      )}
                    </li>
                  ) : (
                    ''
                  )}
                  {get(data, 'portfolioUrl', '') !== '' ? (
                    <li>
                      {role === '2' ? (
                        <SVG src={earthIcon} className="earth-icon" />
                      ) : (
                        <a href={get(data, 'portfolioUrl', '')} target="_blank" title="Stack Overflow">
                          <SVG src={earthIcon} className="earth-icon" />
                        </a>
                      )}
                    </li>
                  ) : (
                    ''
                  )}
                  {get(data, 'gitHubUrl', '') !== '' ? (
                    <li>
                      {role === '2' ? (
                        <SVG src={githubIcon} />
                      ) : (
                        <a href={get(data, 'gitHubUrl', '')} target="_blank" title="GitHub">
                          <SVG src={githubIcon} />
                        </a>
                      )}
                    </li>
                  ) : (
                    ''
                  )}
                  {get(data, 'stackOverFlowUrl', '') !== '' ? (
                    <li>
                      {role === '2' ? (
                        <SVG src={stackoverflowIcon} />
                      ) : (
                        <a href={get(data, 'stackOverFlowUrl', '')} target="_blank" title="Stack Overflow">
                          <SVG src={stackoverflowIcon} />
                        </a>
                      )}
                    </li>
                  ) : (
                    ''
                  )}
                  {get(data, 'behanceUrl', '') !== '' ? (
                    <li>
                      {role === '2' ? (
                        <SVG src={behanceIcon} />
                      ) : (
                        <a href={get(data, 'behanceUrl', '')} target="_blank" title="Stack Overflow">
                          <SVG src={behanceIcon} />
                        </a>
                      )}
                    </li>
                  ) : (
                    ''
                  )}
                  {get(data, 'dribbbleUrl', '') !== '' ? (
                    <li>
                      {role === '2' ? (
                        <SVG src={dribbleIcon} />
                      ) : (
                        <a href={get(data, 'dribbbleUrl', '')} target="_blank" title="Dribble">
                          <SVG src={dribbleIcon} />
                        </a>
                      )}
                    </li>
                  ) : (
                    ''
                  )}
                </ProfileList>
              </UserInfo>

              <div className="d-flex mt-3 mt-md-0 flex-column">
                <div className="d-flex align-items-center align-items-md-start order-2 order-md-1 flex-wrap justify-content-end">
                  {this.renderShareLink()}
                  {this.renderPdfIcon()}
                  {(role === '1' || role === '3') && (
                    <ActionIconLink to={{ pathname: redirectPageURL(1), state: { fromMyProfile: true } }}>
                      <SVG src={editNoteIcon} />
                    </ActionIconLink>
                  )}
                  {/* <ActionIcon type="button" onClick={this.handleProfileEditOpenModal}>
                      <SVG src={editNoteIcon} />
                    </ActionIcon> */}
                  {role === '2' && (
                    <Button type="button" className="btn-outline btn-sm mt-3 mt-md-0" onClick={e => this.hireMe(e)}>
                      <span>{messages.btnHire.defaultMessage}</span>
                    </Button>
                  )}
                  {role === '4' && this.showProxyLoginCTA(data)}
                </div>
                {role === '4' && (
                  <div className="d-flex flex-column mt-md-2 order-1 order-md-2">
                    {data.email && (
                      <P className="p14 mb-2 text-nowrap">
                        <SVG src={emailIcon} /> <span className="ms-1">{get(data, 'email', '')}</span>
                      </P>
                    )}
                    {data.phoneNumber && (
                      <P className="p14 mb-0">
                        <SVG src={phoneIcon} />
                        <span className="ms-2">
                          + {get(data, 'countryCode', '')}
                          {get(data, 'phoneNumber', '')}
                        </span>
                      </P>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
        {this.renderProfileImagePopup()}
        <PopupWrapper
          modalId="showProfileEditModal"
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showProfileEditModal}
          onDiscard={this.handleProfleEditCloseModal}
          onHandleSubmit={handleSubmit(e => {
            this.handlePersonalEditSubmit(e);
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'My Profile',
              value: 1,
            });
          })}
          modalType="edit"
          title={messages.modelEditIntroHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <H4 className="modal-title mt-0">Personal</H4>
            <PersonalDetailsComponents {...this.props} size="sm" />
            <H4 className="modal-title">Profesional</H4>
            <ProfessionalDetailsComponents {...this.props} size="sm" />
          </form>
        </PopupWrapper>

        {showHireModal && <HireTalent talentId={talentID} showHireModal={showHireModal} hireModalClose={() => this.hireModalClose()} />}
      </React.Fragment>
    );
  }
}

MyProfile.defaultProps = defaultProps;
MyProfile.propTypes = propTypes;

export function mapDispatchToProps(dispatch) {
  return {
    onHandlePersonalEditSubmit: (evt, data) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(actions.editPersonalDetails(data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  firstName: selectors.firstName,
  lastName: selectors.lastName,
  countryCode: selectors.countryCode,
  phoneNumber: selectors.phoneNumber,
  dob: selectors.dob,
  gender: selectors.gender,
  postcode: selectors.postcode,
  addressLineOne: selectors.addressLineOne,
  addressLineTwo: selectors.addressLineTwo,
  city: selectors.city,
  country: selectors.country,
  timeZone: selectors.timeZone,
  primaryRole: selectors.primaryRole,
  yearsOfExperience: selectors.yearsOfExperience,
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
    fields: formFields,
    touchOnChange: true,
  }),
)(MyProfile);
