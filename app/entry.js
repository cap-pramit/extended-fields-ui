import { VulcanSDKSetup } from '@capillarytech/vulcan-react-sdk/utils';
import { prefix } from '../app-config';

import { publicPath } from './config/path';

import { getLocizeMessage, getUserData } from './services/api';

import { i18n as i18nConfig, appType, isHostedOnPlatform } from '../app-config';
__webpack_public_path__ = `${
  new URL(((document || {}).currentScript || {}).src || window.location).origin
}${prefix}/`;

VulcanSDKSetup({
  publicPath,
  api: {
    translations: getLocizeMessage,
    auth: getUserData,
  },
  i18nConfig,
  appType,
  isHostedOnPlatform,
});
