/*
 * StartProjectPage Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_PROJECTNAME = 'CodeMonk/StartProjectPage/CHANGE_PROJECTNAME';
export const CHANGE_PROJECT_DESCRIPTION = 'CodeMonk/StartProjectPage/CHANGE_PROJECT_DESCRIPTION';
export const WORKPROGRESS = 'CodeMonk/StartProjectPage/WORKPROGRESS';
export const CHANGE_PROJECTURL = 'CodeMonk/StartProjectPage/CHANGE_PROJECTURL';
export const UX_DESIGN = 'CodeMonk/StartProjectPage/UX_Design';
export const SOFTWARE_DEVELOPMENT = 'CodeMonk/StartProjectPage/SOFTWARE_DEVELOPMENT';
export const DEVELOPMENT_TEAM = 'CodeMonk/StartProjectPage/DEVELOPMENT_TEAM';
export const DATA_AI_ML = 'CodeMonk/StartProjectPage/DATA_AI_ML';
export const GROWTH_HACKING = 'CodeMonk/StartProjectPage/GROWTH_HACKING';
export const AGILE_COACH = 'CodeMonk/StartProjectPage/AGILE_COACH';
export const CHANGE_OTHER = 'CodeMonk/StartProjectPage/CHANGE_OTHER';
export const BUDGET = 'CodeMonk/StartProjectPage/BUDGET';
export const CHANGE_MESSAGE = 'CodeMonk/StartProjectPage/CHANGE_MESSAGE';
export const PROJECT_SPEED = 'CodeMonk/StartProjectPage/PROJECT_SPEED';
export const MANAGE_TEAM = 'CodeMonk/StartProjectPage/MANAGE_TEAM';
export const SUBMIT_PROJECT_DETAILS_FORM = 'CodeMonk/StartProjectPage/SUBMIT_PROJECT_DETAILS_FORM';
export const RESET = 'CodeMonk/StartProjectPage/RESET';

export const key = 'projectDetails';

export const uxDesignArray = [
  {
    id: 1,
    label: 'User research and validation',
    isChecked: false,
    value: 'reaserch',
  },
  {
    id: 2,
    label: 'Experience and visual design',
    isChecked: false,
    value: 'ux',
  },
  {
    id: 3,
    label: 'Branding',
    isChecked: false,
    value: 'branding',
  },
];

export const softwareDevArray = [
  {
    id: 1,
    label: 'Web development',
    isChecked: false,
    value: 'web-development',
  },
  {
    id: 2,
    label: 'Mobile app development',
    isChecked: false,
    value: 'mobile-app',
  },
  {
    id: 3,
    label: 'DevOps and CloudOps',
    isChecked: false,
    value: 'dev-ops',
  },
  {
    id: 3,
    label: 'Product Management',
    isChecked: false,
    value: 'project-management',
  },
  {
    id: 4,
    label: 'Agile Coaching and Scaling',
    isChecked: false,
    value: 'agile-coach',
  },
];

export const devTeamArray = [
  {
    id: 1,
    label: 'Front-end (React, Angular, Javascript)',
    isChecked: false,
    value: 'front-end',
  },
  {
    id: 2,
    label: 'Back-end(.NET, JAVA, Node, PHP)',
    isChecked: false,
    value: 'back-end',
  },
  {
    id: 3,
    label: 'Full-stack scrum teams',
    isChecked: false,
    value: 'full-stack',
  },
];

export const dataAIAndMlArray = [
  {
    id: 1,
    label: 'Data analysis and modeling',
    isChecked: false,
    value: 'analysis',
  },
  {
    id: 2,
    label: 'AI/ML development',
    isChecked: false,
    value: 'development',
  },
];

export const WorkProgress = [
  {
    id: 1,
    label: 'Haven’t done much',
    isChecked: true,
    value: 'inception',
  },
  {
    id: 2,
    label: 'UX and UI designs',
    isChecked: false,
    value: 'design',
  },
  {
    id: 3,
    label: 'Detailed specifications and technical architecture',
    isChecked: false,
    value: 'on-paper',
  },
  {
    id: 4,
    label: 'Something built but not live yet',
    isChecked: false,
    value: 'alpha',
  },
  {
    id: 5,
    label: 'Project built and already live',
    isChecked: false,
    value: 'live',
  },
];

export const BudgetArray = [
  {
    id: 1,
    label: '<$50K',
    isChecked: false,
    value: '<$50K',
  },
  {
    id: 2,
    label: '$50K - $150K',
    isChecked: false,
    value: '$50k-$150k',
  },
  {
    id: 3,
    label: '$150K - $500K',
    isChecked: false,
    value: '$150k-$500k',
  },
  {
    id: 4,
    label: '$500K+',
    isChecked: false,
    value: '$500k+',
  },
];

export const ProjectSpeed = [
  {
    id: 1,
    label: 'Standard',
    isChecked: false,
    value: 'standard',
  },
  {
    id: 2,
    label: 'Fast',
    isChecked: false,
    value: 'fast',
  },
  {
    id: 3,
    label: 'Super-fast  ',
    isChecked: false,
    value: 'super-fast',
  },
  {
    id: 4,
    label: 'Super-duper fast',
    isChecked: false,
    value: 'super-duper-fast',
  },
];

export const ManageTeam = [
  {
    id: 1,
    label: 'Directly managed the developers',
    isChecked: false,
    value: 'direct',
  },
  {
    id: 2,
    label: 'Need a dedicated product development manager',
    isChecked: false,
    value: 'project-manager',
  },
];
