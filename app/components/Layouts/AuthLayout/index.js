/**
 * this is Auth pages layout structure.
 * this have a code when user are not login into system this layout call else it will automatically
 * redirect to main home page
 * @author Innovify
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import get from 'lodash/get';
import { userExists, setNextLocation, getUserRoleFromURL, checkCurrectUserPage, getUserType } from 'utils/Helper';
import TalentHeader from 'components/Header/TalentHeader';
import ClientHeader from 'components/Header/ClientHeader';
import Footer from 'components/Footer';
import { Card } from 'components';
import { defaultProps, propTypes } from 'containers/proptypes';
import StorageService from 'utils/StorageService';
import MainContent from 'components/MainContent';
import { checkIfHasAccessURL } from 'containers/App/utils';
import { TALENT_LOGIN_PAGE_URL, AGENCY_LOGIN_PAGE_URL, CLIENT_LOGIN_PAGE_URL } from 'containers/App/constants';
import TabSection from './TabSection';
import { OnboardingContainer } from './styles';
import useEngagebay from '../../../hooks/useEngagebay';
import useCheckVersion from '../../../hooks/useCheckVersion';

/**
 * Layout is main layout renderer const.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */

export const Layout = ({ children }) => {
  useEngagebay();
  useCheckVersion();
  const completeStepCount = Number(StorageService.get('apiSignupStep'));
  return (
    <div className={`${getUserRoleFromURL() !== 'agency' ? 'layout-v2' : 'layout-v1'} d-flex flex-column flex-1`}>
      {getUserRoleFromURL() === 'talent' || getUserRoleFromURL() === 'user' || getUserRoleFromURL() === 'agency' ? (
        <TalentHeader />
      ) : (
        <ClientHeader />
      )}
      {getUserRoleFromURL() !== 'agency' ? (
        <OnboardingContainer className="d-flex flex-column flex-md-row">
          <div className="inner-container">
            <TabSection completeStepCount={completeStepCount} />
            <MainContent className="auth-layout">
              <Card>{children}</Card>
            </MainContent>
          </div>
        </OnboardingContainer>
      ) : (
        <MainContent className="auth-layout">{children}</MainContent>
      )}
      <Footer className="auth-footer" />
    </div>
  );
};
Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
Layout.displayName = 'Layout';

export const setRedirectTo = props => {
  const { location } = props;
  const pathName = get(location, 'pathname');
  StorageService.set('redirectToPage', pathName, { hash: true });
};
/**
 * Redirect to Auth page when user try to hit Private urls.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */
export const Redirects = props => {
  const { location, redirectToPage } = props;

  if (redirectToPage) setRedirectTo(props);

  setNextLocation(location.pathname);
  let pathname = '';
  if (userExists()) {
    const userType = getUserType();
    if (userType === 'talent') {
      pathname = '/talent/';
    } else if (userType === 'agency') {
      pathname = '/agency/';
    } else if (userType === 'client') {
      pathname = '/client/';
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (getUserRoleFromURL() === 'talent') {
      pathname = TALENT_LOGIN_PAGE_URL;
    } else if (getUserRoleFromURL() === 'agency') {
      pathname = AGENCY_LOGIN_PAGE_URL;
    } else if (getUserRoleFromURL() === 'client') {
      pathname = CLIENT_LOGIN_PAGE_URL;
    }
  }
  return (
    <Redirect
      to={{
        pathname,
        state: { from: location },
        search: location.search,
      }}
    />
  );
};

Redirects.defaultProps = defaultProps;
Redirects.propTypes = propTypes;
Redirects.displayName = 'Redirects';

/**
 * PrivateLayout is main layout files.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */

const AuthLayout = props => {
  const userType = parseInt(StorageService.get('userType'), 10);

  return userExists() && checkCurrectUserPage() && checkIfHasAccessURL(userType) ? (
    <Layout {...props}>
      <Route {...props} />
    </Layout>
  ) : (
    <Redirects {...props} />
  );
};

AuthLayout.displayName = 'AuthLayout';

export default AuthLayout;
