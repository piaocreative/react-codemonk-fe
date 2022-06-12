import { talentOnboardingSteps, agencyTalentOnboardingSteps } from 'containers/Auth/constants';
import { getUserRegisterType } from 'utils/Helper';

export const getTotalStepCount = () => {
  const talentTotalSteps = talentOnboardingSteps.length;
  const talentAgencyTotalSteps = agencyTalentOnboardingSteps.length;
  const roleType = getUserRegisterType();
  let count = 0;
  if (roleType === 'talent') {
    count = talentTotalSteps;
  }
  if (roleType === 'talent_agency') {
    count = talentAgencyTotalSteps;
  }

  return count;
};
