/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React, { useEffect} from 'react';
import { Switch } from 'react-router-dom';
import { isEmpty, isNil } from 'lodash';
import { compose } from 'redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { getHistoryInstance, injectSaga } from '@capillarytech/vulcan-react-sdk/utils';

import { userIsAuthenticated } from '../../../utils/authWrapper';

import Cap from '../Cap';
import Login from '../Login';
import loginSagas from '../Login/saga';
import { NotFoundPage } from '@capillarytech/vulcan-react-sdk/components';

import GlobalStyle from '../../../global-styles';

import RenderRoute from '../../atoms/RenderRoute';
import { LAST_VISITED_PATH, HISTORY_PATH, INDEX_PATH } from './constants';
import { LOGIN_URL } from '../../../config/constants';
import { appName, prefix } from '../../../../app-config';

const Protected = userIsAuthenticated(Cap);
export const App = () => {
  const [history] = React.useState(() => getHistoryInstance());

  // save last visited path in session
  const lastVisitedPathFieldName = `${appName}${LAST_VISITED_PATH}`;
  const historyFieldName = `${appName}${HISTORY_PATH}`;
  const setLastVisitedToSession = path => {
    const sanitizedPath = path.replace(prefix, '');
    // handle non-index and index paths separately
    sessionStorage.setItem(
      lastVisitedPathFieldName,
      isEmpty(sanitizedPath) || sanitizedPath === INDEX_PATH
        ? '/'
        : sanitizedPath,
    );
  };
  const redirectToLastVisitedPath = () => {
    // check type of operation done on browser
    const navType = window?.performance?.navigation?.type;
    if (!isNil(navType)) {
      let lastPath = '';
      // if the page is reloaded, redirect to the last visited page using last visited path session item
      if (navType === window.performance.navigation.TYPE_RELOAD) {
        lastPath = sessionStorage.getItem(lastVisitedPathFieldName);
      }
      // if the browser is navigated back and forth, redirect to the last visited page using nav history list
      else if (navType === window.performance.navigation.TYPE_BACK_FORWARD) {
        const str = sessionStorage.getItem(historyFieldName);
        let existingHistory = !isEmpty(str) ? JSON.parse(str) : [];
        // extract 2nd last path from history list, as last path is current path
        existingHistory.pop();
        lastPath = existingHistory.pop();
        // if nav history becomes empty push home route in nav history session item
        if (existingHistory.length === 0) {
          existingHistory.push('/');
        }
        // save the remaining nav history back to session
        sessionStorage.setItem(
          historyFieldName,
          JSON.stringify(existingHistory),
        );
      }
      const currentPath = window.location.pathname;
      // if last path is not empty and last path is not the current path, redirect to last path
      if (!isEmpty(lastPath) && currentPath !== `${prefix}${lastPath}`) {
        history.push(lastPath);
      }
    }
  };
  // listen and collect nav history on each route change
  const handleHistoryListener = location => {
    const str = sessionStorage.getItem(historyFieldName);
    let existingHistory = !isEmpty(str) ? JSON.parse(str) : [];
    const lastHistoryItem = existingHistory.slice(-1)?.[0];
    if (lastHistoryItem !== location.pathname) {
      if (location.pathname === INDEX_PATH || location.pathname === '/') {
        existingHistory = [];
      } else {
        // if the browser is navigated back and forth, do not add the same path to history list
        const pathIndex = existingHistory.indexOf(location.pathname);
        if (pathIndex < 0) {
          existingHistory.push(location.pathname);
        } else {
          existingHistory = existingHistory.slice(0, pathIndex + 1);
        }
      }
      sessionStorage.setItem(historyFieldName, JSON.stringify(existingHistory));
    }
  };
  // on mount, add event handler to capture last visited path before window is unloaded
  // on mount, redirect to last visited path if the page has been reloaded
  useEffect(() => {
    // record the last visited path in session storage before window is unloaded
    const handleBeforeUnload = event => {
      setLastVisitedToSession(location.pathname);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    const listener = history.listen(handleHistoryListener);
    redirectToLastVisitedPath();
    return () => {
      listener();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className={CURRENT_APP_NAME}>
      <ConnectedRouter history={history}>
        <Switch>
          <RenderRoute exact path={LOGIN_URL} component={Login} />
          <RenderRoute path="/" component={Protected} key="/" />
          <RenderRoute component={NotFoundPage} />
        </Switch>
      </ConnectedRouter>
      <GlobalStyle />
    </div>
  );
};

//Logout saga's should be injected at all times even if login page is unmounted. Hence daemon mode
//todo move to constant later.
const withSaga = loginSagas.map((saga, index) =>
  injectSaga({ key: `${CURRENT_APP_NAME}-login-${index}`, saga, mode: "@@saga-injector/daemon" }),
);

export default compose(...withSaga)(App);
