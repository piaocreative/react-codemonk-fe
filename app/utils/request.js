import { userExists, logout, loginPath, proxyLogin } from './Helper';
import history from './history';
import Emitter from './emitter';
import AuthTokenService from './AuthTokenService';

let configuration = {};
async function updateLocalConfiguration(jsonResponse) {
  try {
    const data = await jsonResponse;
    let emit = false;
    const configurationKeys = ['newQuote', 'newBrief', 'newTimesheet', 'newNotification'];
    configurationKeys.forEach(key => {
      if (typeof data[key] === 'boolean') {
        emit = emit || configuration[key] !== data[key];
        configuration = { ...configuration, [key]: data[key] };
      }
    });
    if (emit) {
      // update UI based on flag
      Emitter.emit('badgeConfigurationUpdated', configuration);
    }
  } catch (e) {
    // API failed / Parse error
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  if (response.status === 401 || response.status === 423) {
    logout();
    const pathname = loginPath();
    history.push({ pathname });
  }
  const jsonResponse = response.json();
  updateLocalConfiguration(jsonResponse);
  return jsonResponse;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  return response;
}

function handleCatch(response) {
  if (response.status === 502) {
    logout();
  }
  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  const option = {
    method: options.method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  };
  if (options.body) {
    option.body = JSON.stringify(options.body);
  }
  if (options.data) {
    option.body = options.data;
  }
  if (options.headers) {
    option.headers = options.headers;
  }

  if (userExists() && proxyLogin()) {
    option.headers.Authorization = `${proxyLogin()}`;
  } else {
    option.headers.Authorization = `${AuthTokenService.get()}`;
  }

  return fetch(url, option)
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleCatch);
}
