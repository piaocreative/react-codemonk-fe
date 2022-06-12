import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import history from 'utils/history';
import { LinkButtonMod } from 'components';
import StorageService from 'utils/StorageService';
import { rightAngleIcon, circleTickIcon } from 'containers/App/constants';
import { talentOnboardingSteps, agencyTalentOnboardingSteps, clientOnboardingSteps } from 'containers/Auth/constants';
import { handleBackButton } from 'containers/Auth/utils';
import { TabSectionBlock } from './styles';

const TabSection = props => {
  const { pathname } = history.location;
  const { tabClassName, completeStepCount } = props;
  const registerType = StorageService.get('registerType');
  const userType = Number(StorageService.get('userType'));
  let onboardingSteps = [];
  if (registerType === 'freelancer' && userType === 1) {
    onboardingSteps = talentOnboardingSteps;
  } else if (registerType === 'agency' && userType === 1) {
    onboardingSteps = agencyTalentOnboardingSteps;
  } else if (userType === 2) {
    onboardingSteps = clientOnboardingSteps;
  }
  return (
    <TabSectionBlock className={tabClassName}>
      <div>
        <ul>
          {onboardingSteps.map((obj, index) => (
            <li key={obj.name} className={pathname === obj.url ? 'active' : ''}>
              <LinkButtonMod
                className="link"
                onClick={e => {
                  handleBackButton(e, history, obj.url);
                }}
              >
                <span className="count">{index + 1}</span>
                <span className="me-2 d-none d-md-block">{obj.name}</span>
                {index + 1 <= completeStepCount ? (
                  <SVG src={circleTickIcon} className="tick-icon" />
                ) : (
                  <SVG src={rightAngleIcon} className="right-angle" />
                )}
              </LinkButtonMod>
            </li>
          ))}
        </ul>
      </div>
    </TabSectionBlock>
  );
};

TabSection.defaultProps = {
  tabClassName: '',
  completeStepCount: 0,
};

TabSection.propTypes = {
  tabClassName: PropTypes.string,
  completeStepCount: PropTypes.number,
};

export default TabSection;
