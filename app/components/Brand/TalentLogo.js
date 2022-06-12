import React from 'react';
import { brandingDarkIcon } from 'containers/App/constants';
import { getUserRegisterType } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import { NavBrand } from './brand-style';

const getUsrDetail = () => ({
  isSignupStep: StorageService.get('signupStep') || {},
  apiSignupStep: StorageService.get('apiSignupStep') || {},
  userVersion: StorageService.get('userVersion') || {},
});

export class TalentLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleType: getUserRegisterType(),
    };
  }

  componentDidMount() {
    this.setState({ ...getUsrDetail() });
  }

  render() {
    const { isSignupStep, apiSignupStep, roleType, userVersion } = this.state;

    let url = '#';
    let talentOnBoard = false;
    let agencyOnBoard = false;

    if (roleType === 'talent') {
      talentOnBoard = apiSignupStep >= 6 || (apiSignupStep === 7 && userVersion === 'v2');
      url = talentOnBoard ? '/talent' : '#';
    }
    if (roleType === 'talent_agency') {
      talentOnBoard = apiSignupStep >= 5 || (apiSignupStep === 5 && userVersion === 'v2');
      url = talentOnBoard ? '/talent' : '#';
    }
    if (roleType === 'agency') {
      agencyOnBoard = isSignupStep === '7';
      url = agencyOnBoard ? '/agency' : '#';
    }
    return (
      <>
        <NavBrand to={url} title="CodeMonk">
          <img src={brandingDarkIcon} alt="CodeMonk" />
        </NavBrand>
      </>
    );
  }
}

export default TalentLogo;
