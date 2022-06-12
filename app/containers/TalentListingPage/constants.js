import { teamWorkingArray } from 'containers/App/constants';
import roleList from '../../data/roles.json';

export const key = 'talentFilter';
export const DEFAULT_PAGE_NO = 1;

export const languageDefaultData = [
  {
    label: 'All',
    value: 'all',
    isChecked: true,
  },
];

export const countryDefaultData = [
  {
    label: 'All',
    value: 'all',
    isChecked: true,
  },
];

export const initialValues = {
  teamPreference: ['all'],
  assignment: ['all'],
  workPreference: ['all'],
  availability: 'all',
  teamWorking: 'all',
  degreeLevel: ['all'],
  location: ['all'],
  language: ['all'],
  skillsArray: [],
  industry: [],
  discProfile: [],
  companyCultures: [],
  certification: [],
};

export const FILTER_KEYS = [
  'role',
  'yearsOfExperience',
  'teamPreference',
  'workPreference',
  'assignment',
  'availability',
  'teamWorking',
  'location',
  'degreeLevel',
  'language',
  'skillsArray',
  'industry',
  'discProfile',
  'companyCultures',
  'certification',
];

export const MULTI_SELECT_KEYS = ['skillsArray', 'industry', 'discProfile', 'companyCultures', 'certification'];

export const teamWorkingList = [
  {
    label: 'All',
    value: 'all',
  },
  ...teamWorkingArray,
];

export const primaryRoleArray = [
  {
    name: 'All',
    value: 'all',
  },
  ...roleList,
];

export const expInPrimaryRoleArray = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Distinguished',
    value: 'Distinguished - 15+ yrs',
  },
  {
    label: 'Principal',
    value: 'Principal - 12 - 15 yrs',
  },
  {
    label: 'Senior',
    value: 'Senior - 8 - 12 yrs',
  },
  {
    label: 'Intermediate',
    value: 'Intermediate - 5 - 8 yrs',
  },
  {
    label: 'Junior',
    value: 'Junior - 2 - 5 yrs',
  },
  {
    label: 'Beginner',
    value: 'Beginner - 0 - 2 yrs',
  },
];

export const teamPreferenceArray = [
  {
    label: 'Any team size',
    value: 'all',
  },
  {
    label: 'Individual',
    value: 'individuals',
  },
  {
    label: 'Small team(=<6)',
    value: 'small-team',
  },
  {
    label: 'Large team(7-12)',
    value: 'large-team',
  },
  {
    label: 'X-large (12+)',
    value: 'x-large-team',
  },
];

export const assignmentArray = [
  {
    label: 'Any assignment',
    value: 'all',
  },
  {
    label: 'Remote only',
    value: 'remote-only',
  },
  {
    label: 'Occasional site visit',
    value: 'occational-site-visit',
  },
  {
    label: 'Short-term onsite (< 3months)',
    value: 'short-term-onsite',
  },
  {
    label: 'Mid-term onsite (3-6 months)',
    value: 'mid-term-onsite',
  },
  {
    label: 'Long-term onsite (6-12 months)',
    value: 'long-term-onsite',
  },
];

export const educationLevelArray = [
  {
    label: 'All level',
    value: 'all',
  },
  {
    label: "Master's or Higher",
    value: "Master's or Higher",
  },
  {
    label: "Bachelor's",
    value: "Bachelor's",
  },
  {
    label: "Associate's",
    value: "Associate's",
  },
  {
    label: 'Some College',
    value: 'Some College',
  },
  {
    label: 'High School Diploma/GED',
    value: 'High School Diploma/GED',
  },
];

export const projectPreference = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'fulltime',
    label: 'Full time',
  },
  {
    value: 'parttime',
    label: 'Part time',
  },
];

export const availabilityArray = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
];

export const localeInfo = {
  // Options.jsx
  items_per_page: '/ page',
  jump_to: 'Go to',
  jump_to_confirm: 'confirm',
  page: '',
  // Pagination.jsx
  prev_page: 'Previous Page',
  next_page: 'Next Page',
  prev_5: 'Previous 5 Pages',
  next_5: 'Next 5 Pages',
  prev_3: 'Previous 3 Pages',
  next_3: 'Next 3 Pages',
};

export const sortArray = [
  { label: 'Name (A-Z)', value: 'aToZ_Name' },
  { label: 'Name (Z-A)', value: 'zToA_Name' },
  { label: 'Experience (Low to High)', value: 'lowToHigh_Exp' },
  { label: 'Experience (High to Low)', value: 'highToLow_Exp' },
];

export const projectSortArray = [
  { label: 'Most Recent', value: 'talentHighToLow' },
  { label: 'Name (A-Z)', value: 'talentAToZ' },
  { label: 'Name (Z-A)', value: 'talentZToA' },
];

export const sortFilterArray = [
  { label: 'Most Recent', value: 'highToLow' },
  { label: 'Name (A-Z)', value: 'aToZ_Name' },
  { label: 'Name (Z-A)', value: 'zToA_Name' },
];
