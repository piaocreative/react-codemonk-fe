import React from 'react';
import { userExists, getUserRegisterType } from 'utils/Helper';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import { Dropdown, DropdownItem } from 'reactstrap';
import { defaultProps, propTypes } from 'containers/proptypes';
import LogoutLink from 'components/LogoutLink';
import SVG from 'react-inlinesvg';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import { userIcon, settingIcon, logoutIcon, backArrowIcon, helpIcon } from 'containers/App/constants';
import { handleBackToAdmin } from 'containers/Admin/ProxyLogin/utils';
import Notifications from 'containers/Notifications';
import {
  ProfileImg,
  HeaderNav,
  FixedNavbar,
  NavbarContainer,
  UserProfileToggle,
  UserProfileMenu,
  UserImg,
  SecondaryNav,
  HamburgerToggle,
} from './header-style';
import TalentLogo from '../Brand/TalentLogo';
import messages from './messages';

export class TalentHeader extends React.Component {
  constructor(props) {
    super(props);
    const isSignupStep = StorageService.get('signupStep');
    const apiSignupStep = Number(StorageService.get('apiSignupStep'));
    const profilePicture = StorageService.get('profilePicture');
    const agencyLogo = StorageService.get('agencyLogo');
    this.state = {
      dropdownOpen: false,
      isSignIn: userExists(),
      isOpen: false,
      roleType: getUserRegisterType(),
      isSignupStep,
      apiSignupStep,
      profilePicture,
      agencyLogo,
    };
  }

  setConstructor = () => {
    const proxyType = StorageService.get('proxyType');
    const isSignupStep = StorageService.get('signupStep');
    const profilePicture = StorageService.get('profilePicture');
    const agencyLogo = StorageService.get('agencyLogo');
    const stateData = {
      dropdownOpen: false,
      isSignIn: userExists(),
      isOpen: false,
      roleType: getUserRegisterType(),
      isSignupStep,
      profilePicture,
      agencyLogo,
      proxyType,
      badgeConfiguration: {},
    };
    this.setState({ ...stateData });
  };

  componentDidMount() {
    this.setConstructor();

    Emitter.on('userTypeSelected', userTypeSelected => {
      if (userTypeSelected) {
        const profilePicture = StorageService.get('profilePicture');
        const agencyLogo = StorageService.get('agencyLogo');
        const roleType = getUserRegisterType();
        this.setState({
          roleType,
          profilePicture,
          agencyLogo,
        });
      }
    });
    Emitter.on('profilePicture', profilePicture => {
      let url = '';
      if (profilePicture) {
        url = `${profilePicture}?_t=${new Date().getTime()}`;
      }
      this.setState({
        profilePicture: url,
      });
      StorageService.set('profilePicture', url, { hash: true });
    });
    Emitter.on('agencyLogo', agencyLogo => {
      let url = '';
      if (agencyLogo) {
        url = `${agencyLogo}?_t=${new Date().getTime()}`;
      }
      this.setState({
        agencyLogo: url,
      });
      StorageService.set('agencyLogo', url, { hash: true });
    });

    Emitter.on('proxyLoginAgency', proxyLoginAgency => {
      if (proxyLoginAgency) {
        this.setConstructor();
      }
    });

    Emitter.on('badgeConfigurationUpdated', badgeConfigurationUpdated => {
      this.setState({ badgeConfiguration: badgeConfigurationUpdated });
    });
  }

  componentWillUnmount() {
    Emitter.off('userTypeSelected');
    Emitter.off('profilePicture');
    Emitter.off('agencyLogo');
    Emitter.off('proxyLoginAgency');
    Emitter.off('badgeConfigurationUpdated');
  }

  /**
   * call dropdownToggle on tab change
   * @author Innovify
   */
  dropdownToggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  menuToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const {
      isSignIn,
      dropdownOpen,
      isSignupStep,
      profilePicture,
      agencyLogo,
      roleType,
      proxyType,
      badgeConfiguration,
      isOpen,
      apiSignupStep,
    } = this.state;
    const userVersion = StorageService.get('userVersion');

    let talentOnBoard = false;
    let talentUser = false;
    let agencyUser = false;
    let agencyOnBoard = false;

    if (roleType === 'talent') {
      talentUser = true;
      talentOnBoard = (apiSignupStep >= 6 && userVersion !== 'v2') || (apiSignupStep === 7 && userVersion === 'v2');
    }
    if (roleType === 'talent_agency') {
      talentUser = true;
      talentOnBoard = (apiSignupStep >= 5 && userVersion !== 'v2') || (apiSignupStep === 5 && userVersion === 'v2');
    }
    if (roleType === 'agency') {
      agencyUser = true;
      agencyOnBoard = isSignupStep === '7';
    }
    return (
      <HeaderNav className={isOpen && 'sidebarOpen'}>
        <FixedNavbar>
          <NavbarContainer fluid>
            {this.getBrandLogo(isSignIn, talentOnBoard, agencyOnBoard)}
            {isSignIn && (talentUser || agencyUser) && (
              <div className="d-flex align-items-center">
                <SecondaryNav>
                  <Link to="/dashboard" className="nav-link d-none">
                    <SVG src={helpIcon} />
                  </Link>
                  {(talentOnBoard || agencyOnBoard) && <Notifications newNotification={get(badgeConfiguration, 'newNotification')} />}
                </SecondaryNav>
                <Dropdown isOpen={dropdownOpen} toggle={this.dropdownToggle}>
                  <UserProfileToggle>
                    {talentUser && profilePicture && <UserImg src={profilePicture} alt="user-profile" />}
                    {talentUser && !profilePicture && (
                      <ProfileImg>
                        <SVG src={userIcon} />
                      </ProfileImg>
                    )}
                    {agencyUser && agencyLogo && <UserImg src={agencyLogo} alt="user-profile" />}
                    {agencyUser && !agencyLogo && (
                      <ProfileImg>
                        <SVG src={userIcon} />
                      </ProfileImg>
                    )}
                  </UserProfileToggle>
                  <UserProfileMenu right>
                    <div className="inner-block">
                      {talentUser && talentOnBoard && (
                        <DropdownItem tag={Link} to="/talent/my-profile">
                          <SVG src={userIcon} />
                          <FormattedMessage {...messages.menuItemMyProfile} />
                        </DropdownItem>
                      )}
                      {agencyUser && agencyOnBoard && (
                        <DropdownItem tag={Link} to="/agency/agency-profile">
                          <SVG src={userIcon} />
                          <FormattedMessage {...messages.menuItemMyProfile} />
                        </DropdownItem>
                      )}
                      {talentUser && talentOnBoard && (
                        <DropdownItem tag={Link} to="/talent/account-settings">
                          <SVG src={settingIcon} />
                          <FormattedMessage {...messages.menuItemAccountSetting} />
                        </DropdownItem>
                      )}

                      {agencyUser && agencyOnBoard && (
                        <DropdownItem tag={Link} to="/agency/agency-account-settings">
                          <SVG src={settingIcon} />
                          <FormattedMessage {...messages.menuItemAccountSetting} />
                        </DropdownItem>
                      )}
                        <LogoutLink>
                          <SVG src={logoutIcon} />
                          <FormattedMessage {...messages.menuItemLogout} />
                        </LogoutLink>

                      {/* proxyLogin Return to admin */}
                      {proxyType && (
                        <DropdownItem onClick={handleBackToAdmin}>
                          <SVG src={backArrowIcon} />
                          <FormattedMessage {...messages.menuItemBackToAdmin} />
                        </DropdownItem>
                      )}
                    </div>
                  </UserProfileMenu>
                </Dropdown>
              </div>
            )}
          </NavbarContainer>
        </FixedNavbar>
      </HeaderNav>
    );
  }

  getBrandLogo(isSignIn, talentOnBoard, agencyOnBoard) {
    return (
      <div className="d-flex align-items-center navbar-expand-md">
        <TalentLogo />
        {isSignIn && (talentOnBoard || agencyOnBoard) && <HamburgerToggle onClick={this.menuToggle} />}
      </div>
    );
  }
}

TalentHeader.defaultProps = defaultProps;
TalentHeader.propTypes = propTypes;

export default TalentHeader;
