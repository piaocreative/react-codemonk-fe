import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Row, Col } from 'reactstrap';
import { P, FormLabel } from 'components';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form/immutable';
import {
  companyTypeArray,
  preferredProjectTimeArray,
  teamPreferenceArray,
  assignmentArray,
  workPreferenceArray,
} from 'containers/App/constants';
import { renderSelectTags } from 'utils/Fields';
import containerMessage from 'containers/messages';
import { getFieldValidator } from './fields';
import messages from './messages';

export class PreferenceComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleIndustrySelectChangeTags = selectedValues => {
    const { onChangeIndustry } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onChangeIndustry(selectedItems);
  };

  handleCompanyCulturesSelectChangeTags = (selectedValues = []) => {
    const { onChangeCompanyCultures } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onChangeCompanyCultures(selectedItems);
  };

  handleCompanyTypeSelectChangeTags = (selectedValues = []) => {
    const { onCompanyTypeChange } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onCompanyTypeChange(selectedItems);
  };

  handleProjectDurationChangeTags = (selectedValues = []) => {
    const { onPreferredProjectChange } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onPreferredProjectChange(selectedItems);
  };

  handleTeamSizeChangeTags = (selectedValues = []) => {
    const { onTeamPreferenceChange } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onTeamPreferenceChange(selectedItems);
  };

  handleWorkLocationChangeTags = (selectedValues = []) => {
    const { onAssignmentChange } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onAssignmentChange(selectedItems);
  };

  handleWorkScheduleChangeTags = (selectedValues = []) => {
    const { onWorkPreferenceChange } = this.props;
    const selectedItems = (selectedValues || []).map(i => i.value);
    onWorkPreferenceChange(selectedItems);
  };

  render() {
    const {
      industries,
      companyCultures,
      companyType,
      preferredProjectDuration = [],
      teamPreference = [],
      assignments,
      workPreference = [],
      industryList = [],
      companyCulturesList = [],
    } = this.props;

    return (
      <React.Fragment>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...messages.labelIndustry} />
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  <FormattedMessage {...messages.text3MaxSelection} />
                </P>
              </FormLabel>
              <Field
                name="industries"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={industries}
                onChange={this.handleIndustrySelectChangeTags}
                options={industryList.map(item => ({
                  label: item,
                  value: item,
                }))}
                optionLimit="3"
                isMulti
                closeMenuOnSelect={false}
                validate={getFieldValidator('multiSelectField', true)}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel className="d-inline-flex align-items-center">
                <FormattedMessage {...messages.labelcompanyCulture} />
                <P className="p14 ms-1 mb-0" opacityVal="0.5">
                  <FormattedMessage {...messages.text3MaxSelection} />
                </P>
              </FormLabel>
              <Field
                name="companyCultures"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={companyCultures}
                optionLimit="3"
                onChange={this.handleCompanyCulturesSelectChangeTags}
                options={companyCulturesList.map(item => ({
                  label: item,
                  value: item,
                }))}
                isMulti
                closeMenuOnSelect={false}
                validate={getFieldValidator('multiSelectField', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelCompanySize} />
              </FormLabel>
              <Field
                name="companyType"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={companyType}
                onChange={this.handleCompanyTypeSelectChangeTags}
                options={companyTypeArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                isMulti
                closeMenuOnSelect={false}
                validate={getFieldValidator('multiSelectField', true)}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelProjectDuration} />
              </FormLabel>
              <Field
                name="preferredProjectDuration"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={preferredProjectDuration}
                onChange={this.handleProjectDurationChangeTags}
                options={preferredProjectTimeArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                isMulti
                closeMenuOnSelect={false}
                validate={getFieldValidator('multiSelectField', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.subHeadingTeam} />
              </FormLabel>
              <Field
                name="teamPreference"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={teamPreference}
                onChange={this.handleTeamSizeChangeTags}
                options={teamPreferenceArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                isMulti
                closeMenuOnSelect={false}
                validate={getFieldValidator('multiSelectField', true)}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.subHeadingAssignment} />
              </FormLabel>
              <Field
                name="assignments"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={assignments}
                onChange={this.handleWorkLocationChangeTags}
                options={assignmentArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                isMulti
                closeMenuOnSelect={false}
                validate={getFieldValidator('multiSelectField', true)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <FormLabel>
                <FormattedMessage {...containerMessage.labelWorkSchedule} />
              </FormLabel>
              <Field
                name="workPreference"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={workPreference}
                onChange={this.handleWorkScheduleChangeTags}
                options={workPreferenceArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                isMulti
                closeMenuOnSelect={false}
                validate={getFieldValidator('multiSelectField', true)}
              />
            </FormGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

PreferenceComponent.defaultProps = {
  size: '',
};
PreferenceComponent.propTypes = {
  size: PropTypes.string,
  workPreference: PropTypes.any,
  companyCultures: PropTypes.any,
  industries: PropTypes.any,
  teamPreference: PropTypes.any,
  assignments: PropTypes.any,
  companyType: PropTypes.any,
  preferredProjectDuration: PropTypes.any,
  onChangeBrief: PropTypes.func,
  dispatch: PropTypes.any,
  onAssignmentChange: PropTypes.func,
  onTeamPreferenceChange: PropTypes.func,
  onCompanyTypeChange: PropTypes.func,
  onWorkPreferenceChange: PropTypes.func,
  onPreferredProjectChange: PropTypes.func,
  onChangeIndustry: PropTypes.func,
  onChangeCompanyCultures: PropTypes.func,
  industryList: PropTypes.object,
  companyCulturesList: PropTypes.object,
};
