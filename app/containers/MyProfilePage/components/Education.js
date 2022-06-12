/** Education Page
 * This is the Education page for the App, at the '/my-profile' route
 */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Collapse } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import { Card, P, UserInfoList } from 'components';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { gtm } from 'utils/Helper';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { educationDegree, plusSquareIcon, editNoteIcon, logoPlaceholder } from 'containers/App/constants';
import { getSelectedFieldFromList } from 'containers/Auth/utils';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import { EducationComponent } from 'components/UserProfileComponents/EducationComponent';
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

export class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddEducationModal: false,
      showEditEducationModal: false,
      educationIndex: '',
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
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.Education) {
      this.setState({ showAddEducationModal: false, showEditEducationModal: false });
      modalClose();
      loadProfileData();
    }
  }

  /**
   * call on open handleAddEducationOpenModal popup
   * @author Innovify
   */
  handleAddEducationOpenModal = () => {
    const { modalOpen } = this.props;
    const currentEducationData = [];

    const educationData = {
      _id: uuidv4(),
      degreeLevel: '',
      degreeTitle: '',
      collegeName: '',
      country: '',
      startYear: '',
      endYear: '',
    };

    currentEducationData.push(educationData);

    this.setState({ showAddEducationModal: true, currentEducationData, educationIndex: 0 });
    modalOpen(modals.Education);
  };

  /** call on close button click
   * @author Innovify
   */
  handleAddEducationCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showAddEducationModal: false });
    modalClose();
  };

  /**
   * call on open handleProfilePhotoOpenModal popup
   * @author Innovify
   */
  handleEditEducationOpenModal = index => {
    const { modalOpen } = this.props;
    const copiedData = jsonCopy(get(this.props, 'data', []));
    const currentEducationData = [];

    for (let i = 0; i < copiedData.length; i++) {
      const country = { label: copiedData[i].country, value: copiedData[i].country };

      const degreeLevelLabel = getSelectedFieldFromList(educationDegree, 'value', get(copiedData[i], 'degreeLevel', ''));
      const degreeLevelData = { label: degreeLevelLabel.name, value: degreeLevelLabel.value };

      const experienceData = {
        _id: get(copiedData[i], '_id'),
        degreeLevel: degreeLevelData,
        degreeTitle: copiedData[i].degreeTitle,
        collegeName: copiedData[i].collegeName,
        startYear: get(copiedData[i], 'startYear') ? new Date(get(copiedData[i], 'startYear'), 0, 1) : '',
        endYear: get(copiedData[i], 'endYear') ? new Date(get(copiedData[i], 'endYear'), 0, 1) : '',
        country,
      };

      currentEducationData.push(experienceData);
    }

    this.setState({ showEditEducationModal: true, currentEducationData, educationIndex: index });
    modalOpen(modals.Education);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Education',
      value: 1,
    });
  };

  /** call on close button click
   * @author Innovify
   */
  handleEditEducationCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showEditEducationModal: false });
    modalClose();
  };

  render() {
    const {
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      onSubmitAddEducationForm,
      onSubmitEducationForm,
      onSubmitDeleteEducationForm,
      role,
    } = this.props;
    const { showAddEducationModal, showEditEducationModal, currentEducationData, educationIndex, isOpen } = this.state;
    return (
      <React.Fragment>
        <Card className="p-30">
          <CardHeader>
            <P className="p20 mb-0">
              <FormattedMessage {...messages.titleEducation} />
            </P>
            {(role === '1' || role === '3') && (
              <ActionIconLink to={{ pathname: redirectPageURL(2), state: { fromMyProfile: true } }}>
                <SVG src={plusSquareIcon} />
              </ActionIconLink>
            )}
            {/* <ActionIcon type="button" onClick={this.handleAddEducationOpenModal}>
                <SVG src={plusSquareIcon} />
              </ActionIcon> */}
          </CardHeader>

          <UserInfoList className="no-add-cta">
            {get(this.props, 'data', [])
              .slice(0, 2)
              .map(item => this.educationListItems(item, role))}
          </UserInfoList>

          <Collapse isOpen={isOpen}>
            <UserInfoList className="no-add-cta">
              {get(this.props, 'data', [])
                .filter((item, index) => index > 1)
                .map(item => this.educationListItems(item, role))}
            </UserInfoList>
          </Collapse>
          {get(this.props, 'data', []).length > 2 ? (
            <div className="d-flex justify-content-center">
              <ViewDetailBtn type="button" className={`${isOpen ? 'card-expanded' : ''} btn btn-link`} onClick={this.viewMoreToggle}>
                {`${!isOpen ? 'More' : 'Less'} education`}
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
          isOpen={showAddEducationModal}
          onDiscard={this.handleAddEducationCloseModal}
          onHandleSubmit={handleSubmit(e => {
            onSubmitAddEducationForm(e, educationIndex);
          })}
          modalType="add"
          title={messages.modalAddEducationHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <EducationComponent
              {...this.props}
              education={currentEducationData}
              stateEducation={currentEducationData}
              index={educationIndex}
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
          isOpen={showEditEducationModal}
          onDiscard={this.handleEditEducationCloseModal}
          title={messages.modalEditEducationHeader.defaultMessage}
          otherActions
          count={get(this.props, 'data', [])}
          modalType="edit"
          onHandleSubmit={handleSubmit(e => {
            onSubmitEducationForm(e, educationIndex);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Education',
              value: 1,
            });
          })}
          onHandleDelete={e => {
            onSubmitDeleteEducationForm(e, educationIndex);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_delete',
              category: 'Talent Portal',
              sectionName: 'Education',
              value: 1,
            });
          }}
        >
          <form onSubmit={handleSubmit}>
            <EducationComponent
              {...this.props}
              education={currentEducationData}
              stateEducation={currentEducationData}
              index={educationIndex}
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

  educationListItems(item, role) {
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
                  {item.startYear} {item.endYear && <>- {item.endYear}</>}
                </P>
                <P className="p16 mb-2">
                  {item.degreeLevel} in {item.degreeTitle}
                </P>
                <P className="p14 mb-0" opacityVal="0.5">
                  {item.collegeName} {item.country && <>, {item.country} </>}
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

Education.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  education: selectors.makeSelectEducationDetails(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeEducation: data => dispatch(actions.changeEducationDetails(data)),

    onSubmitEducationForm: (evt, educationIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editEducation('editEducation', educationIndex));
    },
    onSubmitAddEducationForm: (evt, educationIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editEducation('addEducation', educationIndex));
    },
    onSubmitDeleteEducationForm: (evt, educationIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(popUpSagaAction(true));
      dispatch(actions.editEducation('deleteEducation', educationIndex));
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
)(Education);
