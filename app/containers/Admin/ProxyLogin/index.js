/** ProxyLogin **/
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import get from 'lodash/get';
import has from 'lodash/has';
import { VALIDATION } from 'utils/constants';
import { API_URL, ADMIN, PROXY_LOGIN } from 'containers/App/constants';
import { redirectPageURL, agencyRedirectPageURL, clientRedirectPageURL } from 'containers/App/utils';
import { storeApiSignupStep } from 'containers/Auth/utils';
import { Button } from 'components';
import request from 'utils/request';
import history from 'utils/history';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';
import { propTypes } from 'containers/proptypes';
import ToastifyMessage from 'components/ToastifyMessage';
import messages from './messages';

export class ProxyLogin extends Component {
  loadUserProxyData = () => {
    const { userId } = this.props;
    const body = { userId };
    const data = { method: 'POST', body };

    const requestURL = `${API_URL}${ADMIN}${PROXY_LOGIN}`;
    request(requestURL, data)
      .then(this.setProxyData)
      .catch(() => {
        toast.error(<ToastifyMessage message={VALIDATION.wentWrong} type="error" />, { className: 'Toast-error' });
      });
  };

  setProxyData = response => {
    const { type } = this.props;
    if (get(response, 'status')) {
      const { data } = response;

      // common data
      StorageService.set('firstName', get(data, 'firstName', ''), { hash: true });
      StorageService.set('userEmail', get(data, 'email'), { hash: true });
      StorageService.set('userType', get(data, 'role'), { hash: true });
      StorageService.set('registerType', get(data, 'registerType'), { hash: true });

      if (type === 'client') this.setClientProxyData(data);
      else if (type === 'agency') this.setAgencyProxyData(data);
      else if (type === 'talent') this.setTalentProxyData(data);
    } else {
      toast.error(<ToastifyMessage message={get(response, 'message')} type="error" />, { className: 'Toast-error' });
    }
  };

  setClientProxyData = data => {
    const currentSignupStep = get(data, 'signupStep', '') || 0;
    storeApiSignupStep(currentSignupStep);
    const signupStep = currentSignupStep >= 3 ? 4 : currentSignupStep;
    StorageService.set('signupStep', signupStep, { hash: true });

    StorageService.set('proxyType', 'client', { hash: true });
    StorageService.set('clientID', get(data, '_id'), { hash: true });
    StorageService.set('proxyToken', get(data, 'clientToken'), { hash: true });

    Emitter.emit('proxyLoginClient', true);
    const redirectPage = clientRedirectPageURL(signupStep);
    history.replace(redirectPage);
  };

  setAgencyProxyData = data => {
    const signupStep = get(data, 'signupStep') === 0.1 ? 1 : get(data, 'signupStep', 0) + 1;
    StorageService.set('signupStep', signupStep, { hash: true });
    StorageService.set('agencyLogo', get(data, 'trading.logo', ''), { hash: true });
    StorageService.set('proxyType', 'agency', { hash: true });
    StorageService.set('proxyToken', get(data, 'agencyToken'), { hash: true });
    StorageService.set('isLoginViaAdmin', true, { hash: true });

    Emitter.emit('proxyLoginAgency', true);
    const redirectPage = agencyRedirectPageURL(signupStep);
    history.replace(redirectPage);
  };

  setTalentProxyData = data => {
    storeApiSignupStep(get(data, 'signupStep'));
    const userBillingDetailsObj = {
      currency: get(data, 'currency', ''),
      ratePerHour: get(data, 'ratePerHour', ''),
    };
    StorageService.set('userBillingDetails', JSON.stringify(userBillingDetailsObj), { hash: true });

    let signupStep;
    signupStep = get(data, 'signupStep') === 0.1 ? 1 : get(data, 'signupStep', 0) + 1;

    signupStep = has(data, 'signupStep') === true ? signupStep : 0;

    const registerType = get(data, 'registerType');
    if (registerType === 'agency') {
      signupStep = signupStep >= 6 ? 8 : signupStep;
    }

    StorageService.set('signupStep', signupStep, { hash: true });
    StorageService.set('userVersion', get(data, 'version'), { hash: true });
    StorageService.set('profilePicture', get(data, 'profilePicture', ''), { hash: true });
    StorageService.set('proxyType', 'talent', { hash: true });
    StorageService.set('proxyToken', get(data, 'talentToken'), { hash: true });
    StorageService.set('isLoginViaAdmin', true, { hash: true });

    Emitter.emit('proxyLoginAgency', true);
    const redirectPage = redirectPageURL(signupStep);
    history.replace(redirectPage);
  };

  render() {
    return (
      <React.Fragment>
        <Button className="btn btn-outline btn-sm" onClick={() => this.loadUserProxyData()}>
          <span>{messages.proxyLoginCTA.defaultMessage}</span>
        </Button>
      </React.Fragment>
    );
  }
}

ProxyLogin.propTypes = propTypes;

export default ProxyLogin;
