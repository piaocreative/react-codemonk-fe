/*
 * Dashboard
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import request from 'utils/request';
import { VALIDATION } from 'utils/constants';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { getUserRegisterType } from 'utils/Helper';
import { API_URL, USER, DETAILS } from 'containers/App/constants';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { ToastifyMessage } from 'components';
import { propTypes } from './proptypes';
import AgencyDashboard from './AgencyDashboard';
import TalentDashboard from './TalentDashboard';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      roleType: getUserRegisterType(),
    };
  }

  componentDidMount() {
    this.callFetchAPI();
  }

  callFetchAPI = () => {
    const data = {
      method: 'GET',
    };
    const requestURL = `${API_URL}${USER}${DETAILS}`;
    request(requestURL, data)
      .then(response => {
        storeApiSignupStep(get(response, 'data.signupStep'));
        this.setState({ userDetails: response });
      })
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  render() {
    const { userDetails, roleType } = this.state;
    return (
      <React.Fragment>
        {roleType === 'agency' && !isEmpty(userDetails) && <AgencyDashboard {...this.props} userData={userDetails} />}
        {roleType !== 'agency' && !isEmpty(userDetails) && <TalentDashboard {...this.props} userData={userDetails} />}
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = propTypes;

export default Dashboard;
