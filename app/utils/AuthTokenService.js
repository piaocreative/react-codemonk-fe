import StorageService from './StorageService';

const STORAGE_USER = 'user';
const STORAGE_KEY = 'jwtToken';

/**
 * check the user logging token is exists of not.
 * @author Innovify
 * @developer Innovify
 */

const AuthTokenService = {
  /**
   * check the user logging token is exists of not.
   * @author Innovify
   * @developer Innovify
   */
  exists() {
    return StorageService.exists(STORAGE_KEY);
  },
  /**
   *  init to store token, if token is not exist
   * @author Innovify
   * @developer Innovify
   */
  init(token) {
    if (!this.exists()) this.storeToken(token);
    // this.applyTokenHeaders();
    return true;
  },

  /* applyTokenHeaders() {
    if (this.exists()) {
      axios.defaults.headers.common.Authorization = `Bearer ${this.get()}`
    } else {
      delete axios.defaults.headers.common.Authorization
    }
  }, */
  /**
   * store token in the local storage of browser
   * @author Innovify
   * @developer Innovify
   */
  storeToken(authToken) {
    StorageService.set(STORAGE_KEY, authToken, {
      hash: true,
    });
    this.init();
  },
  /**
   * get token for the local storage
   * @author Innovify
   * @developer Innovify
   */
  get() {
    return StorageService.get(STORAGE_KEY);
  },
  /**
   * clear token set, this method called on logout.
   * @author Innovify
   * @developer Innovify
   */
  clear() {
    // Clearing the whole local storage on logout should be moved
    // into it's own auth status/action handler service
    StorageService.delete(STORAGE_USER);
    return StorageService.delete(STORAGE_KEY);
  },
};

export default AuthTokenService;
