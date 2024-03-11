import { endpointUtil } from "@capillarytech/vulcan-react-sdk/utils";

/***
 * Partial endpoints (starting with /) resolve to window.location.origin as host
 * Absolote endpoints (starting with http/https) will hit exact url.
 */

const enviromentEndpoints = {
  development: {
    auth_endpoint: 'https://dev.intouch.capillarytech.com/arya/api/v1/auth',
    arya_endpoint: 'https://dev.intouch.capillarytech.com/arya/api/v1',
  },
  production: {
    auth_endpoint: '/arya/api/v1/auth',
    arya_endpoint: '/arya/api/v1',
  }
}

const endpoints = endpointUtil(enviromentEndpoints);
export default endpoints;