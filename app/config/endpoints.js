import { endpointUtil } from "@capillarytech/vulcan-react-sdk/utils";
import { appName, appType } from "../../app-config";

/***
 * Partial endpoints (starting with /) resolve to window.location.origin as host
 * Absolote endpoints (starting with http/https) will hit exact url.
 */

const enviromentEndpoints = {
  // use this for storing fully qualified urls for following
  // development mode
  // test mode
  // standalone mode execution of apps
  absoluteUrls: {
    vulcan_endpoint: 'https://north-america.intouch.capillarytech.com/vulcan/api/v1',
    arya_endpoint: 'https://north-america.intouch.capillarytech.com/arya/api/v1',
  },
  // use this for partial urls added after current window.location.origin
  // production mode
  // embedded in capillary product  mode
  partialUrls: {
    vulcan_endpoint: '/vulcan/api/v1',
    arya_endpoint: '/arya/api/v1',
  }
}

const endpoints = endpointUtil(enviromentEndpoints, appName, appType);
export default endpoints;
