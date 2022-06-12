/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import { renderField } from 'utils/Fields';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import Cropper from 'react-cropper';
import get from 'lodash/get';
import StorageService from 'utils/StorageService';
import { closeIcon, API_URL, USER, PICTURE_API, countryData } from 'containers/App/constants';
import request from 'utils/request';
import * as formValidations from 'utils/formValidations';
import { CountryCode } from 'containers/Auth/PersonalDetails/style';
import Emitter from 'utils/emitter';
import ToastifyMessage from 'components/ToastifyMessage';
import { FormLabel, P, H4, Selects, Button } from 'components';
import containerMessage from 'containers/messages';
import AuthTokenService from 'utils/AuthTokenService';
import { VALIDATION } from 'utils/constants';
import componentMessage from 'components/UserProfileComponents/messages';
import { getPictureDropZone } from 'containers/Auth/PersonalDetails/pictureDropZone';
import { clientRoles } from './constants';
import messages from './messages';
import 'cropperjs/dist/cropper.css';

const cropper = React.createRef(null);

export class AboutYouFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      imagePreviewUrl: '',
      aspectRatio: 1,
      isloading: false,
      minCropBoxWidth: 200,
      minCropBoxHeight: 200,
      image: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { image } = this.props;
    if (prevProps.image !== image) {
      this.setState({ image });
    }
  }

  /** onDrop callback
   * @param {*} acceptedFiles is array of accepted files
   * @param {*} rejectedFiles is array of accepted files
   * @author Innovify
   */
  onDrop = (acceptedFiles, rejectedFiles) => {
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
      this.checkFileType(selectedFile, reader);
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

  /** call on close button click
   * @author Innovify
   */
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

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

  render() {
    const {
      firstName,
      lastName,
      jobTitle,
      countryCode,
      phoneNumber,
      jobRole,
      onChangeFirstName,
      onChangeLastName,
      onChangeCountryCode,
      onChangePhoneNumber,
      onChangeJobTitle,
      onChangeJobRole,
    } = this.props;
    const { showModal, imagePreviewUrl, aspectRatio, isloading, minCropBoxWidth, minCropBoxHeight } = this.state;
    return (
      <>
        <Row>
          <Col className="col-12 col-xl-4 d-flex align-items-center">
            <div className="d-inline">
              <P className="p20 mb-3 m-xl-0 d-inline">
                <FormattedMessage {...containerMessage.uploadProfilePicture} />
              </P>
              <P className="p14 mb-0 ms-1 d-inline text-capitalize" opacityVal="0.5">
                <FormattedMessage {...containerMessage.optionalText} />
              </P>
            </div>
          </Col>
          <Col className="col-12 col-xl-8">
            <div id="dropZone">{getPictureDropZone(this, 'profilePhotoUploader')}</div>
          </Col>
        </Row>
        <H4 className="newH4 mt-5 mb-3" opacityVal="0.5">
          <FormattedMessage {...containerMessage.yourDetails} />
        </H4>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelFirstName} />
              </FormLabel>
              <Field
                name="firstName"
                component={renderField}
                type="text"
                defaultValue={firstName}
                placeholder={componentMessage.placeHolderFirstName.defaultMessage}
                onChange={onChangeFirstName}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelLastName} />
              </FormLabel>
              <Field
                name="lastName"
                component={renderField}
                type="text"
                defaultValue={lastName}
                placeholder={componentMessage.placeHolderLastName.defaultMessage}
                onChange={onChangeLastName}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...componentMessage.labelPhoneNumber} />
              </FormLabel>
              <div className="d-flex">
                <CountryCode>
                  <Field
                    name="countryCode"
                    component={Selects}
                    defaultValue={countryCode}
                    options={countryData.map(code => ({
                      label: `${code.name} ${code.phoneCode}`,
                      value: code.name,
                    }))}
                    onChange={onChangeCountryCode}
                    placeHolder="+44"
                    fullWidthOption
                    validate={[formValidations.requiredSelect]}
                  />
                </CountryCode>
                <div className="w-100 mw-100 labelSpacing ms-2">
                  <Field
                    name="phoneNumber"
                    type="text"
                    component={renderField}
                    placeholder={componentMessage.placeHolderPhoneNumber.defaultMessage}
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                    validate={[formValidations.phoneNumberMax12, formValidations.requiredField]}
                  />
                </div>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelJobTitle} />
              </FormLabel>
              <Field
                name="jobTitle"
                component={renderField}
                type="text"
                defaultValue={jobTitle}
                onChange={onChangeJobTitle}
                placeholder={componentMessage.placeholderJobTitle.defaultMessage}
                validate={[formValidations.minLength2, formValidations.maxLength30, formValidations.requiredField]}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...messages.labelJobRole} />
              </FormLabel>
              <Field
                name="jobRole"
                type="text"
                component={Selects}
                defaultValue={jobRole}
                searchable
                options={clientRoles.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                onChange={onChangeJobRole}
                placeHolder={componentMessage.placeholderEmpType.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
          </Col>
        </Row>
        {this.getReactModal(showModal, imagePreviewUrl, aspectRatio, minCropBoxWidth, minCropBoxHeight, isloading)}
      </>
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

AboutYouFields.defaultProps = {
  image: '',
  firstName: '',
  lastName: '',
  countryCode: {},
  phoneNumber: '',
  jobTitle: '',
  jobRole: [],
  onChangeFirstName: () => {},
  onChangeLastName: () => {},
  onChangeCountryCode: () => {},
  onChangePhoneNumber: () => {},
  onChangeJobTitle: () => {},
  onChangeJobRole: () => {},
};
AboutYouFields.propTypes = {
  image: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  countryCode: PropTypes.object,
  phoneNumber: PropTypes.string,
  jobTitle: PropTypes.string,
  jobRole: PropTypes.array,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangeCountryCode: PropTypes.func,
  onChangePhoneNumber: PropTypes.func,
  onChangeJobTitle: PropTypes.func,
  onChangeJobRole: PropTypes.func,
};
