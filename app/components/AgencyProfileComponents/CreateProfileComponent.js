/** CreateProfileComponent
 */
import React from 'react';
import { Field, change } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { closeIcon } from 'containers/App/constants';
import { EditorState } from 'draft-js';
import get from 'lodash/get';
import { FormGroup, Row, Col } from 'reactstrap';
import Cropper from 'react-cropper';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { renderField, renderFieldoptCheckbox } from 'utils/Fields';
import { UserNameFields } from 'components/UserProfileComponents/UserNameFields';
import { PhoneNumberField } from 'components/ClientProfileComponents/PhoneNumberField';
import { CompanyDetailsFields } from 'components/UserProfileComponents/CompanyDetailsFields';
import { TradingDetailsFields } from 'components/UserProfileComponents/TradingDetailsFields';
import { TradingAddressFields } from 'components/UserProfileComponents/TradingAddressFields';
import { getFieldValidator } from 'components/UserProfileComponents/fields';
import { VALIDATION, MIN_CROPBOX_WIDTH, MIN_CROPBOX_HEIGHT } from 'utils/constants';
import { H4, Button, FormLabel, P } from 'components';
import { getDropZone } from 'containers/Auth/PersonalDetails/dropZone';
import ToastifyMessage from 'components/ToastifyMessage';
import messages from 'containers/Auth/Talent/AgencyCreateProfilePage/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import { key } from 'containers/Auth/Talent/AgencyCreateProfilePage/constants';
import 'cropperjs/dist/cropper.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const cropper = React.createRef(null);

export class CreateProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      // eslint-disable-next-line react/no-unused-state
      image: get(props, 'image', ''),
      imagePreviewUrl: '',
      aspectRatio: 1,
      isloading: false,
      minCropBoxWidth: MIN_CROPBOX_WIDTH,
      minCropBoxHeight: MIN_CROPBOX_HEIGHT,
      uploaderType: 'logoUploader',
    };
  }

  componentDidMount() {
    const { dispatch, onBoarding } = this.props;
    if (!onBoarding) dispatch(change(key, 'tradingSummary', EditorState.createEmpty()));
  }

  componentDidUpdate(prevProps) {
    const { image } = this.props;
    if (prevProps.image !== image) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ image });
    }
  }

  handleClick = () => {
    const { dispatch } = this.props;
    this.setState({ isloading: true });
    const { fileType } = this.state;
    cropper.current.getCroppedCanvas().toBlob(blob => {
      dispatch(change(key, 'tradingLogo', blob));
      this.setProfileImage(blob);
    }, fileType || 'image/jpeg');
  };

  setProfileImage = blob => {
    const { handleLogoSet } = this.props;
    this.handleCloseModal();

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;

      this.setState({
        // eslint-disable-next-line react/no-unused-state
        image: `${base64data}`,
        isloading: false,
      });

      handleLogoSet(base64data);
    };
  };

  deletePhoto = () => {
    const { dispatch, handleLogoSet } = this.props;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ image: '' });
    dispatch(change(key, 'tradingLogo', ''));

    handleLogoSet('');
  };

  /** call on close button click
   * @author Innovify
   */
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    let errorFiles = '';

    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });
    if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, { className: 'Toast-error' });
    } else if (rejectedFiles.length > 1) {
      toast.error(<ToastifyMessage message={VALIDATION.maxOneFileLength} type="error" />, { className: 'Toast-error' });
    } else if (
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-large' ||
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-small'
    ) {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFile} type="error" />, { className: 'Toast-error' });
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
          this.setState({
            showModal: true,
            imagePreviewUrl: reader.result,
            fileType: file.type,
          });
        };
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  render() {
    const { tradingAddressEditFlag = true, editFlag = true, onBoarding = false } = this.props;
    const { showModal, imagePreviewUrl, aspectRatio, isloading, minCropBoxWidth, minCropBoxHeight, uploaderType } = this.state;
    const tradingAddressEdit = tradingAddressEditFlag && editFlag;
    const designationColumn = onBoarding && 6;
    return (
      <React.Fragment>
        <form>
          <H4>
            <FormattedMessage {...messages.titlePersonaldetails} />
          </H4>
          <UserNameFields formKey={key} {...this.props} />
          <Row>
            <Col md={designationColumn}>
              <FormGroup>
                <FormLabel>
                  <FormattedMessage {...messages.labelRoleInCompnay} />
                </FormLabel>
                <Field
                  name="designation"
                  type="text"
                  component={renderField}
                  disabled={!editFlag}
                  placeholder="e.g Product Manager"
                  validate={getFieldValidator('designation', true)}
                />
              </FormGroup>
            </Col>
            {onBoarding && (
              <Col md={6}>
                <PhoneNumberField formKey={key} {...this.props} />
              </Col>
            )}
          </Row>
          <CompanyDetailsFields formKey={key} {...this.props} />
          <TradingDetailsFields formKey={key} {...this.props} />
          <H4>
            <FormattedMessage {...messages.titleLogo} />
          </H4>
          <FormGroup>
            <FormLabel>
              <FormattedMessage {...messages.titleTradingCompanyLogo} />
            </FormLabel>
            <div id="dropZone">{getDropZone(this, uploaderType, editFlag)}</div>
          </FormGroup>
          <H4>
            <FormattedMessage {...messages.titleTradingOfcAdd} />
          </H4>
          <P className="text-start mb-4">
            <small className="p-0">
              <Field
                name="tradingOfficeAddressCheckbox"
                type="checkbox"
                component={renderFieldoptCheckbox}
                disabled={!editFlag}
                message="Same as company's registered address"
              />
            </small>
          </P>
          <TradingAddressFields formKey={key} {...this.props} editFlag={tradingAddressEdit} />
        </form>

        {this.getReactModal(showModal, imagePreviewUrl, aspectRatio, minCropBoxWidth, minCropBoxHeight, isloading)}
      </React.Fragment>
    );
  }

  getReactModal(showModal, imagePreviewUrl, aspectRatio, minCropBoxWidth, minCropBoxHeight, isloading) {
    return (
      <React.Fragment>
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
                <FormattedMessage {...messages.modelHeader} />
              </H4>
              <button type="button" className="modal-dismiss" onClick={this.handleCloseModal}>
                <img src={closeIcon} alt="close" />
                <span className="visually-hidden">Close</span>
              </button>
            </div>
            <div className="modal-body">
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
                  <H4 className="text-center mt-0 mb-4">
                    <FormattedMessage {...messages.titlePreview} />
                  </H4>
                  <div className="img-preview" style={{ height: 200, margin: '0 auto', borderRadius: '100%', overflow: 'hidden' }} />
                </Col>
              </Row>
            </div>
            <div className="modal-footer modal-footer justify-content-end">
              <Button
                className={`${isloading ? 'loading' : ''} btn-primary btn-sm`}
                type="button"
                ref={input => {
                  this.submit = input;
                }}
                onClick={this.handleClick}
              >
                <FormattedMessage {...messages.applyButton} />
              </Button>
            </div>
          </div>
        </ReactModal>
      </React.Fragment>
    );
  }
}

CreateProfileComponent.defaultProps = defaultProps;
CreateProfileComponent.propTypes = propTypes;

export default CreateProfileComponent;
