/**
*
* App.js
*
* This component is the skeleton around the actual pages, and should only
* contain code that should be seen on all pages. (e.g. navigation bar)
*
*/
import React from 'react';
import { Switch } from 'react-router-dom';
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

const Protected = userIsAuthenticated(Cap);
export const App = () => {
  const [history] = React.useState(() => getHistoryInstance());

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
