import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import loginReducer from '../../Login/reducer';
import { render, screen } from '../../../../utils/test-utils';

import { publicPath } from '../../../../config/path';

import { getLocizeMessage, getUserData } from '../../../../services/api';

import { i18n as i18nConfig } from '../../../../../app-config';
import { Translations } from '@capillarytech/vulcan-react-sdk/components';

VulcanSDKSetup({
  publicPath,
  api: {
    translations: getLocizeMessage,
    auth: getUserData,
  },
  i18nConfig,
});

import {
  VulcanSDKSetup,
  getHistoryInstance,
  configureStore,
} from '@capillarytech/vulcan-react-sdk/utils';

import { mockInitialState } from './mocks/initialState';
import { server } from './mocks/msw-handler';

import App from '../../App';

jest.mock('@capillarytech/cap-ui-utils', () => ({
  ...jest.requireActual('@capillarytech/cap-ui-utils'),
  GA: {
    ...jest.requireActual('@capillarytech/cap-ui-utils').GA,
    initialize: jest.fn(),
    setCustomDimension: jest.fn(),
    getCallerName: jest.fn(),
    tracker: {
      trackException: jest.fn(),
    },
  },
}));

const initialReducer = {
  [`${CURRENT_APP_NAME}-login-reducer`]: loginReducer,
};

jest.setTimeout(60000);

let history;

const initializeApp = () => {
  history = getHistoryInstance();
  const store = configureStore(mockInitialState, initialReducer, history);
  history.push('/');

  render(
    <Provider store={store}>
      <Translations.TranslationsProvider>
        <Router history={history}>
          <App />
        </Router>
      </Translations.TranslationsProvider>
    </Provider>,
  );
};

describe('Dashboard', () => {
  // establish API mocking before all tests
  beforeEach(() => {
    server.listen();
    localStorage.clear();
    localStorage.setItem('token', true);
  });

  // clean up once the tests are done
  afterAll(() => {
    server.resetHandlers();
    server.close();
    jest.resetAllMocks();
    delete window?.capAuth;
  });

  it('Should be able to see contents of dashboard page', async () => {
    initializeApp();

    expect(
      await screen.findByText(/This is your Dashboard page/i, {}, null, {
        timeout: 10000,
      }),
    ).toBeInTheDocument();
  });
});
