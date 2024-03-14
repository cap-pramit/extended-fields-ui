import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
import endpoints from '../config/endpoints';
import * as requestConstructor from './requestConstructor';

const { getAPICallObject } = requestConstructor;

const API_AUTH_ENDPOINT = endpoints.auth_endpoint;
const ARYA_API_ENDPOINT = endpoints.arya_endpoint;
const VULCAN_API_ENDPOINT = endpoints.vulcan_api_endpoint;

function redirectIfUnauthenticated(response) {
  const { removeAuthenticationDetais } = require('../utils/authWrapper');
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

export const getLoyaltyTags = () => {
  const url = `${VULCAN_API_ENDPOINT}/xaja/AjaxService/campaign_v2/get_campaign_data.json?ajax_params_1=Live&ajax_params_2=all&ajax_params_3=0&ajax_params_4=20`;
  return httpRequest(url, getAPICallObject('GET', undefined, undefined, {
    headers: {
      'x-cap-vulcan-app-id': 'de937dd5e20986b06c53fb01',
      'x-cap-vulcan-app-env': 'prod',
    }
  }));
};

export const getExtendedFields = () => {
  const url = `${VULCAN_API_ENDPOINT}/intouch/v2/org/extendedFields?includePossibleValues=false`;
  return httpRequest(url, getAPICallObject('GET', undefined, undefined, {
    headers: {
      'x-cap-vulcan-app-id': 'de937dd5e20986b06c53fb01',
      'x-cap-vulcan-app-env': 'prod',
    }
  }));
};
