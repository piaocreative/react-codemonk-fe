/**
 * Key Projects Details Page
 *
 * This is the Key Projects Details page for the App, at the '/keyprojects' route
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { reduxForm, change, Field, untouch, touch } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Row, Col, FormGroup } from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import get from 'lodash/get';
import SVG from 'react-inlinesvg';
import ModalWrapper from 'components/ModalWrapper';
import * as formValidations from 'utils/formValidations';
import componentMessage from 'components/UserProfileComponents/messages';
import containerMessage from 'containers/messages';
import { renderField, renderTextAreaForm, RadioButton } from 'utils/Fields';
import { FormattedMessage } from 'react-intl';
import { getSelectedFieldFromList, loadUserDetails, getIndustryList, getUserDetails, storeApiSignupStep } from 'containers/Auth/utils';
import { redirectToPage } from 'containers/App/utils';
import { SkillRating } from 'components/UserProfileComponents/SkillRating';
import request from 'utils/request';
import {
  projectPlaceholder,
  newTabIcon,
  clientIcon,
  industryIcon,
  employmentTypeList,
  trashIcon,
  editNoteIcon,
  plusSquareIcon,
  TALENT_SIGNUP_PAGE_URL,
  API_URL,
  VERSION2,
  TALENT,
  PROJECT_API,
  roles,
} from 'containers/App/constants';
import { getPictureDropZone } from 'containers/Auth/PersonalDetails/pictureDropZone';
import { VALIDATION } from 'utils/constants';
import { A, Button, H1, UserInfoList, ImageGrid, ToastifyMessage, P, FormWrapper, Selects, FormLabel } from 'components';
import { loadRepos } from 'containers/App/actions';
import { makeSelectLoading } from 'containers/App/selectors';
import { defaultProps, propTypes } from 'containers/proptypes';
import ProjectFooter from './projectFooter';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';
import { handleSkills } from './utils';
import { key } from './constants';

export class KeyProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      industryList: [],
      projectList: [],
      employerList: [],
      images: [],
      selectedFiles: [],
      showAddProjectModal: false,
      projectModalType: '',
      selectedImgIndex: 0,
    };
  }

  componentDidMount() {
    loadUserDetails(this.fetchProjectData);
  }

  handleProjectOpenModal = (type, id) => {
    const { dispatch } = this.props;
    const { workExperience } = this.state;
    const employerList = workExperience
      .map(item => ({ name: `${item.employer}, ${item.country}`, value: item.employer }))
      .concat({ name: 'Self project', value: 'Self project' });

    this.setState({ employerList });
    if (type === 'add') {
      const data = {
        name: '',
        url: '',
        description: '',
        role: '',
        employer: '',
        industry: '',
        employmentType: '',
        skills: [],
      };
      Object.keys(data).forEach(fieldKey => {
        dispatch(change(key, fieldKey, data[fieldKey]));
        dispatch(untouch(key, fieldKey));
      });
      dispatch(actions.changeRole(data.role));
      dispatch(actions.changeEmployer(data.employer));
      dispatch(actions.changeIndustry(data.industry));
      dispatch(actions.changeEmploymentType(data.employmentType));
      dispatch(actions.changeSkills(data.skills));
      this.setState({ images: [] });
    }
    if (type === 'edit') {
      const { projectList } = this.state;
      // eslint-disable-next-line no-underscore-dangle
      const projectData = projectList.find(obj => obj._id === id);

      const employmentTypeLabel = getSelectedFieldFromList(employmentTypeList, 'value', projectData.employmentType);
      const employmentTypeData = projectData.employmentType ? { label: employmentTypeLabel.name, value: employmentTypeLabel.value } : '';

      const skillsData = handleSkills(projectData.skills);

      const imagesData = get(projectData, 'images', []).map(imgData => imgData.logo);
      const coverImgIndex = get(projectData, 'images', []).findIndex(x => x.isCoverImage === true);

      const dataObj = {
        name: projectData.name,
        url: projectData.url,
        description: projectData.description,
        role: { label: projectData.role, value: projectData.role },
        employmentType: employmentTypeData,
        industry: { label: projectData.industry, value: projectData.industry },
        employer: { label: projectData.employer, value: projectData.employer },
        skills: skillsData,
      };

      Object.keys(dataObj).forEach(fieldKey => {
        dispatch(change(key, fieldKey, dataObj[fieldKey]));
        dispatch(untouch(key, fieldKey));
        dispatch(touch(key, fieldKey));
      });
      dispatch(actions.changeName(dataObj.name));
      dispatch(actions.changeUrl(dataObj.url));
      dispatch(actions.changeRole(dataObj.role));
      dispatch(actions.changeEmployer(dataObj.employer));
      dispatch(actions.changeEmploymentType(dataObj.employmentType));
      dispatch(actions.changeIndustry(dataObj.industry));
      dispatch(actions.changeDescription(dataObj.description));
      dispatch(actions.changeSkills(dataObj.skills));

      this.setState({ selectedFiles: projectData.images, images: imagesData, selectedImgIndex: coverImgIndex });
    }
    this.setState({ showAddProjectModal: true, projectModalType: type, selectedProjectID: id });
  };

  handleProjectCloseModal = () => {
    this.setState({ showAddProjectModal: false });
  };

  handleSubmitProjectForm = e => {
    const { name, url, description, role, employer, industry, employmentType, skills, onSubmitAddProjectForm, history } = this.props;
    const { selectedFiles = [], projectModalType, selectedProjectID, selectedImgIndex } = this.state;
    const ImagesObject = selectedFiles.map((fileName, index) => ({
      name: fileName.path || fileName.name,
      isCoverImage: index === selectedImgIndex,
    }));
    const data = {
      name,
      url,
      description,
      role: role.value,
      employer: employer.value,
      industry: industry.value,
      employmentType: employmentType.value,
      skills: skills.map(s => ({
        name: s.label,
        rate: s.rating,
      })),
      projectImages: !selectedFiles.some(obj => obj.logo) ? selectedFiles : [],
      images: selectedFiles.some(obj => obj.logo) ? selectedFiles : ImagesObject,
    };
    if (projectModalType === 'edit') {
      // eslint-disable-next-line no-underscore-dangle
      data._id = selectedProjectID;
    }

    onSubmitAddProjectForm(e, projectModalType, data, () => {
      getUserDetails(history)
        .then(res => {
          this.setState({ showAddProjectModal: false });
          this.fetchFieldValues(res, false);
        })
        .catch(() => {
          history.push(TALENT_SIGNUP_PAGE_URL);
          toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
        });
    });
  };

  fetchProjectData = response => {
    if (get(response, 'status')) {
      const { history } = this.props;
      if (history.location && history.location.state && history.location.state.fromMyProfile) {
        this.fetchFieldValues(response, false);
      } else {
        this.fetchFieldValues(response, true);
      }
      getIndustryList(resp =>
        this.setIndustries(resp, () => {
          this.setState({ workExperience: response.data.workExperience });
        }),
      );
    }
  };

  setIndustries = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ industryList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  fetchFieldValues = (response, redirection) => {
    const { history, location } = this.props;
    if (get(response, 'status')) {
      storeApiSignupStep(get(response, 'data.signupStep'));
      if (redirection) {
        const currentSignupStep = get(response, 'data.signupStep') + 1;
        redirectToPage(history, location.redirection, currentSignupStep, 4);
      }
      this.setState({ projectList: get(response, 'data.projectDetails', []), selectedFiles: [], images: [] });
    }
  };

  handleSaveForLater = e => {
    e.preventDefault();
    const { onSaveForLater } = this.props;
    onSaveForLater();
  };

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
    } else if (rejectedFiles.length > 5) {
      toast.error(<ToastifyMessage message={VALIDATION.maxFiveFileLength} type="error" />, { className: 'Toast-error' });
    } else {
      const reader = new FileReader();
      this.checkFileType(acceptedFiles, reader);
    }
  };

  fileReader = (index, acceptedFiles, reader, state, done) => {
    if (index < acceptedFiles.length) {
      const regex = new RegExp('(.*?).(png|jpg|jpeg)$');
      const file = acceptedFiles[index];
      if (regex.test(file.type)) {
        reader.onloadend = () => {
          const image = new Image();
          image.src = reader.result;
          image.onload = () => {
            const images = [...state.images, reader.result];
            const selectedFiles = [...state.selectedFiles, file];
            this.fileReader(index + 1, acceptedFiles, reader, { images, selectedFiles }, done);
          };
        };
        reader.readAsDataURL(file);
      } else {
        this.fileReader(index + 1, acceptedFiles, reader, state, done);
        toast.error(<ToastifyMessage message={VALIDATION.invalidFileType} type="error" />, {
          className: 'Toast-error',
        });
      }
    } else {
      done(state);
    }
  };

  checkFileType(acceptedFiles, reader) {
    const { images, selectedFiles } = this.state;
    if (!acceptedFiles) {
      return;
    }
    this.fileReader(0, acceptedFiles, reader, { images, selectedFiles }, state => {
      this.setState({ ...state });
    });
  }

  deleteRecord = id => {
    const { history } = this.props;
    const data = {
      method: 'DELETE',
      body: { _id: id },
    };
    const requestURL = `${API_URL}${VERSION2}${TALENT}${PROJECT_API}`;
    request(requestURL, data).then(response => {
      if (get(response, 'status')) {
        getUserDetails(history)
          .then(res => {
            this.fetchFieldValues(res, false);
          })
          .catch(() => {
            history.push(TALENT_SIGNUP_PAGE_URL);
            toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
          });
      } else {
        toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      }
    });
  };

  handleCoverImage = (event, index) => {
    const eventValue = event.target.checked;
    if (eventValue) {
      this.setState({ selectedImgIndex: index });
    }
  };

  deleteProjectImage = index => {
    const { images, selectedImgIndex } = this.state;
    images.splice(index, 1);
    this.setState({ images });
    if (images.length <= selectedImgIndex) {
      this.setState({ selectedImgIndex: 0 });
    }
  };

  render() {
    const {
      name,
      url,
      role,
      employmentType,
      employer,
      industry,
      shortDescription,
      handleSubmit,
      loading,
      skillsRating,
      responseSuccess,
      responseError,
      invalid,
      onChangeName,
      onChangeUrl,
      onChangeRole,
      onChangeEmploymentType,
      onChangeEmployer,
      onChangeIndustry,
      onChangeDescription,
    } = this.props;
    const { selectedImgIndex, employerList, industryList, projectList, showAddProjectModal, images, projectModalType } = this.state;
    const formValid = projectList.length > 2;
    const isRatingValid = (skillsRating && skillsRating.every(s => s.rating > 0 && s.rating <= 10)) || false;
    const isDisable = images.length > 4;
    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>
        <>
          <H1 className="mb-3">
            <FormattedMessage {...messages.headingKeyProjects} />
          </H1>
          <P className="p16 mb-5" opacityVal="0.5">
            <FormattedMessage {...messages.projectTagLine} />
          </P>
          <UserInfoList>
            {projectList.map(item => (
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
                            <hr />
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
                <div className="list-action">
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.deleteRecord(item._id)}>
                    <SVG src={trashIcon} className="me-1" />
                    Delete
                  </Button>
                  {/* eslint-disable-next-line no-underscore-dangle */}
                  <Button className="btn-icon btn-link ms-auto" onClick={() => this.handleProjectOpenModal('edit', item._id)}>
                    <SVG src={editNoteIcon} className="me-1" />
                    Edit
                  </Button>
                </div>
              </li>
            ))}
            <li>
              <Button className="btn-icon text-primary btn-link ms-auto" onClick={() => this.handleProjectOpenModal('add')}>
                <SVG src={plusSquareIcon} className="me-1" />
                {messages.labelAdd.defaultMessage}
              </Button>
            </li>
          </UserInfoList>
          <ProjectFooter {...this.props} formValid={formValid} handleSaveForLater={this.handleSaveForLater} />
          <ModalWrapper
            loading={loading}
            responseSuccess={responseSuccess}
            responseError={responseError}
            disabled={invalid || !isRatingValid}
            isOpen={showAddProjectModal}
            onDiscard={this.handleProjectCloseModal}
            onHandleSubmit={handleSubmit(this.handleSubmitProjectForm)}
            title={`${projectModalType === 'add' ? 'Add' : 'Edit'} project`}
            primaryBtnText="Save"
          >
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...containerMessage.labelProjectName} />
                    </FormLabel>
                    <Field
                      name="name"
                      component={renderField}
                      type="text"
                      defaultValue={name}
                      placeholder={containerMessage.placeholderProjectName.defaultMessage}
                      onChange={onChangeName}
                      validate={[formValidations.required]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel className="d-inline-flex align-items-center">
                      <FormattedMessage {...componentMessage.labelProjectURL} />
                      <P className="p14 ms-1 mb-0 text-capitalize" opacityVal="0.5">
                        <FormattedMessage {...containerMessage.optionalText} />
                      </P>
                    </FormLabel>
                    <Field
                      name="url"
                      type="text"
                      component={renderField}
                      placeholder={containerMessage.urlPlaceholder.defaultMessage}
                      defaultValue={url}
                      onChange={onChangeUrl}
                      validate={[formValidations.websiteURL]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelProjectRole} />
                    </FormLabel>
                    <Field
                      name="role"
                      type="text"
                      component={Selects}
                      defaultValue={role}
                      searchable
                      options={roles.map(item => ({
                        label: `${item.name}`,
                        value: item.value,
                      }))}
                      onChange={onChangeRole}
                      placeHolder={componentMessage.placeHolderSelectPrimaryRole.defaultMessage}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelEmpType} />
                    </FormLabel>
                    <Field
                      name="employmentType"
                      type="text"
                      component={Selects}
                      defaultValue={employmentType}
                      searchable
                      options={employmentTypeList.map(item => ({
                        label: item.name,
                        value: item.value,
                      }))}
                      onChange={onChangeEmploymentType}
                      placeHolder={componentMessage.placeholderEmpType.defaultMessage}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelEmployer} />
                    </FormLabel>

                    <Field
                      name="employer"
                      type="text"
                      component={Selects}
                      defaultValue={employer}
                      searchable
                      options={employerList.map(item => ({
                        label: item.name,
                        value: item.value,
                      }))}
                      onChange={onChangeEmployer}
                      placeHolder={componentMessage.labelEmployerPlaceholder.defaultMessage}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <FormLabel>
                      <FormattedMessage {...componentMessage.labelIndustry} />
                    </FormLabel>

                    <Field
                      name="industry"
                      type="text"
                      component={Selects}
                      defaultValue={industry}
                      searchable
                      options={industryList.map(item => ({
                        label: item,
                        value: item,
                      }))}
                      onChange={onChangeIndustry}
                      placeHolder={componentMessage.labelIndustryPlaceholder.defaultMessage}
                      validate={[formValidations.requiredSelect]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <FormLabel>
                  <FormattedMessage {...componentMessage.labelProjectDesc} />
                </FormLabel>
                <Field
                  name="description"
                  defaultValue={shortDescription}
                  component={renderTextAreaForm}
                  rows={3}
                  placeholder="Description"
                  validate={[formValidations.required, formValidations.minLength50, formValidations.maxLength1000]}
                  onChange={onChangeDescription}
                />
              </FormGroup>
              <FormWrapper>
                <SkillRating {...this.props} formKey={key} onBoarding />
              </FormWrapper>
              <FormLabel className="d-inline-flex align-items-center">
                Add project photos
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  (Optional up to maximum 5)
                </P>
              </FormLabel>
              <FormGroup>
                <ImageGrid className="mb-4">
                  {images.map((imgData, index) => (
                    <div>
                      <div className="img-thumb">
                        <img className="img-fluid" src={imgData} alt="img" />
                        <Button type="button" className="btn-icon btn-link" onClick={() => this.deleteProjectImage(index)}>
                          <SVG src={trashIcon} />
                        </Button>
                      </div>
                      <div className="mt-3">
                        <Field
                          name="coverImage"
                          component={RadioButton}
                          label="Cover image"
                          className="m-0"
                          checked={selectedImgIndex === index}
                          onChangeRadio={e => this.handleCoverImage(e, index)}
                        />
                      </div>
                    </div>
                  ))}
                </ImageGrid>
                <div id="dropZone">{getPictureDropZone(this, 'multiplePhotosUploader', 5, !isDisable)}</div>
              </FormGroup>
            </form>
          </ModalWrapper>
        </>
      </React.Fragment>
    );
  }
}

KeyProjects.defaultProps = defaultProps;
KeyProjects.propTypes = propTypes;

const mapStateToProp = createStructuredSelector({
  projects: selectors.makeSelectProjects(),
  loading: makeSelectLoading(),
  name: selectors.makeSelectName(),
  url: selectors.makeSelectUrl(),
  description: selectors.makeSelectDescription(),
  role: selectors.makeSelectRole(),
  employer: selectors.makeSelectEmployer(),
  industry: selectors.makeSelectIndustry(),
  employmentType: selectors.makeSelectEmploymentType(),
  skills: selectors.makeSelectSkills(),
  skillsCount: selectors.makeSelectSkillsCount(),
  skillsRating: selectors.makeSelectSkillsRating(),
});

export function mapDispatchToProp(dispatch) {
  return {
    onChangeProject: data => dispatch(actions.changeProject(data)),
    onSaveForLater: () => dispatch(actions.saveForLater('saveForLater')),

    onChangeName: evt => dispatch(actions.changeName(evt.target.value)),
    onChangeUrl: evt => dispatch(actions.changeUrl(evt.target.value)),
    onChangeDescription: evt => dispatch(actions.changeDescription(evt.target.value)),
    onChangeRole: evt => dispatch(actions.changeRole(evt)),
    onChangeEmployer: evt => dispatch(actions.changeEmployer(evt)),
    onChangeIndustry: evt => dispatch(actions.changeIndustry(evt)),
    onChangeEmploymentType: evt => dispatch(actions.changeEmploymentType(evt)),
    onChangeSkills: skills => dispatch(actions.changeSkills(skills)),
    onSubmitAddProjectForm: (evt, type, data, onSuccess) => {
      if (evt !== undefined && evt.preventDefault) {
        evt.preventDefault();
      }
      dispatch(loadRepos());
      dispatch(actions.addProject(type, data, onSuccess));
    },
  };
}

const withConnect = connect(
  mapStateToProp,
  mapDispatchToProp,
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
