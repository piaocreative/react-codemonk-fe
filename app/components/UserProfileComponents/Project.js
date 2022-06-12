import React, { Component } from 'react';
import { Field, change, untouch } from 'redux-form/immutable';
import * as formValidations from 'utils/formValidations';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import Selects from 'components/Selects';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { renderField, renderTextEditor } from 'utils/Fields';
import SVG from 'react-inlinesvg';
import containerMessage from 'containers/messages';
import { roles, deleteIcon } from 'containers/App/constants';
import { SkillRating } from 'components/UserProfileComponents/SkillRating';
import { H4, LinkButtonMod, FormLabel, FormWrapper } from 'components';
import { propTypes } from 'containers/proptypes';
import messages from './messages';
import { setInputClass } from './utils';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class Project extends Component {
  componentDidMount() {
    const { onBoarding, projects, index, formKey } = this.props;
    if (!onBoarding) this.setValues(projects, index, formKey);
  }

  setValues = (projects, index, formKey) => {
    const { dispatch, onChangeProject } = this.props;
    dispatch(change(formKey, `projectName${index}`, projects[index].name));
    dispatch(change(formKey, `projectURL${index}`, projects[index].url));
    dispatch(change(formKey, `projectDesc${index}`, projects[index].description));
    dispatch(change(formKey, `projectRole${index}`, projects[index].role));
    dispatch(change(formKey, `projectEmployer${index}`, projects[index].employer));
    dispatch(change(formKey, `projectIndustry${index}`, projects[index].industry));

    dispatch(untouch(formKey, `projectName${index}`));
    dispatch(untouch(formKey, `projectURL${index}`));
    dispatch(untouch(formKey, `projectDesc${index}`));
    dispatch(untouch(formKey, `projectRole${index}`));
    dispatch(untouch(formKey, `projectEmployer${index}`));
    dispatch(untouch(formKey, `projectIndustry${index}`));

    onChangeProject(projects);
  };

  handleChangeProjectName = (e, index) => {
    const { dispatch, formKey: key, onChangeProject, projects } = this.props;
    const newProjectName = e.target.value;
    dispatch(change(key, `projectName${index}`, newProjectName));
    const setProjects = projects;
    setProjects[index].name = newProjectName;
    onChangeProject(setProjects);
  };

  handleChangeProjectURL = (e, index) => {
    const { dispatch, formKey: key, onChangeProject, projects } = this.props;
    const newProjectURL = e.target.value;

    dispatch(change(key, `projectURL${index}`, newProjectURL));
    const setProjects = projects;
    setProjects[index].url = newProjectURL;
    onChangeProject(setProjects);
  };

  handleChangeProjectRole = (e, index) => {
    const { dispatch, formKey: key, onChangeProject, projects } = this.props;
    const newProjectRole = e;
    dispatch(change(key, `projectRole${index}`, newProjectRole));
    const setProjects = projects;
    setProjects[index].role = newProjectRole;
    onChangeProject(setProjects);
  };

  handleChangeProjectEmployer = (e, index) => {
    const { dispatch, formKey: key, onChangeProject, projects } = this.props;
    const newProjectEmployer = e;
    dispatch(change(key, `projectEmployer${index}`, newProjectEmployer));
    const setProjects = projects;
    setProjects[index].employer = newProjectEmployer;
    onChangeProject(setProjects);
  };

  handleChangeProjectIndustry = (e, index) => {
    const { dispatch, formKey: key, onChangeProject, projects } = this.props;
    const newProjectIndustry = e;
    dispatch(change(key, `projectIndustry${index}`, newProjectIndustry));
    const setProjects = projects;
    setProjects[index].industry = newProjectIndustry;
    onChangeProject(setProjects);
  };

  handleChangeProjectDescription = (editorState, index) => {
    const { dispatch, formKey: key, onChangeProject, projects } = this.props;
    dispatch(change(key, `projectDesc${index}`, editorState));

    const setProjects = projects;
    setProjects[index].description = editorState;
    setProjects[index].rawDescription = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    onChangeProject(setProjects);
  };

  renderDeleteButton = (projects, onBoarding, index, onDeleteForm) => {
    let output = '';
    if (onBoarding) {
      if (projects.length > 1) {
        output = (
          <React.Fragment>
            <LinkButtonMod
              className="me-5"
              color="link"
              onClick={() => {
                onDeleteForm(index);
              }}
            >
              <SVG src={deleteIcon} />

              <small className="opacity-100">
                <FormattedMessage {...messages.labelProjectDelete} />
              </small>
            </LinkButtonMod>
            <hr className="hr-280" />
          </React.Fragment>
        );
      } else {
        output = <hr className="hr-280" />;
      }
    } else {
      output = null;
    }
    return output;
  };

  render() {
    const { projects, index, size, onBoarding, onDeleteForm, key, formKey, workExperence = [], industryList = [] } = this.props;
    return (
      <React.Fragment>
        {projects.length >= 1 && (
          <FormWrapper key={index}>
            {onBoarding && (
              <H4>
                <FormattedMessage {...messages.labelProject} /> {index + 1}
              </H4>
            )}
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...containerMessage.labelProjectName} />
                  </FormLabel>
                  <Field
                    name={`projectName${index}`}
                    component={renderField}
                    type="text"
                    defaultValue={projects[index].name}
                    placeholder={containerMessage.placeholderProjectName.defaultMessage}
                    onChange={e => this.handleChangeProjectName(e, index)}
                    validate={[formValidations.required]}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelProjectURL} />
                    <small className="optional-text">
                      <FormattedMessage {...containerMessage.optionalText} />
                    </small>
                  </FormLabel>
                  <Field
                    name={`projectURL${index}`}
                    type="text"
                    component={renderField}
                    placeholder={messages.labelProjectURL.defaultMessage}
                    defaultValue={projects[index].url}
                    onChange={e => this.handleChangeProjectURL(e, index)}
                    validate={[formValidations.websiteURL]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelProjectRole} />
                  </FormLabel>

                  <Field
                    name={`projectRole${index}`}
                    type="text"
                    component={Selects}
                    defaultValue={projects[index].role}
                    searchable={false}
                    options={roles.map(item => ({
                      label: `${item.name}`,
                      value: item.value,
                    }))}
                    onChange={e => this.handleChangeProjectRole(e, index)}
                    placeHolder={messages.placeHolderSelectPrimaryRole.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelEmployer} />
                  </FormLabel>

                  <Field
                    name={`projectEmployer${index}`}
                    type="text"
                    component={Selects}
                    defaultValue={projects[index].employer}
                    searchable={false}
                    options={workExperence.map(item => ({
                      label: item.employer,
                      value: item.employer,
                    }))}
                    onChange={e => this.handleChangeProjectEmployer(e, index)}
                    placeHolder={messages.labelEmployerPlaceholder.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelIndustry} />
              </FormLabel>

              <Field
                name={`projectIndustry${index}`}
                type="text"
                component={Selects}
                defaultValue={projects[index].industry}
                searchable
                options={industryList.map(item => ({
                  label: item,
                  value: item,
                }))}
                onChange={e => this.handleChangeProjectIndustry(e, index)}
                placeHolder={messages.labelIndustryPlaceholder.defaultMessage}
                validate={[formValidations.requiredSelect]}
              />
            </FormGroup>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelProjectDesc} />
              </FormLabel>

              <Field
                name={`projectDesc${index}`}
                component={renderTextEditor}
                editorState={projects[index].description}
                placeholder={messages.labelProjectDescPlaceholder.defaultMessage}
                onChange={editorState => this.handleChangeProjectDescription(editorState, index)}
                validate={[formValidations.minLengthRichText50, formValidations.maxLengthRichText1000]}
              />
            </FormGroup>

            <React.Fragment>
              <H4>
                <FormattedMessage {...messages.labelSkills} />
              </H4>
              <SkillRating {...this.props} index={index} formKey={key || formKey} />
            </React.Fragment>

            {this.renderDeleteButton(projects, onBoarding, index, onDeleteForm)}
          </FormWrapper>
        )}
      </React.Fragment>
    );
  }
}

Project.propTypes = propTypes;
