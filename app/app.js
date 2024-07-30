/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';
import {
  VulcanSDKSetup,
  getHistoryInstance,
  configureStore,
  localStorageApi,
} from '@capillarytech/vulcan-react-sdk/utils';

import React from 'react';
import { createRoot } from 'react-dom/client'; // REACT-18 Upgrade
import { Provider } from 'react-redux';
import FontFaceObserver from 'fontfaceobserver';
import 'sanitize.css/sanitize.css';

import {
  SomethingWentWrong,
  Translations,
} from '@capillarytech/vulcan-react-sdk/components';
import App from './components/pages/App';
import { getLocizeMessage, getUserData } from './services/api';

import { publicPath } from './config/path';

import ErrorBoundary from './components/organisms/ErrorBoundary';
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */
import loginReducer from './components/pages/Login/reducer';
import initialState from './initialState';
import {
  appName,
  appType,
  isHostedOnPlatform,
  i18n as i18nConfig,
} from '../app-config';

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

const openSansObserver = new FontFaceObserver('Roboto', {});

// When Roboto is loaded, add a font-family using Robotot to the body
openSansObserver
  .load()
  .then(() => {
    document.body.classList.add('fontLoaded');
  })
  .catch(err => {
    console.log(err);
  });

// Create redux store with history
const history = getHistoryInstance();

const initialReducer = {
  [`${CURRENT_APP_NAME}-login-reducer`]: loginReducer,
};
const store = configureStore(initialState, initialReducer, history);
const MOUNT_NODE = document.getElementById(`${appName}-container`);
const root = createRoot(MOUNT_NODE); // REACT-18 Upgrade

const render = () => {
  // Set this to false if app is going to be part of CRM UI suite.
  // if isHostedOnPlatform == false, then standalone will be marked as false, since we would want the app to use partial URLs when making API calls.
  // this is specifically made for cases where isHostedOnPlatform = false + appType != external, which is the use-case for our core UI modules
  localStorageApi.saveItem(`${appName}__isStandalone`, isHostedOnPlatform);
  root.render(
    <Provider store={store}>
      <Translations.TranslationsProvider>
        <ErrorBoundary FallbackComponent={SomethingWentWrong}>
          <App />
        </ErrorBoundary>
      </Translations.TranslationsProvider>
    </Provider>,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['components/pages/App'], () => {
    render();
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en')]))
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}
