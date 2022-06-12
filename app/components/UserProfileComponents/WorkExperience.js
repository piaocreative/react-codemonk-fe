import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field, change } from 'redux-form/immutable';
import get from 'lodash/get';
import moment from 'moment';
import * as formValidations from 'utils/formValidations';
import SVG from 'react-inlinesvg';
import { renderField, renderTextEditor, renderFieldoptCheckbox } from 'utils/Fields';
import { FormLabel, Selects, DatePickers, LinkButtonMod } from 'components';
import { countryData, employmentTypeList, deleteIcon } from 'containers/App/constants';
import { setChangeAndUntouch } from 'containers/Auth/utils';
import containerMessage from 'containers/messages';
import { propTypes } from 'containers/Auth/WorkExperience/proptypes';
import { setInputClass } from './utils';
import messages from './messages';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class WorkExperienceComponent extends React.Component {
  constructor(props) {
    super(props);
    const { experiences } = props;
    this.state = { stateExperience: experiences };
  }

  componentDidMount() {
    const { onBoarding, experiences, index, formKey } = this.props;
    if (!onBoarding) this.setValues(experiences, index, formKey);
  }

  setValues = (experiences, index, formKey) => {
    const { dispatch, onChangeExperience } = this.props;
    const fieldData = {};
    fieldData[`jobTitle${index}`] = experiences[index].jobTitle;
    fieldData[`employmentType${index}`] = experiences[index].employmentType;
    fieldData[`employer${index}`] = experiences[index].employer;
    fieldData[`country${index}`] = experiences[index].country;
    fieldData[`startDate${index}`] = experiences[index].startDate;
    fieldData[`endDate${index}`] = experiences[index].endDate;
    fieldData[`currentlyWork${index}`] = experiences[index].currentlyWork;
    fieldData[`shortDescription${index}`] = experiences[index].shortDescription;

    setChangeAndUntouch(dispatch, formKey, fieldData);
    onChangeExperience(experiences);
  };

  handleFieldData = (e, index) => {
    const { key } = this.props;
    const { value, name } = e.target;
    const fieldName = name.split(/([0-9]+)/);
    const stringField = fieldName[0];
    const { dispatch, onChangeExperience, experiences } = this.props;
    dispatch(change(key, name, value));
    const setExperience = experiences;
    setExperience[index][stringField] = value;
    onChangeExperience(setExperience);
  };

  handleDateChange = (date, index, fieldName) => {
    const { key } = this.props;
    const dateName = fieldName.split(/([0-9]+)/);
    const stringField = dateName[0];
    const { dispatch, onChangeExperience, experiences } = this.props;
    dispatch(change(key, fieldName, date));
    const setExperience = experiences;
    setExperience[index][stringField] = date;
    onChangeExperience(setExperience);
  };

  handleChangeShortDescription = (editorState, index) => {
    const { key } = this.props;
    const { dispatch, onChangeExperience, experiences } = this.props;
    dispatch(change(key, `shortDescription${index}`, editorState));

    const setExperience = experiences;
    setExperience[index].shortDescription = editorState;
    onChangeExperience(setExperience);
  };

  getMaxStartDate = (stateExperiences, index) => {
    let output = '';
    const endDate = get(stateExperiences[index], 'endDate');
    if ((endDate && moment(endDate, 'DD/MM/YYYY').isSameOrAfter(moment())) || !endDate) {
      output = moment();
    } else {
      output = endDate;
    }
    return output;
  };

  checkIfValidDate = date => {
    let output = false;
    const newDate = moment(date, 'DD/MM/YYYY');
    if (newDate.isValid()) {
      output = true;
    }
    return output;
  };

  onChangeRaw = (date, experiences, index, type) => {
    const resetDate = experiences;
    resetDate[index][type] = date;
    this.handleDateChange(date, index, `${type}${index}`);
    this.setState({ stateExperience: resetDate });
  };

  dateValidation = (newDate, experiences, index, type) => {
    let output = false;
    if (this.checkIfValidDate(newDate)) {
      const maxStartDate = this.getMaxStartDate(experiences, index);

      switch (type) {
        case 'startDate':
          if (moment(newDate, 'DD/MM/YYYY').isSameOrBefore(maxStartDate) && this.checkValidStartDate(experiences, index)) {
            output = true;
          }
          break;
        case 'endDate':
          if (this.checkValidEndDate(experiences, index)) {
            output = true;
          }
          break;
        default:
      }
    }
    return output;
  };

  onBlurDate = (experiences, index, type) => {
    const date = experiences[index][type];
    if (!this.dateValidation(date, experiences, index, type)) {
      this.dateChange(experiences, '', index, type);
    }
  };

  dateChange = (experiences, date, index, type) => {
    const newExperiences = experiences;
    newExperiences[index][type] = date;
    this.setState({ stateExperience: newExperiences });

    this.handleDateChange(date, index, `${type}${index}`);
  };

  checkValidStartDate = (stateExperiences, index) => {
    let output = false;
    const startDate = get(stateExperiences[index], 'startDate');
    const endDate = get(stateExperiences[index], 'endDate');

    if ((endDate && moment(startDate, 'DD/MM/YYYY').isSameOrBefore(endDate)) || endDate === '') {
      output = true;
    }
    return output;
  };

  checkValidEndDate = (stateExperiences, index) => {
    let output = false;
    const startDate = get(stateExperiences[index], 'startDate');
    const endDate = get(stateExperiences[index], 'endDate');
    if ((startDate && moment(endDate, 'DD/MM/YYYY').isSameOrAfter(startDate)) || startDate === '') {
      output = true;
    }
    return output;
  };

  handleCurrentEndDate = (experiences, index) => {
    const { dispatch, key, onChangeExperience } = this.props;
    dispatch(change(key, `currentlyWork${index}`, !get(experiences[index], 'currentlyWork')));
    const setExperience = experiences;
    setExperience[index].currentlyWork = !get(experiences[index], 'currentlyWork');
    this.setState({ stateExperience: setExperience });
    onChangeExperience(setExperience);
  };

  renderDeleteButton = (experiences, onBoarding, index, onDeleteForm) => {
    let output = '';
    if (onBoarding) {
      if (experiences.length > 1) {
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
                <FormattedMessage {...messages.labelDeleteWorkExpereince} />
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
    const { experiences, index, size, onBoarding, onDeleteForm } = this.props;
    const { stateExperience } = this.state;
    const maxStartDate = this.getMaxStartDate(experiences, index);
    return (
      <React.Fragment>
        {experiences.length >= 1 && (
          // eslint-disable-next-line no-underscore-dangle
          <React.Fragment key={experiences[index]._id}>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelJobTitle} />
                  </FormLabel>
                  <Field
                    name={`jobTitle${index}`}
                    component={renderField}
                    type="text"
                    defaultValue={experiences[index].jobTitle}
                    placeholder={messages.placeholderJobTitle.defaultMessage}
                    onChange={e => this.handleFieldData(e, index)}
                    validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength30]}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelEmpType} />
                  </FormLabel>
                  <Field
                    name={`employmentType${index}`}
                    type="text"
                    component={Selects}
                    defaultValue={experiences[index].employmentType}
                    searchable={false}
                    options={employmentTypeList.map(item => ({
                      label: `${item.name}`,
                      value: item.value,
                    }))}
                    onChange={e => this.handleFieldData({ target: { name: `employmentType${index}`, value: e } }, index)}
                    placeHolder={messages.placeholderEmpType.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelEmployer} />
                  </FormLabel>
                  <Field
                    name={`employer${index}`}
                    type="text"
                    component={renderField}
                    placeholder={messages.placeholderEmployer.defaultMessage}
                    defaultValue={experiences[index].employer}
                    onChange={e => this.handleFieldData(e, index)}
                    validate={[formValidations.required, formValidations.minLength2, formValidations.maxLength30]}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelCountry} />
                  </FormLabel>
                  <Field
                    name={`country${index}`}
                    component={Selects}
                    placeholder={messages.placeholderCountry.defaultMessage}
                    defaultValue={experiences[index].country}
                    onChange={data => this.handleFieldData({ target: { name: `country${index}`, value: data } }, index)}
                    options={countryData.map(c => ({
                      label: c.name,
                      value: c.name,
                    }))}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelStartDate} />
                  </FormLabel>
                  <Field
                    name={`startDate${index}`}
                    component={DatePickers}
                    showYearDropDown
                    yearDropdownItemNumber={5}
                    scrollableYearDropdown
                    placeholder={containerMessage.placeholderDate.defaultMessage}
                    maxDate={moment(maxStartDate).toDate()}
                    selected={moment(get(experiences[index], 'startDate')).toDate()}
                    defaultValue={moment(get(experiences[index], 'startDate')).toDate()}
                    placement="bottom-start"
                    withIcon
                    onChange={date => this.dateChange(experiences, date, index, `startDate`)}
                    onBlur={() => this.onBlurDate(experiences, index, `startDate`)}
                    onChangeRaw={e => this.onChangeRaw(e.target.value, experiences, index, `startDate`)}
                    validate={[formValidations.requiredDate]}
                  />
                </FormGroup>
              </Col>

              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...messages.labelEndDate} />
                  </FormLabel>
                  {!get(stateExperience[index], 'currentlyWork') && (
                    <Field
                      name={`endDate${index}`}
                      component={DatePickers}
                      showYearDropDown
                      yearDropdownItemNumber={5}
                      scrollableYearDropdown
                      placeholder={containerMessage.placeholderDate.defaultMessage}
                      minDate={moment(get(stateExperience[index], 'startDate')).toDate()}
                      maxDate={new Date()}
                      selected={get(experiences[index], 'endDate')}
                      defaultValue={get(experiences[index], 'endDate')}
                      placement="bottom-start"
                      withIcon
                      onChange={date => this.dateChange(experiences, date, index, `endDate`)}
                      onBlur={() => this.onBlurDate(experiences, index, `endDate`)}
                      onChangeRaw={e => this.onChangeRaw(e.target.value, experiences, index, `endDate`)}
                      validate={[formValidations.requiredDate]}
                    />
                  )}
                  {get(stateExperience[index], 'currentlyWork') && (
                    <div className="present-text">{messages.endDateCurrentWork.defaultMessage}</div>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <Field
                    name={`currentlyWork${index}`}
                    type="checkbox"
                    component={renderFieldoptCheckbox}
                    message={messages.workExperienceCurrentWork.defaultMessage}
                    value={get(experiences[index], 'currentlyWork')}
                    onChange={() => this.handleCurrentEndDate(experiences, index)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className={setInputClass(size)}>
              <FormLabel>
                <FormattedMessage {...messages.labelShortDesc} />
              </FormLabel>
              <Field
                name={`shortDescription${index}`}
                component={renderTextEditor}
                editorState={experiences[index].shortDescription}
                placeholder="Tell us something about your job"
                onChange={editorState => this.handleChangeShortDescription(editorState, index)}
                validate={[formValidations.minLengthRichText2, formValidations.maxLengthRichText1000]}
              />
            </FormGroup>
            {this.renderDeleteButton(experiences, onBoarding, index, onDeleteForm)}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

WorkExperienceComponent.propTypes = propTypes;
