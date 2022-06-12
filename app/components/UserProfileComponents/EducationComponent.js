import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { Field, change } from 'redux-form/immutable';
import get from 'lodash/get';
import moment from 'moment';
import * as formValidations from 'utils/formValidations';
import { renderField } from 'utils/Fields';
import SVG from 'react-inlinesvg';
import { FormLabel, Selects, DatePickers, LinkButtonMod } from 'components';
import { countryData, educationDegree, deleteIcon } from 'containers/App/constants';
import { setChangeAndUntouch } from 'containers/Auth/utils';
import { propTypes } from 'containers/proptypes';
import authMessages from 'containers/Auth/Education-Certification/messages';
import messages from './messages';
import { setInputClass } from './utils';

export class EducationComponent extends React.Component {
  constructor(props) {
    super(props);
    const { education } = props;
    this.state = { stateEducation: education };
  }

  componentDidMount() {
    const { onBoarding, education, index, formKey } = this.props;
    if (!onBoarding) this.setEducationValues(education, index, formKey);
  }

  setEducationValues = (education, index, formKey) => {
    const { dispatch, onChangeEducation } = this.props;
    const educationData = {};
    educationData[`degreeLevel${index}`] = education[index].degreeLevel;
    educationData[`degreeTitle${index}`] = education[index].degreeTitle;
    educationData[`collegeName${index}`] = education[index].collegeName;
    educationData[`country${index}`] = education[index].country;
    educationData[`startYear${index}`] = education[index].startYear;
    educationData[`endYear${index}`] = education[index].endYear;

    setChangeAndUntouch(dispatch, formKey, educationData);
    onChangeEducation(education);
  };

  handleFieldData = (e, index) => {
    const { key } = this.props;
    const { value, name } = e.target;
    const fieldName = name.split(/([0-9]+)/);
    const stringField = fieldName[0];
    const { dispatch, onChangeEducation, education } = this.props;
    dispatch(change(key, name, value));
    const setEducation = education;
    setEducation[index][stringField] = value;
    onChangeEducation(setEducation);
  };

  handleDateChange = (date, index, fieldName) => {
    const { key } = this.props;
    const dateName = fieldName.split(/([0-9]+)/);
    const stringField = dateName[0];
    const { dispatch, onChangeEducation, education } = this.props;
    dispatch(change(key, fieldName, date));
    const setEducation = education;
    setEducation[index][stringField] = date;
    onChangeEducation(setEducation);
  };

  getMaxStartDate = (stateEducations, index) => {
    let output = '';
    const endYear = get(stateEducations[index], 'endYear');

    if ((endYear && moment(endYear, 'DD/MM/YYYY').isSameOrAfter(moment())) || !endYear) {
      output = moment();
    } else {
      output = endYear;
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

  onChangeRaw = (date, education, index, type) => {
    const resetDate = education;
    resetDate[index][type] = date;
    this.handleDateChange(date, index, `${type}${index}`);
    this.setState({ stateEducation: resetDate });
  };

  dateValidation = (newDate, education, index, type) => {
    let output = false;
    if (this.checkIfValidDate(newDate)) {
      const maxStartDate = this.getMaxStartDate(education, index);

      switch (type) {
        case 'startYear':
          if (moment(newDate, 'DD/MM/YYYY').isSameOrBefore(maxStartDate) && this.checkValidStartDate(education, index)) {
            output = true;
          }
          break;
        case 'endYear':
          if (this.checkValidEndDate(education, index)) {
            output = true;
          }
          break;
        default:
      }
    }
    return output;
  };

  onBlurDate = (education, index, type) => {
    const date = education[index][type];
    if (!this.dateValidation(date, education, index, type)) {
      this.dateChange(education, '', index, type);
    }
  };

  dateChange = (education, date, index, type) => {
    const newEducations = education;
    newEducations[index][type] = date;
    this.setState({ stateEducation: newEducations });
    this.handleDateChange(date, index, `${type}${index}`);
  };

  checkValidStartDate = (stateEducations, index) => {
    let output = false;
    const startYear = get(stateEducations[index], 'startYear');
    const endYear = get(stateEducations[index], 'endYear');

    if ((endYear && moment(startYear, 'DD/MM/YYYY').isSameOrBefore(endYear)) || endYear === '') {
      output = true;
    }
    return output;
  };

  checkValidEndDate = (stateEducations, index) => {
    let output = false;
    const startYear = get(stateEducations[index], 'startYear');
    const endYear = get(stateEducations[index], 'endYear');

    if ((startYear && moment(endYear, 'DD/MM/YYYY').isSameOrAfter(startYear)) || startYear === '') {
      output = true;
    }

    return output;
  };

  renderDeleteButton = (education, onBoarding, index, onDeleteForm) => {
    let output = '';
    if (onBoarding) {
      if (education.length > 1) {
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
                <FormattedMessage {...messages.labelDeleteEducation} />
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
    const { education, index, size, onBoarding, onDeleteForm } = this.props;
    const { stateEducation } = this.state;
    const maxStartDate = this.getMaxStartDate(education, index);
    return (
      <React.Fragment>
        {education.length >= 1 && (
          // eslint-disable-next-line no-underscore-dangle
          <React.Fragment key={education[index]._id}>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelDegreeLevel} />
                  </FormLabel>
                  <Field
                    name={`degreeLevel${index}`}
                    component={Selects}
                    defaultValue={education[index].degreeLevel}
                    searchable={false}
                    options={educationDegree.map(item => ({
                      label: `${item.name}`,
                      value: item.value,
                    }))}
                    onChange={e => this.handleFieldData({ target: { name: `degreeLevel${index}`, value: e } }, index)}
                    placeHolder={authMessages.placeholderDegreeLevel.defaultMessage}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelDegreeTitle} />
                  </FormLabel>
                  <Field
                    name={`degreeTitle${index}`}
                    type="text"
                    component={renderField}
                    placeholder={authMessages.placeholderDegreeTitle.defaultMessage}
                    defaultValue={education[index].degreeTitle}
                    onChange={e => this.handleFieldData(e, index)}
                    validate={[formValidations.requiredField, formValidations.minLength2, formValidations.maxLength50]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelCollege} />
                  </FormLabel>
                  <Field
                    name={`collegeName${index}`}
                    type="text"
                    component={renderField}
                    placeholder={authMessages.placeholderCollege.defaultMessage}
                    defaultValue={education[index].collegeName}
                    onChange={e => this.handleFieldData(e, index)}
                    validate={[formValidations.requiredField, formValidations.minLength2, formValidations.maxLength50]}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelCountry} />
                  </FormLabel>
                  <Field
                    name={`country${index}`}
                    component={Selects}
                    placeHolder={authMessages.placeholderCountry.defaultMessage}
                    defaultValue={education[index].country}
                    options={countryData.map(c => ({
                      label: c.name,
                      value: c.name,
                    }))}
                    onChange={data => this.handleFieldData({ target: { name: `country${index}`, value: data } }, index)}
                    validate={[formValidations.requiredSelect]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="row-spacing">
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelStartYear} />
                  </FormLabel>
                  <Field
                    name={`startYear${index}`}
                    component={DatePickers}
                    showYearPicker
                    placeholder={authMessages.placeholderYear.defaultMessage}
                    maxDate={moment(maxStartDate).toDate()}
                    selected={get(education[index], 'startYear')}
                    defaultValue={get(education[index], 'startYear')}
                    placement="bottom-start"
                    withIcon
                    onChange={date => this.dateChange(education, date, index, `startYear`)}
                    onBlur={() => this.onBlurDate(education, index, `startYear`)}
                    onChangeRaw={e => this.onChangeRaw(e.target.value, education, index, `startYear`)}
                    dateFormat="yyyy"
                    validate={[formValidations.requiredDate]}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className={setInputClass(size)}>
                  <FormLabel>
                    <FormattedMessage {...authMessages.labelEndYear} />
                  </FormLabel>
                  <Field
                    name={`endYear${index}`}
                    component={DatePickers}
                    showYearPicker
                    placeholder={authMessages.placeholderYear.defaultMessage}
                    minDate={moment(get(stateEducation[index], 'startYear')).toDate()}
                    selected={get(education[index], 'endYear')}
                    defaultValue={get(education[index], 'endYear')}
                    placement="bottom-start"
                    withIcon
                    onChange={date => this.dateChange(education, date, index, `endYear`)}
                    onBlur={() => this.onBlurDate(education, index, `endYear`)}
                    onChangeRaw={e => this.onChangeRaw(e.target.value, education, index, `endYear`)}
                    dateFormat="yyyy"
                    validate={[formValidations.requiredDate]}
                  />
                </FormGroup>
              </Col>
            </Row>

            {this.renderDeleteButton(education, onBoarding, index, onDeleteForm)}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

EducationComponent.propTypes = propTypes;
