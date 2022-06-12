/** WorkExperience Page
 * This is the WorkExperience page for the App, at the '/my-profile' route
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
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { employmentTypeList, plusSquareIcon, editNoteIcon, logoPlaceholder } from 'containers/App/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { gtm } from 'utils/Helper';
import { getSelectedFieldFromList } from 'containers/Auth/utils';
import moment from 'moment';
import { loadRepos, popUpSagaAction } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import { WorkExperienceComponent } from 'components/UserProfileComponents/WorkExperience';
import { jsonCopy } from 'components/UserProfileComponents/utils';
import * as actions from 'containers/Auth/WorkExperience/actions';
import * as selectors from 'containers/Auth/WorkExperience/selectors';
import { ViewDetailBtn } from 'containers/Client/BriefsDetail/styles';
import saga from 'containers/Auth/WorkExperience/saga';
import { redirectPageURL } from 'containers/App/utils';
import reducer from 'containers/Auth/WorkExperience/reducer';
import { key } from 'containers/Auth/WorkExperience/constants';
import { propTypes } from 'containers/Auth/WorkExperience//proptypes';
import { CardHeader, ActionIconLink } from '../styles';
import { modals } from '../constants';
import messages from '../messages';
import PopupWrapper from '../PopupWrapper';
import { getLabel } from './utils';

export class WorkExperience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddWorkExperienceModal: false,
      showEditWorkExperienceModal: false,
      experienceIndex: '',
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
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.WorkExperience) {
      this.setState({ showAddWorkExperienceModal: false, showEditWorkExperienceModal: false });
      modalClose();
      loadProfileData();
    }
  }

  /**
   * call on open handleAddWorkExperienceOpenModal popup
   * @author Innovify
   */
  handleAddWorkExperienceOpenModal = () => {
    const { modalOpen } = this.props;
    const currentExperienceData = [];

    const experienceData = {
      _id: uuidv4(),
      jobTitle: '',
      employmentType: '',
      employer: '',
      startDate: '',
      endDate: '',
      currentlyWork: false,
      country: '',
      shortDescription: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    };

    currentExperienceData.push(experienceData);

    this.setState({ showAddWorkExperienceModal: true, currentExperienceData, experienceIndex: 0 });
    modalOpen(modals.WorkExperience);
  };

  /** call on close button click
   * @author Innovify
   */
  handleAddWorkExperienceCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showAddWorkExperienceModal: false });
    modalClose();
  };

  /**
   * call on open handleProfilePhotoOpenModal popup
   * @author Innovify
   */
  handleEditWorkExperienceOpenModal = index => {
    const { modalOpen } = this.props;
    const copiedData = jsonCopy(get(this.props, 'data', []));
    const currentExperienceData = [];

    for (let i = 0; i < copiedData.length; i++) {
      const shortDescription = EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(copiedData[i].shortDescription)),
      );

      const employmentTypeLabel = getSelectedFieldFromList(employmentTypeList, 'value', get(copiedData[i], 'employmentType', ''));
      const employmentTypeData = { label: employmentTypeLabel.name, value: employmentTypeLabel.value };
      const country = { label: copiedData[i].country, value: copiedData[i].country };

      const experienceData = {
        _id: get(copiedData[i], '_id'),
        jobTitle: copiedData[i].jobTitle,
        employmentType: employmentTypeData,
        employer: copiedData[i].employer,
        startDate: moment(copiedData[i].startDate),
        endDate: moment(copiedData[i].endDate),
        currentlyWork: get(copiedData[i], 'isPresent'),
        country,
        shortDescription,
      };
      currentExperienceData.push(experienceData);
    }

    this.setState({ showEditWorkExperienceModal: true, currentExperienceData, experienceIndex: index });
    modalOpen(modals.WorkExperience);

    // GTM
    gtm({
      action: 'Button Click',
      event: 'custom_codemonk_event',
      label: 'profile_edit',
      category: 'Talent Portal',
      sectionName: 'Work Experience',
      value: 1,
    });
  };

  /** call on close button click
   * @author Innovify
   */
  handleEditWorkExperienceCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showEditWorkExperienceModal: false });
    modalClose();
  };

  render() {
    const {
      handleSubmit,
      loading,
      responseSuccess,
      responseError,
      invalid,
      onSubmitAddExperienceForm,
      onSubmitExperienceForm,
      onSubmitDeleteExperienceForm,
      role,
    } = this.props;
    const { showAddWorkExperienceModal, showEditWorkExperienceModal, currentExperienceData, experienceIndex, isOpen } = this.state;
    return (
      <React.Fragment>
        <Card className="p-30">
          <CardHeader>
            <P className="p20 mb-0">
              <FormattedMessage {...messages.titleWorkExperience} />
            </P>
            {(role === '1' || role === '3') && (
              <ActionIconLink to={{ pathname: redirectPageURL(3), state: { fromMyProfile: true } }}>
                <SVG src={plusSquareIcon} />
              </ActionIconLink>
            )}
            {/* <ActionIcon type="button" onClick={this.handleAddWorkExperienceOpenModal}>
                <SVG src={plusSquareIcon} />
              </ActionIcon> */}
          </CardHeader>
          <UserInfoList className="no-add-cta">
            {get(this.props, 'data', [])
              .slice(0, 2)
              .map(item => this.workExperienceListItem(item, role))}
          </UserInfoList>
          <Collapse isOpen={isOpen}>
            <UserInfoList className="no-add-cta">
              {get(this.props, 'data', [])
                .filter((item, index) => index > 1)
                .map(item => this.workExperienceListItem(item, role))}
            </UserInfoList>
          </Collapse>
          {get(this.props, 'data', []).length > 2 ? (
            <div className="d-flex justify-content-center">
              <ViewDetailBtn type="button" className={`${isOpen ? 'card-expanded' : ''} btn btn-link`} onClick={this.viewMoreToggle}>
                {`${!isOpen ? 'More' : 'Less'} experiences`}
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
          isOpen={showAddWorkExperienceModal}
          modalType="add"
          onDiscard={this.handleAddWorkExperienceCloseModal}
          onHandleSubmit={handleSubmit(e => {
            onSubmitAddExperienceForm(e, experienceIndex);
          })}
          title={messages.modalAddWorkExperienceHeader.defaultMessage}
        >
          <form onSubmit={handleSubmit}>
            <WorkExperienceComponent
              {...this.props}
              experiences={currentExperienceData}
              stateExperiences={currentExperienceData}
              index={experienceIndex}
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
          isOpen={showEditWorkExperienceModal}
          onDiscard={this.handleEditWorkExperienceCloseModal}
          title={messages.modalEditWorkExperienceHeader.defaultMessage}
          otherActions
          count={get(this.props, 'data', [])}
          modalType="edit"
          onHandleSubmit={handleSubmit(e => {
            onSubmitExperienceForm(e, experienceIndex);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Work Experience',
              value: 1,
            });
          })}
          onHandleDelete={e => {
            onSubmitDeleteExperienceForm(e, experienceIndex);

            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_delete',
              category: 'Talent Portal',
              sectionName: 'Work Experience',
              value: 1,
            });
          }}
        >
          <form onSubmit={handleSubmit}>
            <WorkExperienceComponent
              {...this.props}
              experiences={currentExperienceData}
              index={experienceIndex}
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

  workExperienceListItem(item, role) {
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
                  {moment(item.startDate).format('DD/MM/YYYY')} - {moment(item.endDate).format('DD/MM/YYYY')}
                </P>
                <P className="p16 mb-2">
                  {item.jobTitle} {item.employmentType && <> - {getLabel(item.employmentType, employmentTypeList, 'name')} </>}
                </P>
                <P className="p14 mb-3" opacityVal="0.5">
                  {item.employer} {item.country && <>, {item.country} </>}
                </P>
                <P className="p14 mb-0 description-text" opacityVal="0.5" lineHeight="22">
                  {item.shortDescription}
                </P>
              </div>
            </div>
          </div>
        </div>
        <div className="list-action gap-0">
          {(role === '1' || role === '3') && (
            <ActionIconLink to={{ pathname: redirectPageURL(3), state: { fromMyProfile: true } }}>
              <SVG src={editNoteIcon} />
            </ActionIconLink>
          )}
        </div>
      </li>
    );
  }
}

WorkExperience.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  experiences: selectors.makeSelectExperiences(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeExperience: data => dispatch(actions.changeExperience(data)),

    onSubmitExperienceForm: (evt, experienceIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editExperience('editExperience', experienceIndex));
    },
    onSubmitAddExperienceForm: (evt, experienceIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editExperience('addExperience', experienceIndex));
    },
    onSubmitDeleteExperienceForm: (evt, experienceIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(popUpSagaAction(true));
      dispatch(actions.editExperience('deleteExperience', experienceIndex));
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
)(WorkExperience);
