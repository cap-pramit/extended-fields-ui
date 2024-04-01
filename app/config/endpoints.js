import { endpointUtil } from "@capillarytech/vulcan-react-sdk/utils";
import { appName, appType } from "../../app-config";
import { EXTERNAL } from '../components/pages/App/constants'

/***
 * Partial endpoints (starting with /) resolve to window.location.origin as host
 * Absolote endpoints (starting with http/https) will hit exact url.
 */

const enviromentEndpoints = {
  development: {
    auth_endpoint: 'https://dev.intouch.capillarytech.com/arya/api/v1/auth',
    arya_endpoint: 'https://dev.intouch.capillarytech.com/arya/api/v1',
    vulcan_api_endpoint: 'https://dev.intouch.capillarytech.com/vulcan/api/v1',
  },
  production: {
    auth_endpoint: '/arya/api/v1/auth',
    arya_endpoint: '/arya/api/v1',
    vulcan_api_endpoint: '/vulcan/api/v1',
  }
}

const isPartialpathAllowed =
  appType !== EXTERNAL &&
  localStorage.getItem(`${appName}__isStandalone`) === 'false' &&
  process.env.NODE_ENV === 'production';
const endpoints = endpointUtil(enviromentEndpoints, isPartialpathAllowed);
export default endpoints;