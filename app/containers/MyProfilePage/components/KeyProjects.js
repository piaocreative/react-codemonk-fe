/** KeyProjects Page
 * This is the KeyProjects page for the App, at the '/my-profile' route
 */
import React from 'react';
import get from 'lodash/get';
import { v4 as uuidv4 } from 'uuid';
import { Collapse } from 'reactstrap';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, change, untouch } from 'redux-form/immutable';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import SVG from 'react-inlinesvg';
import { gtm } from 'utils/Helper';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { Card, P, ToastifyMessage, UserInfoList, A } from 'components';
import containerMessage from 'containers/messages';
import { roles, plusSquareIcon, editNoteIcon, projectPlaceholder, newTabIcon, clientIcon, industryIcon } from 'containers/App/constants';
import { Project } from 'components/UserProfileComponents/Project';
import { getSelectedFieldFromList, getIndustryList } from 'containers/Auth/utils';
import { loadRepos, reset, popUpSagaAction } from 'containers/App/actions';
import { makeSelectLoading, makeSelectSuccess, makeSelectError, makeSelectPopUpSaga } from 'containers/App/selectors';
import * as actions from 'containers/Auth/KeyProjects/actions';
import reducer from 'containers/Auth/KeyProjects/reducer';
import saga from 'containers/Auth/KeyProjects/saga';
import { redirectPageURL } from 'containers/App/utils';
import * as selectors from 'containers/Auth/KeyProjects/selectors';
import { ViewDetailBtn } from 'containers/Client/BriefsDetail/styles';
import { defaultProps, propTypes } from 'containers/proptypes';
import PopupWrapper from '../PopupWrapper';
import { CardHeader, ActionIconLink } from '../styles';
import { modals } from '../constants';
import messages from '../messages';
const key = 'keyProjectForm';

export class KeyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProjectEditModal: false,
      showProjectAddModal: false,
      currentProjectData: '',
      projectIndex: '',
      industryList: [],
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
    if (prevProps.popUpSaga === true && popUpSaga === false && currentModal === modals.KeyProjects) {
      this.setState({ showProjectEditModal: false, showProjectAddModal: false });
      modalClose();
      loadProfileData();
    }
  }

  handleProjectAddOpenModal = index => {
    const { modalOpen, dispatch, projects, onChangeProject } = this.props;
    const currentProjectData = projects || [];

    const projectId = uuidv4();
    const desc = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('')));

    getIndustryList(resp =>
      this.setIndustries(resp, () => {
        const projectData = {
          _id: projectId,
          name: '',
          url: '',
          description: desc,
          role: '',
          industry: '',
          employer: '',
          skills: [],
          skillsCount: [],
          skillsRating: [],
        };
        currentProjectData.push(projectData);

        this.setState({ showProjectAddModal: true, currentProjectData, projectIndex: index }, () => {
          dispatch(change(key, `projectName${index}`, projectData.name));
          dispatch(change(key, `projectURL${index}`, projectData.url));
          dispatch(change(key, `projectDesc${index}`, projectData.description));
          dispatch(change(key, `projectRole${index}`, projectData.role));
          dispatch(change(key, `projectEmployer${index}`, projectData.employer));
          dispatch(change(key, `projectIndustry${index}`, projectData.industry));

          dispatch(untouch(key, `projectName${index}`));
          dispatch(untouch(key, `projectURL${index}`));
          dispatch(untouch(key, `projectDesc${index}`));
          dispatch(untouch(key, `projectRole${index}`));
          dispatch(untouch(key, `projectEmployer${index}`));
          dispatch(untouch(key, `projectIndustry${index}`));

          onChangeProject(currentProjectData);
        });

        modalOpen(modals.KeyProjects);
      }),
    );
  };

  setIndustries = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ industryList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  handleProjectAddCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showProjectAddModal: false });
    modalClose();
  };

  /**
   * call on open popup
   * @author Innovify
   */
  handleProjectEditOpenModal = index => {
    const { modalOpen, workExperience, data, dispatch, onChangeProject } = this.props;
    let currentProjectData = data || [];
    getIndustryList(resp =>
      this.setIndustries(resp, () => {
        const { industryList } = this.state;

        currentProjectData = currentProjectData.map((copiedData, mapIndex) => {
          if (index === mapIndex) {
            const desc = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(copiedData.description)));
            const roleDataLabel = getSelectedFieldFromList(roles, 'name', get(copiedData, 'role', ''));
            const role = { label: roleDataLabel.name, value: roleDataLabel.name };

            const industryObject = industryList.map(item => ({ name: item, value: item }));
            const industryDataLabel = getSelectedFieldFromList(industryObject, 'name', get(copiedData, 'industry', ''));
            const industry = { label: industryDataLabel.name, value: industryDataLabel.name };

            const workExperienceObject = workExperience.map(item => ({ name: item.employer, value: item.employer }));
            const employerDataLabel = getSelectedFieldFromList(workExperienceObject, 'name', get(copiedData, 'employer', ''));
            const employer = { label: employerDataLabel.name, value: employerDataLabel.name };

            const { skills } = copiedData;

            const projectData = {
              _id: get(copiedData, '_id'),
              name: copiedData.name,
              url: copiedData.url,
              description: desc,
              role,
              industry,
              employer,
              skills,
              skillsCount: skills.map(s => ({
                label: s.name,
                value: s.name,
                rating: s.rate,
              })),
              skillsRating: skills.map(s => ({
                label: s.name,
                value: s.name,
                rating: s.rate,
              })),
            };
            return projectData;
          }
          return copiedData;
        });

        this.setState({ showProjectEditModal: true, currentProjectData, projectIndex: index }, () => {
          dispatch(change(key, `projectName${index}`, currentProjectData[index].name));
          dispatch(change(key, `projectURL${index}`, currentProjectData[index].url));
          dispatch(change(key, `projectDesc${index}`, currentProjectData[index].description));
          dispatch(change(key, `projectRole${index}`, currentProjectData[index].role));
          dispatch(change(key, `projectEmployer${index}`, currentProjectData[index].employer));
          dispatch(change(key, `projectIndustry${index}`, currentProjectData[index].industry));

          dispatch(untouch(key, `projectName${index}`));
          dispatch(untouch(key, `projectURL${index}`));
          dispatch(untouch(key, `projectDesc${index}`));
          dispatch(untouch(key, `projectRole${index}`));
          dispatch(untouch(key, `projectEmployer${index}`));
          dispatch(untouch(key, `projectIndustry${index}`));

          onChangeProject(currentProjectData);
        });
        modalOpen(modals.KeyProjects);

        // GTM
        gtm({
          action: 'Button Click',
          event: 'custom_codemonk_event',
          label: 'profile_edit',
          category: 'Talent Portal',
          sectionName: 'Key Projects',
          value: 1,
        });
      }),
    );
  };

  /** call on close button click
   * @author Innovify
   */
  handleProjectEditCloseModal = () => {
    const { dispatch, modalClose } = this.props;
    dispatch(popUpSagaAction(false));
    this.setState({ showProjectEditModal: false });
    modalClose();
  };

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps = (nextProps, prevProps) => {
    const { projects } = nextProps;
    const { currentProjectData } = this.state;
    if (Array.isArray(projects) && Array.isArray(currentProjectData)) {
      const newCurrentProjectData = projects.map(cp => {
        // eslint-disable-next-line no-underscore-dangle
        const currentData = currentProjectData.find(c => c._id === cp._id);
        return {
          ...currentData,
          ...cp,
        };
      });
      this.setState({ currentProjectData: newCurrentProjectData });
    }
  };

  handleLocalProjectChanges = (project, cIndex) => {
    const { currentProjectData } = this.state;
    const newCurrentProjectData = currentProjectData.map((cp, index) => {
      if (cIndex === index) {
        return {
          ...cp,
          ...project,
        };
      }
      return cp;
    });
    this.setState({ currentProjectData: newCurrentProjectData });
  };

  render() {
    const {
      loading,
      responseSuccess,
      responseError,
      invalid,
      handleSubmit,
      onSubmitProjectForm,
      onSubmitAddProjectForm,
      onSubmitDeleteProjectForm,
      role,
      // projects,
    } = this.props;
    const { industryList, showProjectEditModal, showProjectAddModal, currentProjectData, projectIndex, isOpen } = this.state;
    return (
      <React.Fragment>
        <Card className="p-30">
          <CardHeader>
            <P className="p20 mb-0">
              <FormattedMessage {...messages.titleKeyProjects} />
            </P>
            {(role === '1' || role === '3') && (
              <ActionIconLink to={{ pathname: redirectPageURL(4), state: { fromMyProfile: true } }}>
                <SVG src={plusSquareIcon} />
              </ActionIconLink>
            )}
            {/* <ActionIcon type="button" onClick={() => this.handleProjectAddOpenModal((projects || []).length)}>
                  <SVG src={plusSquareIcon} />
                </ActionIcon> */}
          </CardHeader>
          <UserInfoList className="no-add-cta">
            {get(this.props, 'data', [])
              .slice(0, 2)
              .map(item => this.keyProjectsListItems(item, role))}
          </UserInfoList>
          <Collapse isOpen={isOpen}>
            <UserInfoList className="no-add-cta">
              {get(this.props, 'data', [])
                .filter((item, index) => index > 1)
                .map(item => this.keyProjectsListItems(item, role))}
            </UserInfoList>
          </Collapse>
          {get(this.props, 'data', []).length > 2 ? (
            <div className="d-flex justify-content-center">
              <ViewDetailBtn type="button" className={`${isOpen ? 'card-expanded' : ''} btn btn-link`} onClick={this.viewMoreToggle}>
                {`${!isOpen ? 'More' : 'Less'} projects`}
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
          isOpen={showProjectEditModal}
          onDiscard={this.handleProjectEditCloseModal}
          title={messages.modelEditProjectHeader.defaultMessage}
          otherActions
          count={currentProjectData}
          onHandleSubmit={handleSubmit(e => {
            onSubmitProjectForm(e, projectIndex);
            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_edit_saved',
              category: 'Talent Portal',
              sectionName: 'Key Projects',
              value: 1,
            });
          })}
          onHandleDelete={e => {
            onSubmitDeleteProjectForm(e, projectIndex);
            // GTM
            gtm({
              action: 'Button Click',
              event: 'custom_codemonk_event',
              label: 'profile_delete',
              category: 'Talent Portal',
              sectionName: 'Key Projects',
              value: 1,
            });
          }}
          modalType="edit"
        >
          <form onSubmit={handleSubmit}>
            <Project
              {...this.props}
              projects={currentProjectData}
              index={projectIndex}
              key={key}
              formKey={key}
              size="sm"
              workExperence={get(this.props, 'workExperience', [])}
              industryList={industryList}
              handleLocalProjectChanges={this.handleLocalProjectChanges}
            />
          </form>
        </PopupWrapper>

        <PopupWrapper
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showProjectAddModal}
          onDiscard={this.handleProjectAddCloseModal}
          title={messages.modelAddProjectHeader.defaultMessage}
          onHandleSubmit={handleSubmit(e => {
            onSubmitAddProjectForm(e, projectIndex);
          })}
          modalType="add"
        >
          <form onSubmit={handleSubmit}>
            <Project
              {...this.props}
              projects={currentProjectData}
              index={projectIndex}
              key={key}
              formKey={key}
              size="sm"
              workExperence={get(this.props, 'workExperience', [])}
              industryList={industryList}
              handleLocalProjectChanges={this.handleLocalProjectChanges}
            />
          </form>
        </PopupWrapper>
      </React.Fragment>
    );
  }

  keyProjectsListItems(item, role) {
    return (
      <li className="py-30">
        <div>
          <div className="list-outer-block">
            {get(item, 'images', []).length > 0 && get(item, 'images', []).filter(i => i.logo).length > 0 ? (
              <div className="icon-container img-lg">
                <img
                  src={`${get(item, 'images', [])
                    .filter(i => i.isCoverImage === true)
                    .map(l => l.logo)}?_t=${new Date().getTime()}`}
                  className="img-fluid"
                  alt={item.name}
                />
              </div>
            ) : (
              <SVG src={projectPlaceholder} className="list-icon img-lg" />
            )}
            <div className="list-content">
              <div>
                <P className="p14 mb-1" opacityVal="0.5">
                  {item.role}
                </P>
                <div className="d-flex align-items-center mb-2">
                  <P className="p20 mb-0">{item.name}</P>
                  {item.url !== '' && (
                    <A
                      href={!/^https?:\/\//i.test(item.url) ? `http://${item.url}` : item.url}
                      target="_blank"
                      className="target-link ms-2"
                    >
                      <SVG src={newTabIcon} />
                    </A>
                  )}
                </div>
                <div className="d-flex flex-column flex-md-row">
                  {get(item, 'employer', '') ? (
                    <div className="mb-2 d-flex align-items-center me-3">
                      <SVG src={clientIcon} />
                      <P className="p16 mb-0 ms-2">{get(item, 'employer', '')}</P>
                    </div>
                  ) : (
                    ''
                  )}
                  {get(item, 'employer', '') ? (
                    <div className="mb-2 d-flex align-items-center">
                      <SVG src={industryIcon} />
                      <P className="p16 mb-0 ms-2">{get(item, 'industry', '')}</P>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {get(item, 'skills', []).length > 0 ? (
                  <>
                    <hr className="my-3" />
                    <P className="p14 mb-2" lineHeight="13" fontFamily="GT-Walsheim-Pro-Medium">
                      <FormattedMessage {...containerMessage.usedSkills} />
                    </P>
                    <ul className="tag-list">
                      {get(item, 'skills', []).map(skill => (
                        <li>
                          <P className="p16 m-0"> {skill.name}</P>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <P className="p14 mb-0 description-text mt-3" opacityVal="0.5" lineHeight="22">
            {item.description}
          </P>
        </div>
        {(role === '1' || role === '3') && (
          <div className="list-action gap-0">
            <ActionIconLink to={{ pathname: redirectPageURL(4), state: { fromMyProfile: true } }}>
              <SVG src={editNoteIcon} />
            </ActionIconLink>
          </div>
        )}
      </li>
    );
  }
}

KeyProjects.defaultProps = defaultProps;
KeyProjects.propTypes = propTypes;

const mapStateToProps = createStructuredSelector({
  projects: selectors.makeSelectProjects(),
  loading: makeSelectLoading(),
  responseSuccess: makeSelectSuccess(),
  responseError: makeSelectError(),
  popUpSaga: makeSelectPopUpSaga(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCallLoading: () => dispatch(loadRepos()),
    onCallStopLoading: () => dispatch(reset()),
    onChangeProject: data => dispatch(actions.changeProject(data)),
    onSubmitProjectForm: (evt, projectIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editProject('editProject', projectIndex));
    },
    onSubmitAddProjectForm: (evt, projectIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(popUpSagaAction(true));
      dispatch(actions.editProject('addProject', projectIndex));
    },
    onSubmitDeleteProjectForm: (evt, projectIndex) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(popUpSagaAction(true));
      dispatch(actions.editProject('deleteProject', projectIndex));
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
)(KeyProjects);
