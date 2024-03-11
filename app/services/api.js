import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
import { removeAuthenticationDetais } from '../utils/authWrapper';
import endpoints from '../config/endpoints';
import { publicPath } from '../config/path';
import { LOGIN_URL } from '../config/constants';
import * as requestConstructor from './requestConstructor';

const { getAPICallObject } = requestConstructor;

const API_AUTH_ENDPOINT = endpoints.auth_endpoint;
const ARYA_API_ENDPOINT = endpoints.arya_endpoint;

function redirectIfUnauthenticated(response) {
  const isUnauthorized = response.status === 401;
  const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
  const isAuthUserCall =
    response.url.split('auth')[1] &&
    response.url.split('auth')[1].split('?')[0] === '/user';
  if (isUnauthorized) {
    // if (isProd) {
    //   const originUrl = window.location.origin;
    //   removeAuthenticationDetais();
    //   //TODO: to revisit this.
    //   // window.location = `${originUrl}${config.production.logout_url}`;
    // } else {
      if (isLoginPage && isAuthUserCall) return;
      removeAuthenticationDetais();
    // }
  }
}

const httpRequest = apiCaller.initializeApiCaller({redirectIfUnauthenticated});

export const getLocizeMessage = async locale => {
  const appNameList = ['loyalty_plus'];
  const response = await Promise.all(
    appNameList.map(appName => {
      const url = `${ARYA_API_ENDPOINT}/translations/${appName}/${locale}`;
      return httpRequest(url, getAPICallObject('GET'));
    }),
  );
  let data = {};
  response.forEach(item => {
    data = {
      ...data,
      ...item,
    };
  });
  return data;
};

export const logout = () => {
  const url = `${API_AUTH_ENDPOINT}/logout`;
  return httpRequest(url, getAPICallObject('GET'));
};

export const changeProxyOrg = orgId => {
  const url = `${API_AUTH_ENDPOINT}/setProxy/${orgId}`;
  return httpRequest(url, getAPICallObject('Post'));
};

export const getUserData = () => {
  const url = `${API_AUTH_ENDPOINT}/user`;
  return httpRequest(url, getAPICallObject('GET'));
};
