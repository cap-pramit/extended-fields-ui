import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
import endpoints from '../config/endpoints';
import { loginPageUrl } from '../config/path';
import * as requestConstructor from './requestConstructor';
import { IS_PROD } from '../config/constants';
import { appType, appName } from '../../app-config';

const { getVulcanAPICallObject, getAryaAPICallObject } = requestConstructor;

function redirectIfUnauthenticated(response) {
  const { removeAuthenticationDetais } = require('../utils/authWrapper');
  const isUnauthorized = response.status === 401;
  const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
  const isAryaAuthUserCall =
    response.url.split('auth')[1] &&
    response.url.split('auth')[1].split('?')[0] === '/user';
  const isAuthUserCall =
    response.url.split('/api/v1')[1] &&
    response.url.split('/api/v1')[1].split('?')[0] === '/authenticate';
  if (isUnauthorized) {
    if (IS_PROD) {
      removeAuthenticationDetais();
      const isEmbedded =
        appType !== 'external' &&
        process.env.NODE_ENV === 'production' &&
        localStorage.getItem(`${appName}__isStandalone`) !== 'true';
      if (isEmbedded) {
        window.location.href = loginPageUrl();
      }
    } else {
      if (isLoginPage && (isAuthUserCall || isAryaAuthUserCall)) return;
      removeAuthenticationDetais();
    }
  }
}

// dummy for prepareVulcanSuccessResponseStructure function

const httpRequest = apiCaller.initializeApiCaller({
  redirectIfUnauthenticated,
});

export const getLocizeMessage = async locale => {
  const url = `${endpoints.vulcan_endpoint}/translations/${locale}`;
  return httpRequest(url, getVulcanAPICallObject('GET'));
};

export const getSupportedLocales = () => {
  const url = `${endpoints.arya_endpoint}/translations/supportedLocales`;
  return httpRequest(url, getAryaAPICallObject('GET'));
};

export const logout = () => {
  const url = `${endpoints.arya_endpoint}/auth/logout`;
  return httpRequest(url, getAryaAPICallObject('GET'));
};

export const changeProxyOrg = orgId => {
  const url = `${endpoints.arya_endpoint}/auth/setProxy/${orgId}`;
  return httpRequest(url, getAryaAPICallObject('Post'));
};

export const getUserData = async () => {
  const url = `${endpoints.vulcan_endpoint}/authenticate`;
  return httpRequest(url, getVulcanAPICallObject('GET'));
};

export const getLoyaltyTags = () => {
  const url = `${
    endpoints.vulcan_endpoint
  }/xaja/AjaxService/campaign_v2/get_campaign_data.json?ajax_params_1=Live&ajax_params_2=all&ajax_params_3=0&ajax_params_4=20`;
  return httpRequest(url, getVulcanAPICallObject('GET'));
};

export const getExtendedFields = () => {
  const url = `${
    endpoints.vulcan_endpoint
  }/intouch/v2/org/extendedFields?includePossibleValues=false`;
  return httpRequest(url, getVulcanAPICallObject('GET'));
};
