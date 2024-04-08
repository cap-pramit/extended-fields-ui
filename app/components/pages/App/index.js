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
import { isEmpty } from 'lodash';
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
import { LOGIN_URL } from '../../../config/constants';
import { appName, prefix } from '../../../../app-config';

const Protected = userIsAuthenticated(Cap);
export const App = () => {
  const [history] = React.useState(() => getHistoryInstance());

  // setting path in session storage when path changes.
  useEffect(() => {
    if (location.pathname !== '/index.html' ) {
      sessionStorage.setItem(`${appName}_last_visited_path`, location.pathname);
    } 
  }, [location.pathname]);


  useEffect(() => {

    // getting last path from session storage and redirecting to that path.
    const lastPath = sessionStorage.getItem(`${appName}_last_visited_path`);
    const currentPath = window.location.pathname;
    if (!isEmpty(lastPath) && currentPath !== `${prefix}${lastPath}`) {
      console.log('NIKHIL pushing to history: ', lastPath);
      history.push(lastPath);
    }

    // const handleBeforeUnload = (event) => {
    //   console.log('NIKHIL setting data in sessionStorage: ');
    //   if (location.pathname !== '/index.html' ) {
    //     console.log('NIKHIL route saved in session: ', location.pathname);
    //     // localStorageApi.saveItem(`${appName}_last_visited_path`, location.pathname);
    //     sessionStorage.setItem(`${appName}_last_visited_path`, location.pathname);
    //   }
    // };

    const handleCleanSessionStorage = () => {
      console.log('NIKHIL cleaning sessionStorage');
      sessionStorage.removeItem(`${appName}_last_visited_path`);
    };
    // window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleCleanSessionStorage);
    return () => {
      // window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleCleanSessionStorage);
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
