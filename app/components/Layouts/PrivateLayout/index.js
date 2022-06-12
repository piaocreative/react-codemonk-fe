/**
 * this is Private pages layout structure.
 * this have a code when user are  ogin into system this layout call else it will automatically
 * redirect to login page
 * @author Innovify
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { userExists, setNextLocation, getUserRoleFromURL, checkCurrectUserPage, dashboardPath, loginPath } from 'utils/Helper';
import StorageService from 'utils/StorageService';
import MainContent from 'components/MainContent';
import Content from 'components/Content';
import TalentHeader from 'components/Header/TalentHeader';
import ClientSidebar from 'components/Sidebar/ClientSidebar';
import TalentSidebar from 'components/Sidebar/TalentSidebar';
import ClientHeader from 'components/Header/ClientHeader';
import Footer from 'components/Footer/index';
import { clientRedirectPageURL, agencyRedirectPageURL, checkIfHasAccessURL } from 'containers/App/utils';
import useEngagebay from '../../../hooks/useEngagebay';
import useCheckVersion from '../../../hooks/useCheckVersion';
import { PrivateWrapper } from '../styles';

/**
 * Layout is main layout renderer const.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */
export const Layout = props => {
  useEngagebay();
  useCheckVersion();
  const { children } = props;
  let sidebar = '';
  if (getUserRoleFromURL() === 'talent' || getUserRoleFromURL() === 'agency') {
    sidebar = <TalentSidebar {...props} />;
  } else if (getUserRoleFromURL() === 'client' || getUserRoleFromURL() === 'admin') {
    sidebar = <ClientSidebar {...props} />;
  }

  return (
    <PrivateWrapper className="private-layout">
      {getUserRoleFromURL() === 'talent' || getUserRoleFromURL() === 'agency' ? <TalentHeader {...props} /> : <ClientHeader {...props} />}
      {sidebar}
      <MainContent className="with-sidebar">
        <Content className="p-0">{children}</Content>
        <Footer />
      </MainContent>
    </PrivateWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
};

Layout.defaultProps = {
  children: <div>.</div>,
};

Layout.displayName = 'Layout';

/**
 * Redirect to Auth page when user try to hit Private urls.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */
export const Redirects = ({ location }) => {
  setNextLocation(location.pathname);
  let pathname = '';
  if (userExists()) {
    pathname = dashboardPath();
  } else {
    pathname = loginPath();
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

Redirects.propTypes = {
  location: PropTypes.object,
};

Redirects.defaultProps = {
  location: {},
};
Redirects.displayName = 'Redirects';

const redirectToPage = props => {
  let output = '';
  const userType = parseInt(StorageService.get('userType'), 10);
  if (userExists() && checkCurrectUserPage() && checkIfHasAccessURL(userType)) {
    const signupStep = parseInt(StorageService.get('signupStep'), 10);
    const requestChangeEmail = parseInt(StorageService.get('requestChangeEmail'), 10);
    const { pathname } = props.location;
    if (userType === 1 && requestChangeEmail === 1 && (pathname !== '/talent/dashboard' && pathname !== '/talent/account-settings')) {
      const url = '/talent/dashboard';
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else if (userType === 2 && signupStep < 3) {
      const url = clientRedirectPageURL(signupStep);
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else if (userType === 3 && signupStep < 7 && pathname !== '/agency/dashboard') {
      const url = agencyRedirectPageURL(signupStep);
      output = (
        <Redirect
          to={{
            pathname: url,
            state: { from: props.location },
            search: props.location.search,
          }}
        />
      );
    } else {
      output = (
        <Layout {...props}>
          <Route {...props} />
        </Layout>
      );
    }
  } else {
    output = <Redirects {...props} />;
  }

  return output;
};
/**
 * PrivateLayout is main layout files.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */

const PrivateLayout = props => redirectToPage(props);

PrivateLayout.displayName = 'PrivateLayout';

export default PrivateLayout;
