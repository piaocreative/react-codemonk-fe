/** Certificate Page
 * This is the Certificate page for the App, at the '/my-profile' route
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Collapse } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { plusSquareIcon, editNoteIcon, logoPlaceholder } from 'containers/App/constants';
import { Card, P, UserInfoList } from 'components';
import { gtm } from 'utils/Helper';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import moment from 'moment';
import containerMessage from 'containers/messages';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import { CertificateComponent } from 'components/UserProfileComponents/CertificateComponent';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import * as actions from 'containers/Auth/Education-Certification/actions';
import * as selectors from 'containers/Auth/Education-Certification/selectors';
import saga from 'containers/Auth/Education-Certification/saga';
import { redirectPageURL } from 'containers/App/utils';
import reducer from 'containers/Auth/Education-Certification/reducer';
import { key } from 'containers/Auth/Education-Certification/constants';
import { ViewDetailBtn } from 'containers/Client/BriefsDetail/styles';
import { propTypes } from 'containers/proptypes';
import { CardHeader, ActionIconLink } from '../styles';
import { modals } from '../constants';
import messages from '../messages';
import PopupWrapper from '../PopupWrapper';

export class Certificate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCertificateModal: false,
      showEditCertificateModal: false,
      certificateIndex: '',
      isOpen: false,
    };
  }

  viewMoreToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  componentDidUpdate(prevProps) {
    const { popUpSaga, loadProfileData, currentModal, modalClose } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.Certificate) {
      this.setState({ showAddCertificateModal: false, showEditCertificateModal: false });
      modalClose();
      loadProfileData();
    }
  }

  /**
   * call on open handleAddCertificateOpenModal popup
   * @author Innovify
   */
  handleAddCertificateOpenModal = () => {
    const { modalOpen } = this.props;
    const currentCertificateData = [];

    const certificateData = {
      _id: uuidv4(),
      name: '',
      dateObtained: '',
      issuedBy: '',
      certificateId: '',
    };

    currentCertificateData.push(certificateData);

    this.setState({ showAddCertificateModal: true, currentCertificateData, certificateIndex: 0 });
    modalOpen(modals.Certificate);
  };

  /** call on close button click
   * @author Innovify
   */
  handleAddCertificateCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showAddCertificateModal: false });
    modalClose();
  };

  /**
   * call on open handleProfilePhotoOpenModal popup
   * @author Innovify
   */
  handleEditCertificateOpenModal = index => {
    const { modalOpen } = this.props;
    const copiedData = jsonCopy(get(this.props, 'data', []));
    const currentCertificateData = [];

    for (let i = 0; i < copiedData.length; i++) {
      const certificateData = {
        _id: get(copiedData[i], '_id'),
        name: get(copiedData[i], 'name'),
        dateObtained: moment(copiedData[i].dateObtained),
        issuedBy: get(copiedData[i], 'issuedBy'),
        certificateId: get(copiedData[i], 'certificateId'),
      };

      currentCertificateData.push(certificateData);
    }

    this.setState({ showEditCertificateModal: true, currentCertificateData, certificateIndex: index });
    modalOpen(modals.Certificate);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Certifications',
      value: 1,
    });
  };

  /** call on close button click
   * @author Innovify
   */
  handleEditCertificateCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showEditCertificateModal: false });
    modalClose();
  };

  render() {
    const {
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      onSubmitAddCertificateForm,
      onSubmitCertificateForm,
      onSubmitDeleteCertificateForm,
      role,
    } = this.props;
    const { showAddCertificateModal, showEditCertificateModal, currentCertificateData, certificateIndex, isOpen } = this.state;
    return (
      <React.Fragment>
        <Card className="p-30">
          <CardHeader>
            <P className="p20 mb-0">
              <FormattedMessage {...containerMessage.labelCertification} />
            </P>
            {(role === '1' || role === '3') && (
              <ActionIconLink to={{ pathname: redirectPageURL(2), state: { fromMyProfile: true } }}>
                <SVG src={plusSquareIcon} />
              </ActionIconLink>
            )}
            {/* <ActionIcon type="button" onClick={this.handleAddCertificateOpenModal}>
                <SVG src={plusSquareIcon} />
              </ActionIcon> */}
          </CardHeader>
          <UserInfoList className="no-add-cta">
            {get(this.props, 'data', [])
              .slice(0, 2)
              .map(item => this.certificateListItems(item, role))}
            {get(this.props, 'data', []).length === 0 ? (
              <P className="p16 mb-0" opacityVal="0.5">
                <FormattedMessage {...messages.noCertificate} />
              </P>
            ) : (
              ''
            )}
          </UserInfoList>
          <Collapse isOpen={isOpen}>
            <UserInfoList className="no-add-cta">
              {get(this.props, 'data', [])
                .filter((item, index) => index > 1)
                .map(item => this.certificateListItems(item, role))}
            </UserInfoList>
          </Collapse>
          {get(this.props, 'data', []).length > 2 ? (
            <div className="d-flex justify-content-center">
              <ViewDetailBtn type="button" className={`${isOpen ? 'card-expanded' : ''} btn btn-link`} onClick={this.viewMoreToggle}>
                {`${!isOpen ? 'More' : 'Less'} certificates`}
              </ViewDetailBtn>
            </div>
          ) : (
            ''
          )}
        </Card>
        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showAddCertificateModal}
          modalType="add"
          onDiscard={this.handleAddCertificateCloseModal}
          onHandleSubmit={handleSubmit(e => {
            onSubmitAddCertificateForm(e, certificateIndex);
          })}
          title={messages.modalAddCertificateHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <CertificateComponent
              {...this.props}
              certificate={currentCertificateData}
              stateCertificate={currentCertificateData}
              index={certificateIndex}
              formKey={key}
              size="sm"
              secondFormTouch={false}
              onChangeSecondForm={() => {}}
            />
          </form>
        </PopupWrapper>
        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showEditCertificateModal}
          onDiscard={this.handleEditCertificateCloseModal}
          title={messages.modalEditCertificateHeader.defaultMessage}
          otherActions
          count={get(this.props, 'data', [])}
          popupType="certificate"
          modalType="edit"
          onHandleSubmit={handleSubmit(e => {
            onSubmitCertificateForm(e, certificateIndex);
            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Certifications',
              value: 1,
            });
          })}
          onHandleDelete={e => {
            onSubmitDeleteCertificateForm(e, certificateIndex);
            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_delete',
              category: 'Talent Portal',
              sectionName: 'Certifications',
              value: 1,
            });
          }}
        >
          <form onSubmit={handleSubmit}>
            <CertificateComponent
              {...this.props}
              certificate={currentCertificateData}
              stateCertificate={currentCertificateData}
              index={certificateIndex}
              formKey={key}
              size="sm"
              secondFormTouch={false}
              onChangeSecondForm={() => {}}
            />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }

  certificateListItems(item, role) {
    return (
      <li>
        <div>
          <div className="list-outer-block">
            {item.logo ? (
              <div className="icon-container">
                <img src={`${item.logo}?_t=${new Date().getTime()}`} className="img-fluid" alt={item.collegeName} />
              </div>
            ) : (
              <SVG src={logoPlaceholder} className="list-icon" />
            )}
            <div className="list-content">
              <div>
                <P className="p14 mb-1" opacityVal="0.5">
                  {moment(item.dateObtained).format('DD/MM/YYYY')}
                </P>
                <P className="p16 mb-2">{item.name}</P>
                <P className="p14 mb-0" opacityVal="0.5">
                  {item.issuedBy}
                </P>
              </div>
            </div>
          </div>
        </div>
        <div className="list-action gap-0">
          {(role === '1' || role === '3') && (
            <ActionIconLink to={{ pathname: redirectPageURL(2), state: { fromMyProfile: true } }}>
              <SVG src={editNoteIcon} />
            </ActionIconLink>
          )}
        </div>
      </li>
    );
  }
}

Certificate.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  certificate: selectors.makeSelectCertificateDetails(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeCertificate: data => dispatch(actions.changeCertificateDetails(data)),

    onSubmitCertificateForm: (evt, certificateIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editCertificate('editCertificate', certificateIndex));
    },
    onSubmitAddCertificateForm: (evt, certificateIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editCertificate('addCertificate', certificateIndex));
    },
    onSubmitDeleteCertificateForm: (evt, certificateIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(popUpSagaAction(true));
      dispatch(actions.editCertificate('deleteCertificate', certificateIndex));
    },
  };
}

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
)(Certificate);
