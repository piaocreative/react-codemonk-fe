/* eslint-disable react/no-unused-state */
/** Briefs
 * This is the Projects page for the Talent, at the '/Talent/job-briefs' route
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { reduxForm, change, Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Row, Col } from 'reactstrap';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { P, LinkButtonMod, Card, Button } from 'components';
import StorageService from 'utils/StorageService';
import { gtm } from 'utils/Helper';
import { renderSelectTags } from 'utils/Fields';
import { yearsOfExperienceArray, roles, skillsData } from 'containers/App/constants';
import { assignmentArray, teamPreferenceArray } from 'containers/TalentListingPage/constants';
import containerMessage from 'containers/messages';
import { propTypes, defaultProps } from 'containers/proptypes';
import { isNoFilterApplied } from 'containers/Client/Briefs/utils';
import { key, projectPreference } from './constants';

export class BriefFilters extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    const talentBriefFilter = StorageService.get('talentBriefFilter');
    const storedFilter = JSON.parse(talentBriefFilter) || {};
    const updatedFilter = isEmpty(storedFilter)
      ? {
          teamPrefArray: [],
          workPrefArray: [],
          assignmentsArray: [],
          expertiseArray: [],
          roleArray: [],
          skillsArray: [],
          alreadyAppliedArray: [],
          datePostedArray: [],
        }
      : storedFilter;
    dispatch(change(key, 'talentSkills', get(updatedFilter, 'skillsArray', [])));

    // checkForFilters
    const totalFilters = isNoFilterApplied(updatedFilter).count;

    this.state = {
      totalFilters,
      filters: updatedFilter,
    };
  }

  handleTalentFiltersOpenModal = () => {
    this.setState({ showFiltersModal: true });
  };

  handleTalentFiltersCloseModal = () => {
    this.setState({ showFiltersModal: false });
  };

  handleTalentCheckboxFilterChange = (name, checked, type) => {
    const {
      filters,
      filters: { [type]: filterType },
    } = this.state;
    let newFilter = filterType;
    if (checked) {
      newFilter.push(name);
      newFilter = newFilter.filter(value => value !== 'all');
    } else {
      newFilter = newFilter.filter(value => value !== name);
    }
    const newFilters = filters;
    newFilters[type] = newFilter;

    const totalFilters = isNoFilterApplied(newFilters).count;

    this.setState({ filters: newFilters, totalFilters }, () => {
      gtm({
        action: 'Button Click',
        event: 'custom_codemonk_event',
        label: 'filter_change',
        category: 'Talent Portal',
        filterName: type,
        filterValue: newFilter,
        value: 1,
      });
    });
  };

  handleSkillsChange = e => {
    const skillsVal = e || [];
    const { dispatch } = this.props;
    const { filters } = this.state;
    const newFilters = filters;
    newFilters.skillsArray = skillsVal;

    const totalFilters = isNoFilterApplied(newFilters).count;

    this.setState({ filters: newFilters, totalFilters });
    dispatch(change(key, 'talentSkills', skillsVal));
  };

  handleFilterChange = (e, option) => {
    const optionsVal = e || [];
    const { filters } = this.state;
    const newFilters = filters;
    newFilters[option] = optionsVal;
    const totalFilters = isNoFilterApplied(newFilters).count;
    this.setState({ filters: newFilters, totalFilters });
  };

  briefFilterChanged = type => {
    const { dispatch, handleFilterChanged } = this.props;
    const { filters } = this.state;
    let updatedFilter = {};
    if (type === 'update') {
      updatedFilter = filters;
    } else if (type === 'clear') {
      updatedFilter = {
        teamPrefArray: [],
        workPrefArray: [],
        assignmentsArray: [],
        expertiseArray: [],
        roleArray: [],
        skillsArray: [],
        alreadyAppliedArray: [],
        datePostedArray: [],
      };
      dispatch(change(key, 'talentSkills', []));
    }

    // common
    const noFilterApplied = isNoFilterApplied(updatedFilter).value;
    const totalFilters = isNoFilterApplied(updatedFilter).count;
    this.setState({ showFiltersModal: false, filters: updatedFilter, totalFilters });
    StorageService.set('talentBriefFilter', JSON.stringify(updatedFilter));

    handleFilterChanged(updatedFilter, noFilterApplied);
  };

  handleClearFilter = () => {
    const { dispatch } = this.props;
    const initFilters = {
      teamPrefArray: [],
      workPrefArray: [],
      assignmentsArray: [],
      expertiseArray: [],
      roleArray: [],
      skillsArray: [],
      alreadyAppliedArray: [],
      datePostedArray: [],
    };
    this.setState({
      filters: initFilters,
    });
    dispatch(change(key, 'roleArray', []));
  };

  render() {
    const {
      filters: { teamPrefArray, workPrefArray, assignmentsArray, expertiseArray, roleArray },
    } = this.state;
    return (
      <React.Fragment>
        <Card className="mb-10">
          <div className="d-flex justify-content-between">
            <P className="p20 mb-0">Filter</P>
            <LinkButtonMod color="link" onClick={this.handleClearFilter}>
              Clear all
            </LinkButtonMod>
          </div>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="mb-0">
                  <FormattedMessage {...containerMessage.subProjectRolesBrief} />
                </P>
                <FormGroup className="input-sm">
                  <Field
                    name="role"
                    component={renderSelectTags}
                    value={roleArray}
                    options={roles.map(role => ({
                      value: role.value,
                      label: role.name,
                    }))}
                    onChange={e => this.handleFilterChange(e, 'roleArray')}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="input-sm mb-0">Seniority</P>
                <FormGroup className="input-sm">
                  <Field
                    name="expertiseArray"
                    component={renderSelectTags}
                    value={expertiseArray}
                    options={yearsOfExperienceArray.map(role => ({
                      value: role.value,
                      label: role.name,
                    }))}
                    onChange={e => this.handleFilterChange(e, 'expertiseArray')}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="input-sm mb-0">
                  <FormattedMessage {...containerMessage.labelContractType} />
                </P>
                <FormGroup className="input-sm">
                  <Field
                    // name="talentSkills"
                    component={renderSelectTags}
                    // value={skillsArray}
                    options={skillsData}
                    // onChange={e => this.handleFilterChange(e, 'expertiseArray')}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="input-sm mb-0">Project duration</P>
                <FormGroup className="input-sm">
                  <Field
                    // name="talentSkills"
                    component={renderSelectTags}
                    // value={skillsArray}
                    options={skillsData}
                    // onChange={e => this.handleSkillsChange(e)}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="input-sm mb-0">Work assignment</P>
                <FormGroup className="input-sm">
                  <Field
                    name="workPrefArray"
                    component={renderSelectTags}
                    value={workPrefArray}
                    options={projectPreference}
                    onChange={e => this.handleFilterChange(e, 'workPrefArray')}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="input-sm mb-0">
                  <FormattedMessage {...containerMessage.subHeadingAssignment} />
                </P>
                <FormGroup className="input-sm">
                  <Field
                    name="assignmentsArray"
                    component={renderSelectTags}
                    value={assignmentsArray}
                    options={assignmentArray}
                    onChange={e => this.handleFilterChange(e, 'assignmentsArray')}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="input-sm mb-0">Company size</P>
                <FormGroup className="input-sm">
                  <Field
                    // name="talentSkills"
                    component={renderSelectTags}
                    // value={skillsArray}
                    options={skillsData}
                    // onChange={e => this.handleFilterChange(e, 'assignmentsArray')}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md="12">
              <React.Fragment>
                <P className="input-sm mb-0">
                  <FormattedMessage {...containerMessage.subHeadingTeam} />
                </P>
                <FormGroup className="input-sm">
                  <Field
                    name="teamPrefArray"
                    component={renderSelectTags}
                    value={teamPrefArray}
                    options={teamPreferenceArray}
                    onChange={e => this.handleFilterChange(e, 'teamPrefArray')}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                    isMulti
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Button type="button" className="btn btn-outline btn-sm mt-1 w-100">
            Update results
          </Button>
        </Card>
      </React.Fragment>
    );
  }
}

BriefFilters.defaultProps = defaultProps;
BriefFilters.propTypes = propTypes;

export default compose(
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(BriefFilters);
