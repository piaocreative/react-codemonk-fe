/* eslint-disable react/destructuring-assignment */
/** TalentListingPage
 * This is the Signup page for the App, at the '/talent-listing' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormGroup, Row, Col, DropdownMenu, DropdownToggle } from 'reactstrap';
import { PrivateGrid, H4, H3, Badge, H6 } from 'components';
import SVG from 'react-inlinesvg';
import { reduxForm, Field, change } from 'redux-form/immutable';
import CountUp from 'react-countup';
import { compose } from 'redux';
import StorageService from 'utils/StorageService';
import { RadioButton, renderCheckBox, renderSelectTags } from 'utils/Fields';
import Pagination from 'rc-pagination';
import { gtm } from 'utils/Helper';
import get from 'lodash/get';
import Emitter from 'utils/emitter';
import request from 'utils/request';
import containerMessage from 'containers/messages';
import Content from 'components/Content';
import userProfileMessage from 'components/UserProfileComponents/messages';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import { PartTimeProjectFormWrapper } from 'containers/Auth/Preferences/preferences-styles';
import { getSkills, getIndustryList, getCertificationsList, getCompanyCultures } from 'containers/Auth/utils';
import {
  closeIcon,
  API_URL,
  TALENT,
  SEARCH_API,
  partTimeArray,
  languageData,
  countryData,
  filterIcon,
  leftArrowIcon,
  discProfileArray,
} from 'containers/App/constants';
import { toast } from 'react-toastify';
import { VALIDATION } from 'utils/constants';
import ToastifyMessage from 'components/ToastifyMessage';
import { FilterButton } from 'containers/Talent/Briefs/styles';
import { propTypes } from 'containers/proptypes';
import SortComponent from 'components/SortComponent';
import { SortSection } from 'containers/Talent/MyProjects/styles';
import {
  languageDefaultData,
  countryDefaultData,
  FILTER_KEYS,
  DEFAULT_PAGE_NO,
  key,
  primaryRoleArray,
  expInPrimaryRoleArray,
  teamPreferenceArray,
  assignmentArray,
  educationLevelArray,
  availabilityArray,
  localeInfo,
  initialValues,
  sortArray,
  projectPreference,
  teamWorkingList,
  MULTI_SELECT_KEYS,
} from './constants';
import { defaultSortUrl, skillsUrl, textItemRender, loadingListing } from './utils';
import messages from './messages';
import TalentCardComponent from './TalentCardComponent';
import Autocomplete from './AutoComplete';
import { FilterList, FiltersContainer, FilterBlock, ListingFilter, FilterAction } from './styles';
import 'rc-pagination/assets/index.css';

export class TalentListingPage extends React.Component {
  constructor(props) {
    super(props);
    const clientTalentSort = StorageService.get('clientTalentSort');
    this.state = {
      talentList: [],
      paginationData: [],
      pageNum: DEFAULT_PAGE_NO,
      loading: false,
      role: ['all'],
      yearsOfExperience: ['all'],
      ...initialValues,
      languageSearch: languageDefaultData,
      countrySearch: countryDefaultData,
      isFilterDisplay: false,
      languageList: languageData.map(item => item.value),
      countryList: countryData.map(item => item.value),
      skillsList: [],
      industryList: [],
      certificationsList: [],
      companyCulturesList: [],
      docLimit: 28,
      totalTalents: 0,
      dropdownOpen: false,
      experienceDropdownOpen: false,
      modalFilter: { ...initialValues },
      skillsArray: [],
      industry: [],
      discProfile: [],
      companyCultures: [],
      certification: [],
      currentSort: clientTalentSort ? sortArray.find(item => clientTalentSort.indexOf(item.value) > -1) : sortArray[0],
    };
    this.filterObjectEmitter = this.filterObjectEmitter.bind(this);
  }

  componentDidMount() {
    const getPageNumber = StorageService.get('pageNumber');
    const filterObjectGet = StorageService.get('filterObject');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    if (filterObjectGet) {
      this.setReservedFilter(updatedPageNumber);
    } else {
      this.loadTalentProfiles(updatedPageNumber);
    }
    Emitter.on('filterObject', this.filterObjectEmitter);
  }

  filterObjectEmitter() {
    this.setReservedFilter(1);
  }

  componentDidUnmount() {
    Emitter.off('filterObject', this.filterObjectEmitter);
  }

  setSkills = response => {
    if (get(response, 'status')) {
      this.setState({ skillsList: response.data });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
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

  setCertifications = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ certificationsList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  setCompanyCultures = (response, cb) => {
    if (get(response, 'status')) {
      this.setState({ companyCulturesList: response.data }, cb);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
      cb();
    }
  };

  loadTalentProfiles = pageNum => {
    StorageService.set('pageNumber', JSON.stringify(pageNum));
    this.setState({ loading: true, pageNum });
    const data = { method: 'GET' };
    const { docLimit, currentSort, skillsArray } = this.state;
    let requestURL = `${API_URL}${TALENT}${SEARCH_API}?page=${pageNum}&limit=${docLimit}`;
    FILTER_KEYS.forEach(filterKey => {
      let { [filterKey]: filterKeyName } = this.state;
      if (filterKey === 'language') {
        filterKeyName = languageData
          .filter(language => filterKeyName.filter(selected => selected.replace('\n', '').trim() === language.label).length > 0)
          .map(l => l.code);
        if (filterKeyName.length === 0) {
          return;
        }
      }
      if (filterKey === 'workPreference' && filterKeyName !== 'all') {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName.filter(v => v !== 'parttime'))}`;
        return;
      }
      if (filterKey === 'location') {
        filterKeyName = filterKeyName.map(selected => selected.replace('\n', '').trim());
        if (filterKeyName[0] === 'all') {
          return;
        }
      }
      if (MULTI_SELECT_KEYS.includes(filterKey)) {
        filterKeyName = filterKeyName.map(v => v.value);
      }
      if (filterKeyName !== 'all' && filterKeyName) {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName)}`;
      }
    });
    // sorting
    requestURL += defaultSortUrl(currentSort.value);

    // skillsFilter
    requestURL += skillsUrl(skillsArray);

    request(requestURL, data)
      .then(this.setTalentDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentDetails = response => {
    if (get(response, 'status')) {
      getSkills(this.setSkills);
      getIndustryList(this.setIndustries);
      getCertificationsList(this.setCertifications);
      getCompanyCultures(this.setCompanyCultures);
      this.setState({
        talentList: response.data.docs,
        paginationData: response.data,
        loading: false,
        totalTalents: response.data.totalDocs,
      });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  handleCheckboxFilterChange = (name, checked, type, directUpdate) => {
    const { modalFilter, [type]: directFilterType, showFiltersModal } = this.state;
    const filterType = directUpdate ? directFilterType : modalFilter[type];
    let newFilter = Array.from(filterType);
    const updatedState = { modalFilter: { ...modalFilter, [type]: newFilter } };
    if (checked) {
      if (name === 'all') {
        newFilter = ['all'];
      } else {
        newFilter.push(name);
        newFilter = newFilter.filter(value => value !== 'all');
      }
    } else {
      newFilter = newFilter.filter(value => value !== name);
      if (!newFilter.length) {
        newFilter.push('all');
      }
    }
    if (!showFiltersModal) {
      updatedState[type] = newFilter;
    } else {
      updatedState.modalFilter[type] = newFilter;
    }
    this.setState(updatedState, () => {
      if (!showFiltersModal) {
        this.loadTalentProfiles(DEFAULT_PAGE_NO);
      }
    });
    if (!showFiltersModal) {
      this.storeSelectedFilterValue(type, newFilter);
    }
  };

  storeSelectedFilterValue = (keyName, KeyValue) => {
    const filterObjectGet = StorageService.get('filterObject');
    const filterObject = JSON.parse(filterObjectGet) || {};
    filterObject[keyName] = KeyValue;
    if (keyName === 'language') {
      const { languageSearch } = this.state;
      filterObject.languageSearch = languageSearch;
    }
    if (keyName === 'location') {
      const { countrySearch } = this.state;
      filterObject.countrySearch = countrySearch;
    }
    StorageService.set('filterObject', JSON.stringify(filterObject));
  };

  setReservedFilter = pageNumber => {
    const filterObjectGet = StorageService.get('filterObject');
    if (filterObjectGet) {
      const filterObject = JSON.parse(filterObjectGet) || {};
      const role = get(filterObject, 'role', 'all');
      const yearsOfExperience = get(filterObject, 'yearsOfExperience', 'all');
      const teamPreference = get(filterObject, 'teamPreference', 'all');
      const workPreference = get(filterObject, 'workPreference', 'all');
      const assignment = get(filterObject, 'assignment', 'all');
      const availability = get(filterObject, 'availability', 'all');
      const degreeLevel = get(filterObject, 'degreeLevel', 'all');
      const language = get(filterObject, 'language', ['all']);
      const languageSearch = get(filterObject, 'languageSearch', languageDefaultData);
      const location = get(filterObject, 'location', ['all']);
      const countrySearch = get(filterObject, 'countrySearch', countryDefaultData);
      const skillsArray = get(filterObject, 'skillsArray', []);
      this.setState(
        {
          role,
          yearsOfExperience,
          teamPreference,
          workPreference,
          assignment,
          availability,
          degreeLevel,
          language,
          languageSearch,
          location,
          countrySearch,
          skillsArray,
        },
        () => {
          this.loadTalentProfiles(pageNumber);
        },
      );
    }
  };

  handleFilterChange = (event, directFilter) => {
    const eventKey = event.target.name;
    const eventValue = event.target.value;
    if (directFilter) {
      // For Role
      this.setState(
        {
          [eventKey]: eventValue,
        },
        () => {
          gtm({
            action: 'Button Click',
            event: 'custom_codemonk_event',
            label: 'filter_change',
            category: 'Client Portal',
            filterName: eventKey,
            filterValue: eventValue,
            value: 1,
          });
          this.loadTalentProfiles(DEFAULT_PAGE_NO);
        },
      );
      this.storeSelectedFilterValue(eventKey, eventValue);
    } else {
      const { modalFilter } = this.state;
      this.setState({ modalFilter: { ...modalFilter, [eventKey]: eventValue } });
    }
  };

  resetFilter = (all, filterKey) => {
    const update = {};
    let updateModalFilter = {};
    const { modalFilter } = this.state;
    const { dispatch } = this.props;
    const languageSearch = [
      {
        label: 'All',
        value: 'all',
        isChecked: true,
      },
    ];

    const countrySearch = [
      {
        label: 'All',
        value: 'all',
        isChecked: true,
      },
    ];
    if (all) {
      updateModalFilter = initialValues;
      FILTER_KEYS.forEach(keyName => {
        const { [keyName]: filterKeyName } = this.state;
        if (MULTI_SELECT_KEYS.includes(keyName)) {
          update[keyName] = [];
          updateModalFilter[keyName] = [];

          dispatch(change(key, keyName === 'skillsArray' ? 'talentSkills' : keyName, []));
        } else if (Array.isArray(filterKeyName)) {
          update[keyName] = ['all'];
        } else {
          update[keyName] = 'all';
        }
      });
      this.setState({ languageSearch, countrySearch });
      StorageService.delete('filterObject');
    } else {
      const filterObjectGet = StorageService.get('filterObject');
      if (filterObjectGet) {
        const filterObject = JSON.parse(filterObjectGet) || {};
        if (Array.isArray(filterObject[filterKey])) {
          filterObject[filterKey] = ['all'];
          update[filterKey] = ['all'];
          updateModalFilter[filterKey] = ['all'];
          if (filterKey === 'language') {
            this.setState({ languageSearch });
          }
          if (filterKey === 'location') {
            this.setState({ countrySearch });
          }
        } else {
          updateModalFilter[filterKey] = 'all';
          filterObject[filterKey] = 'all';
          update[filterKey] = 'all';
        }
        StorageService.set('filterObject', JSON.stringify(filterObject));
      }
    }
    this.setState({ ...update, modalFilter: { ...modalFilter, ...updateModalFilter } }, () => {
      this.loadTalentProfiles(DEFAULT_PAGE_NO);
    });
  };

  searchSkillsValueChanged = (data, clearFilter) => {
    const { value } = data;
    const { skillsArray = [] } = this.state;
    const newSkillsArray = clearFilter ? skillsArray.filter(i => i.value !== value) : [value].concat(skillsArray);
    this.handleMultiSelectChange(newSkillsArray, () => this.loadTalentProfiles(DEFAULT_PAGE_NO), false, 'skillsArray', 'talentSkills');
    this.storeSelectedFilterValue('skillsArray', newSkillsArray.map(val => val));
  };

  languageValueChanged = data => {
    const { name, value } = data;
    const { [name]: stateName, languageList } = this.state;
    const selectedLangList = stateName;
    selectedLangList.push(value);
    const selectedLangValue = languageList.findIndex(obj => obj === value.value);
    const updatedLanguageList = languageList.filter((_, index) => index !== selectedLangValue);
    this.setState({ [name]: selectedLangList, languageList: updatedLanguageList }, () => {
      this.handleCheckboxFilterChange(data.value.value, true, 'language');
    });
  };

  countryValueChanged = data => {
    const { name, value } = data;
    const { [name]: stateName, countryList } = this.state;
    const selectedLangList = stateName;
    selectedLangList.push(value);
    const selectedCountryValue = countryList.findIndex(obj => obj === value.value);
    const updatedCountryList = countryList.filter((_, index) => index !== selectedCountryValue);
    this.setState({ [name]: selectedLangList, countryList: updatedCountryList }, () => {
      this.handleCheckboxFilterChange(data.value.value, true, 'location');
    });
  };

  getFilterLabel = (filterKey, value) => {
    let selectedTeamPrefrence;
    let selectedWorkPreference;
    let selectedAvailability;
    let selectedAssignment;
    let selectedYearsofExp;
    switch (filterKey) {
      case 'workPreference':
        selectedWorkPreference = partTimeArray
          .concat([
            {
              value: 'fulltime',
              label: 'Full time',
            },
          ])
          .find(e => e.value === value);
        return (selectedWorkPreference && selectedWorkPreference.label) || value;
      case 'teamPreference':
        selectedTeamPrefrence = teamPreferenceArray.find(e => e.value === value);
        return (selectedTeamPrefrence && selectedTeamPrefrence.label) || value;
      case 'availability':
        selectedAvailability = availabilityArray.find(e => e.value === value);
        return (selectedAvailability.label === 'Yes' ? 'Available' : 'Not Available') || value;
      case 'assignment':
        selectedAssignment = assignmentArray.find(e => e.value === value);
        return (selectedAssignment && selectedAssignment.label) || value;
      case 'yearsOfExperience':
        selectedYearsofExp = expInPrimaryRoleArray.find(e => e.value === value);
        return (selectedYearsofExp && selectedYearsofExp.label) || value;
      default:
        return value;
    }
  };

  filterChanged = type => {
    const { modalFilter } = this.state;
    const { dispatch } = this.props;
    const oldState = JSON.parse(JSON.stringify(this.state));

    if (type === 'update') {
      this.setState({ showFiltersModal: false, ...modalFilter, tempModalFilter: modalFilter }, () => {
        this.loadTalentProfiles(DEFAULT_PAGE_NO);
      });
      Object.keys(modalFilter).forEach(eventKey => {
        const value = modalFilter[eventKey];
        this.storeSelectedFilterValue(eventKey, value);
        const hasValueChanged = value !== oldState[eventKey];
        const defaultValue = Array.isArray(value) ? value[0] === 'all' : value === 'all';
        if (hasValueChanged && !defaultValue) {
          gtm({
            action: 'Button Click',
            event: 'custom_codemonk_event',
            label: 'filter_change',
            category: 'Client Portal',
            filterName: eventKey,
            filterValue: value,
            value: 1,
          });
        }
      });
    } else if (type === 'clear') {
      this.setState(
        { modalFilter: { ...initialValues }, ...initialValues, tempModalFilter: initialValues, showFiltersModal: false },
        () => {
          FILTER_KEYS.forEach(keyName => {
            if (MULTI_SELECT_KEYS.includes(keyName)) {
              dispatch(change(key, keyName === 'skillsArray' ? 'talentSkills' : keyName, []));
            }
          });
        },
      );
    }
  };

  handleFiltersOpenModal = () => {
    const { modalFilter } = this.state;
    this.setState({ showFiltersModal: true, tempModalFilter: modalFilter });
  };

  handleFiltersCloseModal = () => {
    const { tempModalFilter } = this.state;
    this.setState({ showFiltersModal: false, tempModalFilter: {}, modalFilter: tempModalFilter });
  };

  toggleDropdown = (flag, dropdownKey) => {
    this.setState({ [dropdownKey]: flag });
  };

  handleSortChange = sort => {
    const { value } = sort;
    StorageService.set('clientTalentSort', JSON.stringify(value));
    this.setState({ currentSort: sort }, () => {
      this.loadTalentProfiles(1);
    });
  };

  handleMultiSelectChange = (e, cb, isModel, name, dispatchName) => {
    const skillsVal = e || [];
    const { dispatch } = this.props;
    const { modalFilter } = this.state;
    if (isModel) {
      this.setState({ modalFilter: { ...modalFilter, [name]: skillsVal } });
    } else {
      this.setState({ [name]: skillsVal }, () => {
        if (typeof cb === 'function') {
          cb();
        }
      });
    }
    dispatch(change(key, dispatchName, skillsVal));
  };

  renderTalentCards = talentList => (
    <React.Fragment>
      {talentList.length === 0 ? (
        <Col>
          <p className="text-center p-5 m-0">{messages.noResultText.defaultMessage}</p>
        </Col>
      ) : (
        <React.Fragment>
          {talentList.map(talent => (
            <Col lg={3} md={6} className="d-flex flex-column">
              <TalentCardComponent talentData={talent} />
            </Col>
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );

  renderPopup = () => {
    const {
      languageSearch,
      languageList,
      countrySearch,
      countryList,
      showFiltersModal,
      modalFilter,
      skillsList,
      certificationsList,
      companyCulturesList,
      industryList,
    } = this.state;
    const { handleSubmit, responseSuccess, responseError, invalid } = this.props;

    return (
      <PopupWrapper
        modalId="showFiltersModal"
        responseSuccess={responseSuccess}
        responseError={responseError}
        disabled={invalid}
        isOpen={showFiltersModal}
        modalType="filter"
        otherActions
        onDiscard={this.handleFiltersCloseModal}
        onHandleSubmit={handleSubmit(() => {
          this.filterChanged('update');
        })}
        onHandleClearFilter={() => {
          this.filterChanged('clear');
        }}
        title={containerMessage.textFilter.defaultMessage}
      >
        <Row>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{userProfileMessage.labelIndustry.defaultMessage}</H4>
            <FormGroup className="input-sm">
              <Field
                isMulti
                name="industry"
                component={renderSelectTags}
                value={modalFilter.industry}
                options={industryList.map(item => ({
                  label: item,
                  value: item,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                onChange={e => this.handleMultiSelectChange(e, null, true, 'industry', 'industry')}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.labelDISCProfile.defaultMessage}</H4>
            <FormGroup className="input-sm">
              <Field
                isMulti
                name="discProfile"
                component={renderSelectTags}
                value={modalFilter.discProfile}
                options={discProfileArray.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                onChange={e => this.handleMultiSelectChange(e, null, true, 'discProfile', 'discProfile')}
              />
            </FormGroup>
          </Col>

          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">Values</H4>
            <FormGroup className="input-sm">
              <Field
                isMulti
                name="companyCultures"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={modalFilter.companyCultures}
                options={companyCulturesList.map(item => ({
                  label: item,
                  value: item,
                }))}
                onChange={e => this.handleMultiSelectChange(e, null, true, 'companyCultures', 'companyCultures')}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.labelCertifications.defaultMessage}</H4>
            <FormGroup className="input-sm">
              <Field
                isMulti
                name="certification"
                component={renderSelectTags}
                value={modalFilter.certification}
                options={certificationsList.map(item => ({
                  label: item,
                  value: item,
                }))}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                onChange={e => this.handleMultiSelectChange(e, null, true, 'certification', 'certification')}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.labelTeamWorking.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {teamWorkingList.map(item => (
                <Field
                  component={RadioButton}
                  name="teamWorking"
                  defaultValue={item.value}
                  value={item.value}
                  label={item.label}
                  className="radio-sm"
                  checked={modalFilter.teamWorking === item.value}
                  onChangeRadio={e => this.handleFilterChange(e)}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.titleAvailability.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {availabilityArray.map(item => (
                <Field
                  component={RadioButton}
                  name="availability"
                  defaultValue={item.value}
                  value={item.value}
                  label={item.label}
                  className="radio-sm"
                  checked={modalFilter.availability === item.value}
                  onChangeRadio={e => this.handleFilterChange(e)}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.subHeadingTeam.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {teamPreferenceArray.map(item => (
                <Field
                  type="checkbox"
                  name={item.value}
                  component={renderCheckBox}
                  label={item.label}
                  onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'teamPreference')}
                  checked={modalFilter.teamPreference.includes(item.value)}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.subHeadingAssignment.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {assignmentArray.map(item => (
                <Field
                  type="checkbox"
                  name={item.value}
                  component={renderCheckBox}
                  label={item.label}
                  onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'assignment')}
                  checked={modalFilter.assignment.includes(item.value)}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.labelWorkSchedule.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {projectPreference.map(item => (
                <Field
                  type="checkbox"
                  name={item.value}
                  component={renderCheckBox}
                  label={item.label}
                  checked={modalFilter.workPreference.includes(item.value)}
                  onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'workPreference')}
                />
              ))}
              {modalFilter.workPreference.some(value => value.includes('parttime')) && (
                <PartTimeProjectFormWrapper>
                  {partTimeArray.map(item => (
                    <Field
                      type="checkbox"
                      name={item.value}
                      component={renderCheckBox}
                      label={item.label}
                      onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'workPreference')}
                      checked={modalFilter.workPreference.includes(item.value)}
                    />
                  ))}
                </PartTimeProjectFormWrapper>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{messages.titleEducationLevel.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {educationLevelArray.map(item => (
                <Field
                  name={item.value}
                  type="checkbox"
                  component={renderCheckBox}
                  label={item.label}
                  checked={modalFilter.degreeLevel.includes(item.value)}
                  onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'degreeLevel')}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{messages.titleLocation.defaultMessage}</H4>
            <FormGroup className="input-sm">
              <Autocomplete
                customClass="skill-search"
                options={countryList}
                label="Search Country"
                filterType="countrySearch"
                placeholder={messages.placeholderSearch.defaultMessage}
                valueChanged={this.countryValueChanged}
              />
              <div className="input-sm mt-3">
                {countrySearch.map(item => (
                  <Field
                    type="checkbox"
                    name={item.value}
                    component={renderCheckBox}
                    label={item.label}
                    checked={modalFilter.location.includes(item.value)}
                    onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'location')}
                  />
                ))}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{messages.titleLanguages.defaultMessage}</H4>
            <FormGroup className="input-sm">
              <Autocomplete
                customClass="skill-search"
                options={languageList}
                label="Search Language"
                filterType="languageSearch"
                placeholder={messages.placeholderSearch.defaultMessage}
                valueChanged={this.languageValueChanged}
              />
              <div className="input-sm mt-3">
                {languageSearch.map(item => (
                  <Field
                    type="checkbox"
                    name={item.value}
                    component={renderCheckBox}
                    label={item.label}
                    checked={modalFilter.language.includes(item.value)}
                    onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'language')}
                  />
                ))}
              </div>
            </FormGroup>
          </Col>
          <Col md="6" key={new Date().getTime()}>
            <H4 className="input-sm mt-0 mb-3">{containerMessage.subProjectSkills.defaultMessage}</H4>
            <FormGroup className="input-sm">
              <Field
                name="talentSkills"
                component={renderSelectTags}
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={modalFilter.skillsArray}
                options={skillsList.map((v, i) => ({ label: skillsList[i], value: skillsList[i] }))}
                isMulti
                onChange={e => this.handleMultiSelectChange(e, null, true, 'skillsArray', 'talentSkills')}
              />
            </FormGroup>
          </Col>
        </Row>
      </PopupWrapper>
    );
  };

  render() {
    const {
      talentList,
      paginationData,
      role,
      yearsOfExperience,
      loading,
      docLimit,
      dropdownOpen,
      experienceDropdownOpen,
      currentSort,
      totalTalents,
    } = this.state;

    const activeFilters = FILTER_KEYS.filter(filterKey => {
      // filter out role and years of experience
      if (Array.isArray(this.state[filterKey])) {
        return this.state[filterKey].filter(subKey => subKey !== 'all').length > 0;
      }
      return this.state[filterKey] !== 'all';
    });

    return (
      <React.Fragment>
        <Helmet>
          <title>{messages.title.defaultMessage}</title>
          <meta name="description" content={messages.metaTitle.defaultMessage} />
        </Helmet>

        <Content>
          <PrivateGrid>
            <div className="d-flex align-items-center mb-4">
              <H3>All CodeMonk talents</H3>
              <Badge className="badge-sm primary ms-2">
                <CountUp duration={1} end={totalTalents} />
              </Badge>
            </div>
            <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-3">
              <FiltersContainer className="d-flex order-1 order-md-0 flex-column flex-md-row">
                <ListingFilter
                  onFocus={() => {}}
                  onMouseOver={() => this.toggleDropdown(true, 'dropdownOpen')}
                  onMouseLeave={() => this.toggleDropdown(false, 'dropdownOpen')}
                  isOpen={dropdownOpen}
                  toggle={() => this.toggleDropdown(!dropdownOpen, 'dropdownOpen')}
                >
                  <DropdownToggle className={Array.isArray(role) && !role.includes('all') && role.length > 0 ? 'active-filter' : ''}>
                    Primary Role <SVG src={leftArrowIcon} />
                  </DropdownToggle>
                  <DropdownMenu left className="input-sm">
                    {primaryRoleArray.map(item => (
                      <div className="dropdown-item">
                        <Field
                          name={item.value}
                          type="checkbox"
                          component={renderCheckBox}
                          label={item.name}
                          checked={role.includes(item.value)}
                          onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'role', true)}
                        />
                      </div>
                    ))}
                  </DropdownMenu>
                </ListingFilter>
                <ListingFilter
                  onFocus={() => {}}
                  onMouseOver={() => this.toggleDropdown(true, 'experienceDropdownOpen')}
                  onMouseLeave={() => this.toggleDropdown(false, 'experienceDropdownOpen')}
                  isOpen={experienceDropdownOpen}
                  toggle={() => this.toggleDropdown(!dropdownOpen, 'experienceDropdownOpen')}
                >
                  <DropdownToggle
                    className={
                      Array.isArray(yearsOfExperience) && !yearsOfExperience.includes('all') && yearsOfExperience.length > 0
                        ? 'active-filter'
                        : ''
                    }
                  >
                    Seniority <SVG src={leftArrowIcon} />
                  </DropdownToggle>
                  <DropdownMenu left className="input-sm">
                    {expInPrimaryRoleArray.map(item => (
                      <div className="dropdown-item">
                        <Field
                          name={item.value}
                          type="checkbox"
                          component={renderCheckBox}
                          label={item.label}
                          checked={yearsOfExperience.includes(item.value)}
                          onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'yearsOfExperience', true)}
                        />
                      </div>
                    ))}
                  </DropdownMenu>
                </ListingFilter>
                <FilterButton type="button" className="m-0 opacity-100" onClick={this.handleFiltersOpenModal}>
                  <SVG src={filterIcon} /> All filters
                </FilterButton>
              </FiltersContainer>
              <FilterAction className="d-flex">
                <SortSection className="ms-3">
                  <div className="sort-label">
                    <H6 lineHeight="21">{containerMessage.sortBy.defaultMessage}:</H6>
                  </div>
                  <SortComponent showSortIcon sortArray={sortArray} currentSort={currentSort} handleSortChange={this.handleSortChange} />
                </SortSection>
              </FilterAction>
            </div>

            {activeFilters.length > 0 && (
              <FilterBlock>
                <FilterList>
                  {activeFilters.map(filterKey => {
                    const { [filterKey]: KeyName } = this.state;
                    let output = null;

                    if (Array.isArray(this.state[filterKey])) {
                      output = (
                        <React.Fragment>
                          {this.state[filterKey]
                            .filter(subKey => subKey !== 'all' && subKey !== 'parttime')
                            .map(subKey => {
                              let innerValue = subKey;
                              if (subKey && subKey.value) {
                                innerValue = subKey.value;
                              }
                              return (
                                <li key={innerValue}>
                                  {this.getFilterLabel(filterKey, innerValue)}
                                  <button
                                    className="close-btn"
                                    type="button"
                                    onClick={() =>
                                      filterKey === 'skillsArray'
                                        ? this.searchSkillsValueChanged(subKey, true)
                                        : this.handleCheckboxFilterChange(innerValue, false, filterKey, true)
                                    }
                                  >
                                    <img src={closeIcon} alt="close" />
                                  </button>
                                </li>
                              );
                            })}
                        </React.Fragment>
                      );
                    } else {
                      output = (
                        <li key={filterKey}>
                          {this.getFilterLabel(filterKey, KeyName)}
                          <button className="close-btn" type="button" onClick={e => this.resetFilter(false, filterKey, e)}>
                            <img src={closeIcon} alt="close" />
                          </button>
                        </li>
                      );
                    }
                    return output;
                  })}
                  {activeFilters.length > 0 && (
                    <li>
                      <button className="clear-btn" type="button" onClick={e => this.resetFilter(true, e)}>
                        {messages.btnClearAll.defaultMessage}
                      </button>
                    </li>
                  )}
                </FilterList>
              </FilterBlock>
            )}
            <Row>{loading ? loadingListing() : this.renderTalentCards(talentList)}</Row>
            {paginationData.totalDocs > 10 ? (
              <Pagination
                total={paginationData.totalDocs}
                className="ant-pagination mt-0"
                current={paginationData.page}
                defaultPageSize={docLimit}
                onChange={this.loadTalentProfiles}
                itemRender={textItemRender}
                locale={localeInfo}
              />
            ) : (
              ''
            )}
          </PrivateGrid>
        </Content>
        {this.renderPopup()}
      </React.Fragment>
    );
  }
}

TalentListingPage.propTypes = propTypes;
export default compose(
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(TalentListingPage);
