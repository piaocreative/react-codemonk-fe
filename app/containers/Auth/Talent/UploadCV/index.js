/** UploadCV
 * This is the upload cv page for the App, at the '/upload-cv' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import injectSaga from 'utils/injectSaga';
import { ContainerMod, ProgressMod, Card, H1, H4, LinkButtonMod, FormWrapper, Button, P } from 'components';
import { FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { stepSize } from 'containers/App/utils';
import { VALIDATION } from 'utils/constants';
import StorageService from 'utils/StorageService';
import { handleBackButton } from 'containers/Auth/utils';
import { getBtnClass } from 'containers/Auth/PersonalDetails/utils';
import { PaymentPageWrapper } from 'containers/Auth/PaymentAndBilling/payment-styles';
import { getDropZone } from 'containers/Auth/PersonalDetails/dropZone';
import ToastifyMessage from 'components/ToastifyMessage';
import containerMessage from 'containers/messages';
import { defaultProps, propTypes } from 'containers/proptypes';
import { UploadTitle } from 'containers/Auth/Talent/AddTalentsPage/styles';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import { key } from './constants';

export class UploadCV extends React.Component {
  constructor(props) {
    super(props);

    const registerType = StorageService.get('registerType');
    const showBackButton = registerType !== 'agency';
    const step = registerType === 'agency' ? 1 : 2;

    this.state = {
      uploaderType: 'cvUploader',
      fileName: '',
      showBackButton,
      step,
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    let errorFiles = '';
    rejectedFiles.forEach((file, index) => {
      errorFiles = `${errorFiles} (${index + 1}) ${file.name}`;
    });

    if (get(rejectedFiles, '[0].errors[0].code') === 'file-invalid-type') {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCVFileType} type="error" />, { className: 'Toast-error' });
    } else if (
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-large' ||
      get(rejectedFiles, '[0].errors[0].code') === 'file-too-small'
    ) {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCVFile} type="error" />, { className: 'Toast-error' });
    } else if (rejectedFiles.length > 1) {
      toast.error(<ToastifyMessage message={VALIDATION.maxOneFileLength} type="error" />, { className: 'Toast-error' });
    } else {
      const reader = new FileReader();
      const selectedFile = acceptedFiles[0];
      this.checkCVType(selectedFile, reader);
    }
  };

  checkCVType(selectedFile, reader) {
    if (!selectedFile) {
      return;
    }
    const file = selectedFile;
    const regex = new RegExp('(.*?).(doc|docx|pdf)$');
    if (regex.test(file.path)) {
      reader.onloadend = () => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          image: reader.result,
          fileName: file.path,
          selectedFile,
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(<ToastifyMessage message={VALIDATION.invalidCVFileType} type="error" />, {
        className: 'Toast-error',
      });
    }
  }

  // eslint-disable-next-line react/no-unused-state
  deleteFile = () => this.setState({ image: '', someErrorInFile: '', fileName: '' });

  handleSkip = e => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/talent/about-you');
  };

  handleSubmitCV = () => {
    const { onSubmitUploadCV } = this.props;
    const { selectedFile } = this.state;
    onSubmitUploadCV(selectedFile);
  };

  render() {
    const { invalid, loading, history, responseSuccess, responseError, handleSubmit } = this.props;
    const { step, showBackButton, uploaderType, fileName } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <ContainerMod>
          <ProgressMod value={stepSize(step)} className="onboarding-progress" />
          <Card>
            <H1 className="text-center ">
              <FormattedMessage {...messages.headingUploadCV} />
            </H1>
            <P className="text-center mt-0">
              <FormattedMessage {...messages.subHeadingUploadCV} />
            </P>
            <PaymentPageWrapper>
              <FormWrapper>
                <form>
                  <UploadTitle className="d-flex mt-5">
                    <H4 className="m-0">
                      <FormattedMessage {...messages.titleUploadFile} />
                    </H4>
                  </UploadTitle>
                  <FormGroup>
                    <div id="dropZone">{getDropZone(this, uploaderType, true, fileName)}</div>
                  </FormGroup>
                  <hr />
                  <div className="d-flex flex-column align-items-center flex-md-row justify-content-md-end">
                    {showBackButton && (
                      <LinkButtonMod
                        className="left-arrow link me-auto"
                        color="link"
                        onClick={e => {
                          handleBackButton(e, history, '/talent/registration-type');
                        }}
                      >
                        <FormattedMessage {...containerMessage.backButton} />
                      </LinkButtonMod>
                    )}
                    <LinkButtonMod color="link" onClick={this.handleSkip}>
                      <FormattedMessage {...containerMessage.skipButton} />
                    </LinkButtonMod>
                    <Button
                      type="submit"
                      className={`${getBtnClass(loading, responseSuccess, responseError)} btn-submit`}
                      disabled={invalid || !fileName}
                      onClick={handleSubmit(this.handleSubmitCV)}
                    >
                      <FormattedMessage {...containerMessage.continueButton} />
                    </Button>
                  </div>
                </form>
              </FormWrapper>
            </PaymentPageWrapper>
          </Card>
        </ContainerMod>
      </React.Fragment>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitUploadCV: data => {
      dispatch(loadRepos());
      dispatch(actions.submitCVFile(data));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

UploadCV.defaultProps = defaultProps;
UploadCV.propTypes = propTypes;

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
)(UploadCV);
