/** Briefs
 * This is the Projects page for the Talent, at the '/Talent/job-briefs' route
 */
import React, { Component } from 'react';
import { compose } from 'redux';
import { reduxForm, change, Field } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Row, Col } from 'reactstrap';
import SVG from 'react-inlinesvg';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { H4 } from 'components';
import StorageService from 'utils/StorageService';
import { gtm } from 'utils/Helper';
import { renderCheckBox, renderSelectTags } from 'utils/Fields';
import { filterIcon, yearsOfExperienceArray, roles, skillsData } from 'containers/App/constants';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { assignmentArray, teamPreferenceArray } from 'containers/TalentListingPage/constants';
import containerMessage from 'containers/messages';
import { propTypes, defaultProps } from 'containers/proptypes';
import { isNoFilterApplied } from 'containers/Client/Briefs/utils';
import { key, projectPreference, appliedArray, postedOnArray } from './constants';
import { FilterButton } from './styles';
import messages from './messages';

export class BriefFiltersOld extends Component {
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

  render() {
    const {
      filters,
      totalFilters,
      showFiltersModal,
      filters: { skillsArray },
    } = this.state;
    const { invalid, responseError, responseSuccess, loading, handleSubmit } = this.props;
    return (
      <React.Fragment>
        <FilterButton type="button" onClick={this.handleTalentFiltersOpenModal}>
          <SVG src={filterIcon} />
          {containerMessage.textFilter.defaultMessage}
          <span className="count">{totalFilters}</span>
        </FilterButton>
        <PopupWrapper
          modalId="showFiltersModal"
          loading={loading}
          responseSuccess={responseSuccess}
          responseError={responseError}
          disabled={invalid}
          isOpen={showFiltersModal}
          modalType="filter"
          otherActions
          onDiscard={this.handleTalentFiltersCloseModal}
          onHandleSubmit={handleSubmit(() => {
            this.briefFilterChanged('update');
          })}
          onHandleClearFilter={() => {
            this.briefFilterChanged('clear');
          }}
          title={messages.modelFiltersHeader.defaultMessage}
        >
          <Row>
            <Col md="6">
              <H4 className="input-sm mt-0">
                <FormattedMessage {...containerMessage.subHeadingTeam} />
              </H4>
              <FormGroup className="input-sm">
                {teamPreferenceArray
                  .filter(item => item.value !== 'all')
                  .map(item => (
                    <Field
                      name={item.value}
                      type="checkbox"
                      component={renderCheckBox}
                      label={item.label}
                      checked={get(filters, 'teamPrefArray', []).includes(item.value)}
                      onChange={e => this.handleTalentCheckboxFilterChange(e.target.name, e.target.checked, 'teamPrefArray')}
                    />
                  ))}
              </FormGroup>
            </Col>
            <Col md="6">
              <H4 className="input-sm mt-0">
                <FormattedMessage {...containerMessage.subHeadingAssignment} />
              </H4>
              <FormGroup className="input-sm">
                {assignmentArray
                  .filter(item => item.value !== 'all')
                  .map(item => (
                    <Field
                      name={item.value}
                      type="checkbox"
                      component={renderCheckBox}
                      label={item.label}
                      checked={get(filters, 'assignmentsArray', []).includes(item.value)}
                      onChange={e => this.handleTalentCheckboxFilterChange(e.target.name, e.target.checked, 'assignmentsArray')}
                    />
                  ))}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <H4 className="input-sm mt-0">
                <FormattedMessage {...containerMessage.labelWorkSchedule} />
              </H4>
              <FormGroup className="input-sm">
                {projectPreference.map(item => (
                  <Field
                    name={item.value}
                    type="checkbox"
                    component={renderCheckBox}
                    label={item.label}
                    checked={get(filters, 'workPrefArray', []).includes(item.value)}
                    onChange={e => this.handleTalentCheckboxFilterChange(e.target.name, e.target.checked, 'workPrefArray')}
                  />
                ))}
              </FormGroup>
            </Col>
            {/* new */}
            <Col md="6">
              <H4 className="input-sm mt-0">
                <FormattedMessage {...containerMessage.subProjectExpertiseLevelBrief} />
              </H4>
              <FormGroup className="input-sm">
                {yearsOfExperienceArray.map(item => (
                  <Field
                    name={item.value}
                    type="checkbox"
                    component={renderCheckBox}
                    label={item.name}
                    checked={get(filters, 'expertiseArray', []).includes(item.value)}
                    onChange={e => this.handleTalentCheckboxFilterChange(e.target.name, e.target.checked, 'expertiseArray')}
                  />
                ))}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <H4 className="input-sm mt-0">
                <FormattedMessage {...containerMessage.subProjectRolesBrief} />
              </H4>
              <FormGroup className="input-sm">
                {roles.map(item => (
                  <Field
                    name={item.value}
                    type="checkbox"
                    component={renderCheckBox}
                    label={item.name}
                    checked={get(filters, 'roleArray', []).includes(item.value)}
                    onChange={e => this.handleTalentCheckboxFilterChange(e.target.name, e.target.checked, 'roleArray')}
                  />
                ))}
              </FormGroup>
            </Col>
            <Col md="6">
              <React.Fragment>
                <H4 className="input-sm mt-0">
                  <FormattedMessage {...containerMessage.subAlreadyApplied} />
                </H4>
                <FormGroup className="input-sm">
                  {appliedArray.map(item => (
                    <Field
                      name={item.value}
                      type="checkbox"
                      component={renderCheckBox}
                      label={item.name}
                      checked={get(filters, 'alreadyAppliedArray', []).includes(item.value)}
                      onChange={e => this.handleTalentCheckboxFilterChange(e.target.name, e.target.checked, 'alreadyAppliedArray')}
                    />
                  ))}
                </FormGroup>
              </React.Fragment>
              <React.Fragment>
                <H4 className="input-sm mt-0">
                  <FormattedMessage {...containerMessage.subDatePosted} />
                </H4>
                <FormGroup className="input-sm">
                  {postedOnArray.map(item => (
                    <Field
                      name={item.value}
                      type="checkbox"
                      component={renderCheckBox}
                      label={item.name}
                      checked={get(filters, 'datePostedArray', []).includes(item.value)}
                      onChange={e => this.handleTalentCheckboxFilterChange(e.target.name, e.target.checked, 'datePostedArray')}
                    />
                  ))}
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <React.Fragment>
                <H4 className="input-sm mt-0">
                  <FormattedMessage {...containerMessage.subProjectSkills} />
                </H4>
                <FormGroup className="input-sm">
                  <Field
                    name="talentSkills"
                    component={renderSelectTags}
                    value={skillsArray}
                    options={skillsData}
                    isMulti
                    onChange={e => this.handleSkillsChange(e)}
                    placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                  />
                </FormGroup>
              </React.Fragment>
            </Col>
          </Row>
        </PopupWrapper>
      </React.Fragment>
    );
  }
}

BriefFiltersOld.defaultProps = defaultProps;
BriefFiltersOld.propTypes = propTypes;

export default compose(
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(BriefFiltersOld);
