/**
 * this is Auth pages layout structure.
 * this have a code when user are not login into system this layout call else it will automatically
 * redirect to main home page
 * @author Innovify
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { userExists, getUserRoleFromURL, dashboardPath } from 'utils/Helper';
import TalentHeader from 'components/Header/TalentHeader';
import ClientHeader from 'components/Header/ClientHeader';
import Footer from 'components/Footer';
import MainContent from 'components/MainContent';
import useEngagebay from '../../../hooks/useEngagebay';
import useCheckVersion from '../../../hooks/useCheckVersion';
import { SignInWrapper } from '../styles';

/* eslint-disable arrow-body-style */

/**
 * Layout is main layout renderer const.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */

export const Layout = ({ children }) => {
  useEngagebay();
  useCheckVersion();
  return (
    <SignInWrapper className="layout-v1 d-flex flex-column flex-1">
      {getUserRoleFromURL() === 'client' ? <ClientHeader /> : <TalentHeader />}
      <MainContent className="auth-layout">{children}</MainContent>
      <Footer />
    </SignInWrapper>
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
  const pathname = dashboardPath();
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

/**
 * PrivateLayout is main layout files.
 * @param {object} props are property object pass into this const function
 * @author Innovify
 */

const SignInLayout = props => {
  return !userExists() ? (
    <Layout {...props}>
      <Route {...props} />
    </Layout>
  ) : (
    <Redirects {...props} />
  );
};
SignInLayout.displayName = 'SignInLayout';

export default SignInLayout;
