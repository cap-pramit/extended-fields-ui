import Bugsnag from '@bugsnag/js';
import React from 'react';
import appConfig from '../../../../app-config';
const useBugsnag = appConfig.bugsnag.useBugsnag;
import { bugsnagInitializer } from '@capillarytech/vulcan-react-sdk/utils';
import { ErrorBoundaryDefault } from '@capillarytech/vulcan-react-sdk/components';
let ErrorBoundary;

if (useBugsnag) {
  bugsnagInitializer({
    // eslint-disable-next-line no-undef
    apiKey: BUGSNAG_API_KEY,
    // eslint-disable-next-line no-undef
    appVersion: BUGSNAG_APP_VERSION,
    releaseStage: window.location.hostname,
  });
  ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
} else {
  ErrorBoundary = ErrorBoundaryDefault;
}

export default ErrorBoundary;
