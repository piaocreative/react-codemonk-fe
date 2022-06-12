/**
 * this is Sign in Layout version 2 structure.
 * this have a code when user are not login into system this layout call else it will automatically
 * redirect to main home page
 * @author Innovify
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { userExists, dashboardPath } from 'utils/Helper';
import Footer from 'components/Footer';
import LeftSection from './LeftSection';
import useEngagebay from '../../../hooks/useEngagebay';
import useCheckVersion from '../../../hooks/useCheckVersion';
import { RightSection, SignInContent } from './styles';

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
    <SignInContent className="layout-v2">
      <LeftSection />
      <RightSection>
        <div className="inner-content my-auto">{children}</div>
        <Footer className="signin-footer" />
      </RightSection>
    </SignInContent>
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

const SignInLayoutV2 = props => {
  return !userExists() ? (
    <Layout {...props}>
      <Route {...props} />
    </Layout>
  ) : (
    <Redirects {...props} />
  );
};
SignInLayoutV2.displayName = 'SignInLayoutV2';

export default SignInLayoutV2;
