export const TALENT_STEP_1_URL = '/talent/about-you';
export const TALENT_STEP_2_URL = '/talent/qualifications';
export const TALENT_STEP_3_URL = '/talent/experience';
export const TALENT_STEP_4_URL = '/talent/projects';
export const TALENT_STEP_5_URL = '/talent/preferences';
export const TALENT_STEP_6_URL = '/talent/salary-billing';
export const TALENT_STEP_7_URL = '/talent/document-upload';

export const TALENT_STEP_1 = 'About you';
export const TALENT_STEP_2 = 'Qualifications';
export const TALENT_STEP_3 = 'Experience';
export const TALENT_STEP_4 = 'Projects';
export const TALENT_STEP_5 = 'Preferences';
export const TALENT_STEP_6 = 'Salary & Billing';
export const TALENT_STEP_7 = 'Document upload';

export const CLIENT_STEP_1 = 'About you';
export const CLIENT_STEP_2 = 'Company';
export const CLIENT_STEP_3 = 'Locations';

export const CLIENT_STEP_1_URL = '/client/about-you';
export const CLIENT_STEP_2_URL = '/client/about-company';
export const CLIENT_STEP_3_URL = '/client/company-location';

export const talentOnboardingSteps = [
  {
    step: 1,
    name: TALENT_STEP_1,
    url: TALENT_STEP_1_URL,
  },
  {
    step: 2,
    name: TALENT_STEP_2,
    url: TALENT_STEP_2_URL,
  },
  {
    step: 3,
    name: TALENT_STEP_3,
    url: TALENT_STEP_3_URL,
  },
  {
    step: 4,
    name: TALENT_STEP_4,
    url: TALENT_STEP_4_URL,
  },
  {
    step: 5,
    name: TALENT_STEP_5,
    url: TALENT_STEP_5_URL,
  },
  {
    step: 6,
    name: TALENT_STEP_6,
    url: TALENT_STEP_6_URL,
  },
  {
    step: 7,
    name: TALENT_STEP_7,
    url: TALENT_STEP_7_URL,
  },
];

export const agencyTalentOnboardingSteps = [
  { ...talentOnboardingSteps[0] },
  { ...talentOnboardingSteps[1] },
  { ...talentOnboardingSteps[2] },
  { ...talentOnboardingSteps[3] },
  { ...talentOnboardingSteps[4] },
];

export const clientOnboardingSteps = [
  {
    step: 1,
    name: CLIENT_STEP_1,
    url: CLIENT_STEP_1_URL,
  },
  {
    step: 2,
    name: CLIENT_STEP_2,
    url: CLIENT_STEP_2_URL,
  },
  {
    step: 3,
    name: CLIENT_STEP_3,
    url: CLIENT_STEP_3_URL,
  },
];
