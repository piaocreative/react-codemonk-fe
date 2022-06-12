/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/** Talents Page
 * This is the Projects page for admin, at the '/admin/talents' route
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Range } from 'rc-slider';
import { reduxForm, Field, change } from 'redux-form/immutable';
import { compose } from 'redux';
import moment from 'moment';
import { FormGroup, Row, Col, DropdownMenu, DropdownToggle } from 'reactstrap';
import SVG from 'react-inlinesvg';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import DataTable from 'react-data-table-component';
import StorageService from 'utils/StorageService';
import Pagination from 'rc-pagination';
import { toast } from 'react-toastify';
import Selects from 'components/Selects';
import { TableSkeletonCol3 } from 'components/SkeletonLoader';
import Content from 'components/Content';
import { ToastifyMessage, H4, Card, Button, PrivateGrid, P, SVGIcon } from 'components';
import { RadioButton, renderSelectTags, renderCheckBox } from 'utils/Fields';
import debounce from 'lodash/debounce';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import containerMessage from 'containers/messages';
import { talentProfileRedirect } from 'containers/App/utils';
import { getSkills, getIndustryList, getCertificationsList, getCompanyCultures } from 'containers/Auth/utils';
import {
  LOG,
  API_URL,
  TALENT,
  LIST,
  customStyles,
  filterIcon,
  partTimeArray,
  languageData,
  countryData,
  discProfileArray,
  leftArrowIcon,
  closeIcon,
  historyIcon,
} from 'containers/App/constants';
import { skillsUrl, searchUrl, textItemRender } from 'containers/TalentListingPage/utils';
import {
  localeInfo,
  primaryRoleArray,
  expInPrimaryRoleArray,
  teamPreferenceArray,
  assignmentArray,
  educationLevelArray,
  availabilityArray,
  projectPreference,
  languageDefaultData,
  countryDefaultData,
  teamWorkingList,
  MULTI_SELECT_KEYS,
} from 'containers/TalentListingPage/constants';
import { PartTimeProjectFormWrapper } from 'containers/Auth/Preferences/preferences-styles';
import Autocomplete from 'containers/TalentListingPage/AutoComplete';
import { FilterButton } from 'containers/Talent/Briefs/styles';
import PopupWrapper from 'containers/MyProfilePage/PopupWrapper';
import ModalWrapper from 'components/ModalWrapper';
import SearchComponent from 'components/SearchComponent';
import { propTypes } from 'containers/proptypes';
import { SelectBox } from 'containers/Admin/Projects/styles';
import { FilterList, FilterBlock, ListingFilter } from 'containers/TalentListingPage/styles';
import TalentNameButton from 'components/TalentNameButton';
import userProfileMessage from 'components/UserProfileComponents/messages';
import SwitchComponent from 'components/Switch';
import { primaryNew } from 'themes/variables';
import {
  talentStatusArray,
  key,
  columns,
  DEFAULT_PAGE_NO,
  FILTER_KEYS,
  initialValues,
  talentTypeArray,
  clientStatusArray,
  LinearIndeterminate,
  defaultDayRateValue,
  maxDateRateValue,
  minDateRateValue,
} from './constants';
import { getAdminTalentFilterCount, handle } from './utils';
import * as actions from './actions';
import saga from './saga';
import messages from './messages';
import 'rc-pagination/assets/index.css';
import CardComponent from './CardComponent';
import 'rc-slider/assets/index.css';

export class Talents extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    const talentFilterObject = StorageService.get('talentFilterObject');
    const storedFilter = JSON.parse(talentFilterObject) || {};
    const updatedFilter = isEmpty(storedFilter)
      ? {
          status: -1,
        }
      : storedFilter;
    const search = StorageService.get('adminTalentSearch') || '';
    this.state = {
      dataLimit: 30,
      talentList: [],
      cardList: [],
      paginationData: [],
      isListLoading: false,
      showFiltersModal: false,
      showLogsModal: false,
      search,
      pageNum: DEFAULT_PAGE_NO,
      filters: updatedFilter,
      languageSearch: languageDefaultData,
      countrySearch: countryDefaultData,
      ...initialValues,
      modalFilter: { ...initialValues },
      languageList: languageData.map(item => item.value),
      countryList: countryData.map(item => item.value),
      filterCount: 0,
      cardView: props.switchComponentChecked,
      skillsList: [],
      industryList: [],
      certificationsList: [],
      companyCulturesList: [],
      dropdownOpen: false,
      experienceDropdownOpen: false,
      statusDropdownOpen: false,
      typeDropdownOpen: false,
      dayRateDropdownOpen: false,
      dayRate: defaultDayRateValue,
      skillsArray: [],
      talentLogs: [],
      logsLoading: true,
      talentFirstName: '',
    };
    dispatch(change(key, 'talentSkills', get(updatedFilter, 'skillsArray', [])));
  }

  /**
   * call on open handleFiltersOpenModal popup
   * @author Innovify
   */
  handleFiltersOpenModal = () => {
    const { modalFilter } = this.state;
    this.setState({ showFiltersModal: true, tempModalFilter: modalFilter });
  };

  /**
   * call on open handleLogsOpenModal popup
   * @author Innovify
   */
  handleLogsOpenModal = (id, talentFirstName) => {
    this.loadTalentLogs(id);
    this.setState({ showLogsModal: true, talentFirstName });
  };

  /** call on open handleFiltersCloseModal popup
   * @author Innovify
   */
  handleFiltersCloseModal = () => {
    const { tempModalFilter } = this.state;
    this.setState({ showFiltersModal: false, tempModalFilter: {}, modalFilter: tempModalFilter });
  };

  /** call on open handleLogsCloseModal popup
   * @author Innovify
   */
  handleLogsCloseModal = () => {
    this.setState({ showLogsModal: false, talentLogs: [] });
  };

  handleCheck = () => {
    const { cardView } = this.state;
    this.setState({ cardView: !cardView });
    this.props.onSwitchComponentChange(!cardView);
  };

  componentDidMount() {
    const getPageNumber = StorageService.get('talentPageNumber');
    const filterObjectGet = StorageService.get('talentFilterObject');
    const updatedPageNumber = JSON.parse(getPageNumber) || 1;
    if (filterObjectGet) {
      this.setReservedFilter(updatedPageNumber);
    } else {
      this.loadTalentsDetails(updatedPageNumber);
    }
  }

  componentDidUpdate(prevProps) {
    const { popUpSaga } = this.props;
    if (prevProps.popUpSaga === true && popUpSaga === false) {
      this.loadTalentsDetails(DEFAULT_PAGE_NO);
    }
  }

  setReservedFilter = pageNumber => {
    const filterObjectGet = StorageService.get('talentFilterObject');
    if (filterObjectGet) {
      const talentFilterObject = JSON.parse(filterObjectGet) || {};
      const role = get(talentFilterObject, 'role', ['all']);
      const status = get(talentFilterObject, 'status', 'all');
      const type = get(talentFilterObject, 'type', 'all');
      const yearsOfExperience = get(talentFilterObject, 'yearsOfExperience', ['all']);
      const teamPreference = get(talentFilterObject, 'teamPreference', ['all']);
      const workPreference = get(talentFilterObject, 'workPreference', ['all']);
      const assignment = get(talentFilterObject, 'assignment', ['all']);
      const teamWorking = get(talentFilterObject, 'teamWorking', ['all']);
      const availability = get(talentFilterObject, 'availability', 'all');
      const degreeLevel = get(talentFilterObject, 'degreeLevel', ['all']);
      const language = get(talentFilterObject, 'language', ['all']);
      const languageSearch = get(talentFilterObject, 'languageSearch', languageDefaultData);
      const location = get(talentFilterObject, 'location', ['all']);
      const countrySearch = get(talentFilterObject, 'countrySearch', countryDefaultData);
      const filterCount = getAdminTalentFilterCount(talentFilterObject);
      const skillsArray = get(talentFilterObject, 'skillsArray', []);
      const industry = get(talentFilterObject, 'industry', []);
      const discProfile = get(talentFilterObject, 'discProfile', []);
      const companyCultures = get(talentFilterObject, 'companyCultures', []);
      const certification = get(talentFilterObject, 'certification', []);
      this.setState(
        {
          modalFilter: {
            role,
            status,
            type,
            yearsOfExperience,
            teamPreference,
            workPreference,
            teamWorking,
            assignment,
            availability,
            degreeLevel,
            language,
            languageSearch,
            location,
            countrySearch,
            skillsArray,
            industry,
            discProfile,
            companyCultures,
            certification,
          },
          filterCount,
          role,
          status,
          type,
          yearsOfExperience,
          teamPreference,
          workPreference,
          assignment,
          teamWorking,
          availability,
          degreeLevel,
          language,
          languageSearch,
          location,
          countrySearch,
          skillsArray,
          industry,
          discProfile,
          companyCultures,
          certification,
        },
        () => {
          this.loadTalentsDetails(pageNumber);
        },
      );
    }
  };

  handleSearchChange = value => {
    StorageService.set('adminTalentSearch', value);
    const { pageNum } = this.state;
    this.setState({ search: value }, () => {
      this.loadTalentsDetails(pageNum);
    });
  };

  debounceFn = debounce(value => this.handleSearchChange(value), 500);

  handleFilterChange = (event, directFilter) => {
    const eventKey = event.target.name;
    const eventValue = event.target.value;
    if (directFilter) {
      // For Role
      this.setState({ [eventKey]: eventValue }, () => {
        this.loadTalentsDetails(DEFAULT_PAGE_NO);
      });
      this.storeSelectedFilterValue(eventKey, eventValue);
    } else {
      const { modalFilter } = this.state;
      this.setState({ modalFilter: { ...modalFilter, [eventKey]: eventValue } });
    }
  };

  loadTalentLogs = id => {
    const data = { method: 'GET' };
    const requestURL = `${API_URL}${TALENT}${LOG}/${id}`;
    request(requestURL, data)
      .then(this.setTalentLogs)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentLogs = response => {
    if (get(response, 'status')) {
      this.setState({ talentLogs: response.data, logsLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  loadTalentsDetails = pageNum => {
    StorageService.set('talentPageNumber', JSON.stringify(pageNum));
    this.setState({ isListLoading: true });
    const data = { method: 'GET' };
    const { search, dataLimit } = this.state;
    let requestURL = `${API_URL}${TALENT}${LIST}?page=${pageNum}&limit=${dataLimit}`;
    requestURL += searchUrl(search);
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
      if (filterKey === 'location') {
        filterKeyName = filterKeyName.map(selected => selected.replace('\n', '').trim());
        if (filterKeyName[0] === 'all') {
          return;
        }
      }
      if (filterKey === 'workPreference' && filterKeyName !== 'all') {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName.filter(v => v !== 'parttime'))}`;
        return;
      }
      if (filterKey === 'skillsArray') {
        requestURL += skillsUrl(filterKeyName);
        return;
      }
      if (MULTI_SELECT_KEYS.includes(filterKey)) {
        filterKeyName = filterKeyName.map(v => v.value);
      }
      if (filterKey === 'dayRate' && !filterKeyName.every(e => defaultDayRateValue.includes(e))) {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName)}`;
        return;
      }
      if (filterKeyName !== 'all' && filterKey !== 'dayRate' && filterKeyName !== -1 && filterKeyName) {
        requestURL += `&${filterKey}=${encodeURIComponent(filterKeyName)}`;
      }
    });
    request(requestURL, data)
      .then(this.setTalentsDetails)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setTalentsDetails = response => {
    if (get(response, 'status')) {
      const { history } = this.props;
      const data = Object.assign({}, response.data);
      const array = [];
      const cardArray = [];
      const temp = response.data.page * response.data.limit - (response.data.limit - 1);
      getSkills(this.setSkills);
      getIndustryList(this.setIndustries);
      getCertificationsList(this.setCertifications);
      getCompanyCultures(this.setCompanyCultures);
      data.docs.forEach((listData, index) => {
        const statusVal = talentStatusArray.find(obj => obj.label === listData.status).value;
        const talentId = get(listData, '_id');
        const talentType = get(listData, 'registerType', '');
        const talentName = get(listData, 'name');
        const talentUserId = get(listData, 'talentUserId');
        const talentFirstName = get(listData, 'firstName');
        const profilePicture = get(listData, 'profilePicture', '');
        const btnProps = {
          redirectTo: '/admin/talent-profile/',
          talentId,
          redirectType: 'adminTalentList',
          talentName,
          extra: {},
          profilePicture,
        };
        const name = <TalentNameButton {...btnProps} />;
        array.push({
          id: talentId,
          logs: (
            <Button
              type="button"
              className="btn-link text-underline"
              onClick={() => this.handleLogsOpenModal(talentUserId, talentFirstName)}
            >
              <SVGIcon src={historyIcon} iconColor={`rgb(${primaryNew})`} />
            </Button>
          ),
          number: temp + index,
          name,
          email: <div title={listData.email}>{listData.email}</div>,
          phoneNumber: listData.phoneNumber,
          type: startCase(talentType),
          action: (
            <Button
              type="button"
              className="btn-link text-underline"
              onClick={() => talentProfileRedirect(history, '/admin/talent-profile/', talentId, 'adminTalentList')}
            >
              {messages.btnView.defaultMessage}
            </Button>
          ),
          status: this.talentStatusSelectBox(listData, statusVal),
        });
        cardArray.push(listData);
      });
      this.setState({ talentList: array, cardList: cardArray, paginationData: response.data, isListLoading: false });
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

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

  handleChangeStatus = (talentID, selectedVal) => {
    const { onChangeStatus } = this.props;
    const data = { talentId: talentID, status: selectedVal.value };
    onChangeStatus(data);
  };

  talentStatusSelectBox = (listData, statusVal) => (
    <SelectBox className="input-sm small-arrow">
      <Field
        name="status"
        type="text"
        component={Selects}
        defaultValue={{ label: listData.status, value: statusVal }}
        searchable={false}
        options={talentStatusArray
          .filter(item => item.value !== -1)
          .map(item => ({
            label: `${item.label}`,
            value: item.value,
          }))}
        onChange={e => this.handleChangeStatus(listData.talentUserId, e)}
      />
    </SelectBox>
  );

  handleMultiSelectChange = (e, cb, isModel, name, dispatchName) => {
    const skillsVal = e || [];
    const { dispatch } = this.props;
    const { modalFilter } = this.state;
    const newFilters = modalFilter;
    if (isModel) {
      this.setState({ modalFilter: { ...newFilters, [name]: skillsVal } });
    } else {
      this.setState({ [name]: skillsVal }, () => {
        if (typeof cb === 'function') {
          cb();
        }
      });
    }
    dispatch(change(key, dispatchName, skillsVal));
  };

  handleCheckboxFilterChange = (name, checked, type, directUpdate) => {
    const { modalFilter, [type]: directFilterType, showFiltersModal } = this.state;
    const filterType = directUpdate ? directFilterType : modalFilter[type];
    let newFilter = Array.from(filterType);
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
    const updatedState = { modalFilter: { ...modalFilter, [type]: newFilter } };
    if (!showFiltersModal) {
      updatedState[type] = newFilter;
    } else {
      updatedState.modalFilter[type] = newFilter;
    }

    this.setState(updatedState, () => {
      if (!showFiltersModal) {
        this.loadTalentsDetails(DEFAULT_PAGE_NO);
      }
    });
    if (!showFiltersModal) {
      this.storeSelectedFilterValue(type, newFilter);
    }
  };

  filterChanged = filterType => {
    const { dispatch } = this.props;
    const { modalFilter, status, type, role, yearsOfExperience, dayRate } = this.state;
    if (filterType === 'update') {
      const filterCount = getAdminTalentFilterCount(modalFilter);
      this.setState({ showFiltersModal: false, ...modalFilter, tempModalFilter: modalFilter, filterCount }, () => {
        this.loadTalentsDetails(DEFAULT_PAGE_NO);
      });
      Object.keys(modalFilter).forEach(eventKey => {
        const value = modalFilter[eventKey];
        this.storeSelectedFilterValue(eventKey, value);
      });
    } else if (filterType === 'clear') {
      StorageService.set('talentFilterObject', JSON.stringify(initialValues));
      this.setState(
        {
          modalFilter: { ...initialValues },
          ...initialValues,
          tempModalFilter: initialValues,
          showFiltersModal: false,
          filterCount: 0,
          status,
          type,
          role,
          yearsOfExperience,
          dayRate,
        },
        () => {
          this.loadTalentsDetails(DEFAULT_PAGE_NO);
          FILTER_KEYS.forEach(keyName => {
            if (MULTI_SELECT_KEYS.includes(keyName)) {
              dispatch(change(key, keyName === 'skillsArray' ? 'talentSkills' : keyName, []));
            }
          });
        },
      );
    }
  };

  storeSelectedFilterValue = (keyName, KeyValue) => {
    const filterObjectGet = StorageService.get('talentFilterObject');
    const talentFilterObject = JSON.parse(filterObjectGet) || {};
    talentFilterObject[keyName] = KeyValue;
    if (keyName === 'language') {
      const { languageSearch } = this.state;
      talentFilterObject.languageSearch = languageSearch;
    }
    if (keyName === 'location') {
      const { countrySearch } = this.state;
      talentFilterObject.countrySearch = countrySearch;
    }
    StorageService.set('talentFilterObject', JSON.stringify(talentFilterObject));
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
          if (keyName === 'dayRate') {
            update[keyName] = defaultDayRateValue;
          } else {
            update[keyName] = ['all'];
          }
        } else {
          update[keyName] = 'all';
        }
      });
      this.setState({ languageSearch, countrySearch });
      StorageService.delete('talentFilterObject');
    } else {
      const filterObjectGet = StorageService.get('talentFilterObject');
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
        } else if (filterKey === 'dayRate') {
          update[filterKey] = defaultDayRateValue;
        } else {
          updateModalFilter[filterKey] = 'all';
          filterObject[filterKey] = 'all';
          update[filterKey] = 'all';
        }
        StorageService.set('talentFilterObject', JSON.stringify(filterObject));
      }
    }
    this.setState({ ...update, modalFilter: { ...modalFilter, ...updateModalFilter } }, () => {
      this.loadTalentsDetails(DEFAULT_PAGE_NO);
    });
  };

  searchSkillsValueChanged = (data, clearFilter) => {
    const { value } = data;
    const { skillsArray = [] } = this.state;
    const newSkillsArray = clearFilter ? skillsArray.filter(i => i.value !== value) : [value].concat(skillsArray);
    this.handleMultiSelectChange(newSkillsArray, () => this.loadTalentsDetails(DEFAULT_PAGE_NO), false, 'skillsArray', 'talentSkills');
    this.storeSelectedFilterValue('skillsArray', newSkillsArray.map(val => val));
  };

  languageValueChanged = data => {
    const { name, value } = data;
    const { [name]: stateName, languageList } = this.state;
    const selectedLangList = stateName;
    selectedLangList.push(value);
    const selectedLangVal = languageList.findIndex(obj => obj === value.value);
    const updatedLangList = languageList.filter((_, index) => index !== selectedLangVal);
    this.setState({ [name]: selectedLangList, languageList: updatedLangList }, () => {
      this.handleCheckboxFilterChange(data.value.value, true, 'language');
    });
  };

  countryValueChanged = data => {
    const { name, value } = data;
    const { [name]: stateName, countryList } = this.state;
    const selectedLangList = stateName;
    selectedLangList.push(value);
    const selectedCountryVal = countryList.findIndex(obj => obj === value.value);
    const updatedCountryist = countryList.filter((_, index) => index !== selectedCountryVal);
    this.setState({ [name]: selectedLangList, countryList: updatedCountryist }, () => {
      this.handleCheckboxFilterChange(data.value.value, true, 'location');
    });
  };

  toggleDropdown = (flag, dropdownKey) => {
    this.setState({ [dropdownKey]: flag });
  };

  handleDayRateChange = value => {
    this.setState({ dayRate: value }, () => {
      this.loadTalentsDetails(DEFAULT_PAGE_NO);
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

  render() {
    const { handleSubmit, loading, responseSuccess, responseError, invalid } = this.props;
    const {
      talentList,
      paginationData,
      isListLoading,
      showFiltersModal,
      dataLimit,
      dropdownOpen,
      experienceDropdownOpen,
      statusDropdownOpen,
      typeDropdownOpen,
      dayRateDropdownOpen,
      role,
      yearsOfExperience,
      status,
      type,
      dayRate,
      skillsList,
      skillsArray,
    } = this.state;

    const activeFilters = FILTER_KEYS.filter(filterKey => {
      if (filterKey === 'dayRate' && (this.state[filterKey][0] === 0 && this.state[filterKey][1] === 500)) {
        return false;
      }
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
        <PrivateGrid>
          <Content>
            <Card className="d-flex align-items-center justify-content-between table-header mb-4">
              <div className="d-flex align-items-center me-3">
                <H4 className="text-start my-0">
                  <FormattedMessage {...messages.headerTalents} />
                </H4>
              </div>
              {this.tableActions()}
            </Card>
            <div className="d-flex flex-column justify-content-between flex-lg-row mb-4">
              <Autocomplete
                customClass="skill-search order-lg-0 order-1"
                options={skillsList.filter(v => skillsArray.filter(i => i.value === v).length === 0)}
                label=""
                filterType="skillSearch"
                placeholder="Search by skills"
                valueChanged={this.searchSkillsValueChanged}
              />
              <div className="d-flex">
                <ListingFilter
                  onFocus={() => {}}
                  onMouseOver={() => this.toggleDropdown(true, 'dayRateDropdownOpen')}
                  onMouseLeave={() => this.toggleDropdown(false, 'dayRateDropdownOpen')}
                  isOpen={dayRateDropdownOpen}
                  toggle={() => this.toggleDropdown(!dayRateDropdownOpen, 'dayRateDropdownOpen')}
                >
                  <DropdownToggle className={!dayRate.every(e => defaultDayRateValue.includes(e)) ? 'active-filter' : ''}>
                    Day rate <SVG src={leftArrowIcon} />
                  </DropdownToggle>
                  <DropdownMenu right className="input-sm rc-slider-container p-4">
                    <span className="range-value min-value">{minDateRateValue}</span>
                    <Range
                      min={minDateRateValue}
                      max={maxDateRateValue}
                      defaultValue={dayRate}
                      tipFormatter={value => `${value}%`}
                      handle={handle}
                      onAfterChange={this.handleDayRateChange}
                    />
                    <span className="range-value max-value">{maxDateRateValue}</span>
                  </DropdownMenu>
                </ListingFilter>
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
                  <DropdownMenu right className="input-sm">
                    {primaryRoleArray.map(item => (
                      <div className="dropdown-item" key={item.value}>
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
                  <DropdownMenu right className="input-sm">
                    {expInPrimaryRoleArray.map(item => (
                      <div className="dropdown-item" key={item.value}>
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
                <ListingFilter
                  onFocus={() => {}}
                  onMouseOver={() => this.toggleDropdown(true, 'statusDropdownOpen')}
                  onMouseLeave={() => this.toggleDropdown(false, 'statusDropdownOpen')}
                  isOpen={statusDropdownOpen}
                  toggle={() => this.toggleDropdown(!dropdownOpen, 'statusDropdownOpen')}
                >
                  <DropdownToggle className={status !== 'all' ? 'active-filter' : ''}>
                    Status <SVG src={leftArrowIcon} />
                  </DropdownToggle>
                  <DropdownMenu right className="input-sm">
                    {clientStatusArray.map(item => (
                      <div className="dropdown-item" key={item.value}>
                        <Field
                          name="status"
                          defaultValue={item.value}
                          value={item.value}
                          component={RadioButton}
                          label={item.label}
                          className="radio-sm"
                          checked={status === item.value}
                          onChangeRadio={e => this.handleFilterChange(e, true)}
                        />
                      </div>
                    ))}
                  </DropdownMenu>
                </ListingFilter>
                <ListingFilter
                  onFocus={() => {}}
                  onMouseOver={() => this.toggleDropdown(true, 'typeDropdownOpen')}
                  onMouseLeave={() => this.toggleDropdown(false, 'typeDropdownOpen')}
                  isOpen={typeDropdownOpen}
                  toggle={() => this.toggleDropdown(!dropdownOpen, 'typeDropdownOpen')}
                >
                  <DropdownToggle className={type !== 'all' ? 'active-filter' : ''}>
                    Type <SVG src={leftArrowIcon} />
                  </DropdownToggle>
                  <DropdownMenu right className="input-sm">
                    {talentTypeArray.map(item => (
                      <div className="dropdown-item" key={item.value}>
                        <Field
                          name="type"
                          defaultValue={item.value}
                          value={item.value}
                          component={RadioButton}
                          label={item.label}
                          className="radio-sm"
                          checked={type === item.value}
                          onChangeRadio={e => this.handleFilterChange(e, true)}
                        />
                      </div>
                    ))}
                  </DropdownMenu>
                </ListingFilter>
              </div>
            </div>
            {activeFilters.length > 0 && (
              <FilterBlock>
                <FilterList>
                  {activeFilters.map(filterKey => {
                    const { [filterKey]: KeyName } = this.state;
                    let output = null;
                    if (filterKey === 'dayRate') {
                      if (KeyName[0] === 0 && KeyName[1] === 500) {
                        output = null;
                      } else {
                        output = (
                          <li key={filterKey}>
                            {(KeyName || []).join('-')}
                            <button className="close-btn" type="button" onClick={e => this.resetFilter(false, filterKey, e)}>
                              <img src={closeIcon} alt="close" />
                            </button>
                          </li>
                        );
                      }
                    } else if (Array.isArray(this.state[filterKey])) {
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
                        Clear all
                      </button>
                    </li>
                  )}
                </FilterList>
              </FilterBlock>
            )}
            {this.state.cardView ? (
              this.talentListCard(talentList, isListLoading)
            ) : (
              <Card className="p-0 mb-0">{this.talentListTable(talentList, isListLoading)}</Card>
            )}
            {paginationData.totalDocs > dataLimit ? this.talentListTablePagination(paginationData, dataLimit) : ''}
          </Content>
        </PrivateGrid>
        {this.filterModal(loading, responseSuccess, responseError, invalid, showFiltersModal, handleSubmit)}
        {this.logsModal(loading, responseSuccess, responseError, invalid)}
      </React.Fragment>
    );
  }

  talentListTablePagination = (paginationData, dataLimit) => (
    <Pagination
      total={paginationData.totalDocs}
      className="ant-pagination"
      current={paginationData.page}
      defaultPageSize={dataLimit}
      onChange={this.loadTalentsDetails}
      itemRender={textItemRender}
      locale={localeInfo}
    />
  );

  talentListTable(talentList, isListLoading) {
    return (
      <DataTable
        noHeader
        columns={columns}
        customStyles={customStyles}
        data={talentList}
        totalRows={0}
        direction="ltr"
        progressPending={isListLoading}
        progressComponent={<LinearIndeterminate />}
        paginationComponentOptions={{ noRowsPerPage: true }}
        overflowY
        overflowYOffset="100px"
        noDataComponent={<p className="p-4 m-0 text-muted">{messages.noRecord.defaultMessage}</p>}
      />
    );
  }

  talentListCard() {
    const { cardList } = this.state;
    return (
      <div className="row">
        {cardList.map(cardItem => (
          <Col lg={3} md={6} className="d-flex flex-column">
            <CardComponent talentData={cardItem} />
          </Col>
        ))}
      </div>
    );
  }

  tableActions() {
    const { search, filterCount } = this.state;
    return (
      <div className="d-flex align-items-center">
        <SearchComponent
          handleSearchChange={this.debounceFn}
          placeholder={containerMessage.searchPlaceholder.defaultMessage}
          initialValue={search}
        />
        <div className="ms-4">
          <SwitchComponent checked={this.props.switchComponentChecked} onChange={this.handleCheck} layout />
        </div>
        <FilterButton className="ms-2" type="button" onClick={this.handleFiltersOpenModal}>
          <SVG src={filterIcon} />
          {containerMessage.textFilter.defaultMessage}
          <span className="count">{filterCount}</span>
        </FilterButton>
      </div>
    );
  }

  filterModal(loading, responseSuccess, responseError, invalid, showFiltersModal, handleSubmit) {
    const {
      modalFilter,
      languageSearch,
      languageList,
      countrySearch,
      countryList,
      certificationsList,
      companyCulturesList,
      industryList,
      skillsList,
    } = this.state;
    return (
      <PopupWrapper
        modalId="showFiltersModal"
        loading={loading}
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
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={modalFilter.industry}
                options={industryList.map(item => ({
                  label: item,
                  value: item,
                }))}
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
                placeHolder={containerMessage.SelectPlaceHolder.defaultMessage}
                value={modalFilter.certification}
                options={certificationsList.map(item => ({
                  label: item,
                  value: item,
                }))}
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
                  name="availability"
                  defaultValue={item.value}
                  value={item.value}
                  component={RadioButton}
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
                  name={item.value}
                  type="checkbox"
                  component={renderCheckBox}
                  label={item.label}
                  checked={modalFilter.teamPreference.includes(item.value)}
                  onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'teamPreference')}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.subHeadingAssignment.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {assignmentArray.map(item => (
                <Field
                  name={item.value}
                  type="checkbox"
                  component={renderCheckBox}
                  label={item.label}
                  checked={modalFilter.assignment.includes(item.value)}
                  onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'assignment')}
                />
              ))}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.labelWorkSchedule.defaultMessage}</H4>
            <FormGroup className="input-sm">
              {projectPreference.map(item => (
                <Field
                  name={item.value}
                  type="checkbox"
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
                      name={item.value}
                      type="checkbox"
                      component={renderCheckBox}
                      label={item.label}
                      checked={modalFilter.workPreference.includes(item.value)}
                      onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'workPreference')}
                    />
                  ))}
                </PartTimeProjectFormWrapper>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">Education level</H4>
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
            <H4 className="input-sm mt-0 mb-3">Location</H4>
            <FormGroup className="input-sm">
              <Autocomplete
                customClass="skill-search"
                options={countryList}
                label="Search Country"
                filterType="countrySearch"
                placeholder="Search"
                valueChanged={this.countryValueChanged}
              />
              <div className="input-sm mt-3">
                {countrySearch.map(item => (
                  <Field
                    name={item.value}
                    type="checkbox"
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
            <H4 className="input-sm mt-0 mb-3">Languages</H4>
            <FormGroup className="input-sm">
              <Autocomplete
                customClass="skill-search"
                options={languageList}
                label="Search Language"
                filterType="languageSearch"
                placeholder="Search"
                valueChanged={this.languageValueChanged}
              />
              <div className="input-sm mt-3">
                {languageSearch.map(item => (
                  <Field
                    name={item.value}
                    type="checkbox"
                    component={renderCheckBox}
                    label={item.label}
                    checked={modalFilter.language.includes(item.value)}
                    onChange={e => this.handleCheckboxFilterChange(e.target.name, e.target.checked, 'language')}
                  />
                ))}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <H4 className="input-sm mt-0 mb-3">{containerMessage.subProjectSkills.defaultMessage}</H4>
            <FormGroup className="input-sm">
              <Field
                name="talentSkills"
                component={renderSelectTags}
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
  }

  logsModal(loading, responseSuccess, responseError, invalid) {
    const { showLogsModal, talentLogs, talentFirstName, logsLoading } = this.state;
    return (
      <ModalWrapper
        modalId="showLogsModal"
        loading={loading}
        responseSuccess={responseSuccess}
        responseError={responseError}
        disabled={invalid}
        isOpen={showLogsModal}
        otherActions
        onDiscard={this.handleLogsCloseModal}
        primaryBtnText="Ok"
        title={`${talentFirstName ? `${talentFirstName}'s activities` : 'Activities'}`}
        onHandleSubmit={this.handleLogsCloseModal}
        modalBodyClass={!talentLogs.length > 0 ? 'd-flex justify-content-center align-items-center' : ''}
      >
        {!logsLoading ? (
          <>
            {talentLogs.length > 0 ? (
              <>
                {talentLogs.map(obj => (
                  <>
                    {/* eslint-disable-next-line no-underscore-dangle */}
                    <div className="d-flex justify-content-between" key={obj._id}>
                      <P className=" mb-0 p16">{obj.content}</P>
                      <P className=" mb-0 p14" opacityVal="0.5">
                        {moment(obj.createdAt).format('DD/MM/YYYY, hh:mm')}
                      </P>
                    </div>
                    <hr />
                  </>
                ))}
              </>
            ) : (
              <P className="p16" opacityVal="0.7">
                No logs available
              </P>
            )}
          </>
        ) : (
          <div className="w-100 flex-column d-flex">
            <TableSkeletonCol3 cardCount={3} />
          </div>
        )}
      </ModalWrapper>
    );
  }
}

Talents.propTypes = propTypes;
export function mapStateToProps(state) {
  return {
    switchComponentChecked: state.global.switchContainerStatus,
  };
}
export function mapDispatchToProps(dispatch) {
  return {
    onChangeStatus: (data, onSuccess) => dispatch(actions.changeStatus(data, onSuccess)),
    onSwitchComponentChange: status => dispatch(actions.changeSwitchComponent(status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key, saga });

export default compose(
  withSaga,
  withConnect,
  reduxForm({
    form: key,
    touchOnChange: true,
  }),
)(Talents);
