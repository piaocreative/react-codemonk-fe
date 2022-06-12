/**
 * User Referral Details Page
 *
 * This is the User Referral Details page for the App, at the '/referral' route
 */

import { SIGNUP_PAGE_URL } from 'containers/App/constants';

const UserReferral = props => {
  const { history, match = {} } = props;
  const { params } = match;
  history.push({ pathname: SIGNUP_PAGE_URL, params });
  return null;
};

export default UserReferral;
