import base from 'base-64';

/**
 * This class used for Store value on localStorage of browser.
 * @author Innovify
 */

const StorageService = {
  /**
   * check value exists on localStorage of browser.
   * @author Innovify
   * @Developer Ankit Gujarati
   */
  exists(key) {
    return this.get(key);
  },
  /**
   * set value from localStorage of browser.
   * @author Innovify
   * @Developer Ankit Gujarati
   */
  set(key, value, opts = {}) {
    let storedValue = value;
    if (opts.stringify) storedValue = JSON.stringify(storedValue);
    if (opts.hash) storedValue = base.encode(storedValue);
    try {
      if (opts.keepMe) {
        const d = new Date();
        d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${key}=${JSON.stringify({
          opts,
          body: storedValue,
        })};${expires};path=/`;
      } else {
        document.cookie = `${key}=${JSON.stringify({
          opts,
          body: storedValue,
        })};path=/`;
      }
    } catch (err) {
      throw err;
    }
  },
  /**
   * get value from localStorage of browser.
   * @author Innovify
   */
  get(key) {
    // if (!this.exists(key)) return false;
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        const data = JSON.parse(c.substring(name.length, c.length));
        let { body } = data;
        if (data.opts && data.opts.hash) body = base.decode(body);
        if (data.opts && data.opts.stringify) body = JSON.parse(body);
        return body;
      }
    }
    return false;
    /* const data = JSON.parse(localStorage.getItem(key));
    let { body } = data;
    if (data.opts && data.opts.hash) body = base.decode(body);
    if (data.opts && data.opts.stringify) body = JSON.parse(body);
    return body; */
  },
  /**
   * delete value from localStorage of browser.
   * @author Innovify
   */
  delete(key, opts = {}) {
    const d = new Date();
    d.setTime(d.getTime() + 0);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${key}=${JSON.stringify({
      opts,
      body: '',
    })};${expires};path=/`;
    // localStorage.removeItem(key);
  },
  /**
   * clear localStorage of browser.
   * @author Innovify
   */
  clear() {
    this.delete('signupStep');
    this.delete('apiSignupStep');
    this.delete('userVersion');
    this.delete('user');
    this.delete('recentSearch');
    this.delete('jwtToken');
    this.delete('location');
    this.delete('unAuthorize');
    this.delete('userPhoneCountry');
    this.delete('registerType');
    this.delete('userEmail');
    this.delete('userType');
    this.delete('agencyLogo');
    this.delete('pageNumber');
    this.delete('userPhoneNumber');
    this.delete('profilePicture');
    this.delete('firstName');
    this.delete('userPhone');
    this.delete('Notification');
    this.delete('NotificationType');
    this.delete('talentProjectPageNumber');
    this.delete('talentProjectFilter');
    this.delete('clientProjectPageNumber');
    this.delete('clientProjectStatus');
    this.delete('isPaymentSkipped');
    this.delete('agencyMyTeamPageNumber');
    this.delete('adminAgencyPageNumber');
    this.delete('adminAgencyFilterObject');
    this.delete('adminBriefDetailID');
    this.delete('clientsFilterObject');
    this.delete('clientsPageNumber');
    this.delete('interviewFilterObject');
    this.delete('interviewPageNumber');
    this.delete('adminProjectDetailsBriefPageNumber');
    this.delete('projectFilterObject');
    this.delete('projectPageNumber');
    this.delete('talentFilterObject');
    this.delete('talentPageNumber');
    this.delete('agencyQuotePage');
    this.delete('selectedRoleType');
    this.delete('filterObject');
    this.delete('proxyType');
    this.delete('proxyToken');
    this.delete('talentBriefPage');
    this.delete('talentBriefFilter');
    this.delete('clientBriefDetailsPageNumber');
    this.delete('clientBriefPage');
    this.delete('clientBriefFilter');
    this.delete('clientID');
    this.delete('adminTalentSearch');
    this.delete('adminAgencySearch');
    this.delete('adminClientSearch');
    this.delete('isLoginViaAdmin');
    this.delete('userBillingDetailsObj');
  },
};

export default StorageService;
