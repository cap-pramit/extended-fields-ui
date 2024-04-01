import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { InternalIntouchLogin } from '@capillarytech/vulcan-react-sdk/components';
import endpoints from '../../../config/endpoints';
import * as actions from './actions';
import messages from './messages';
import { userIsNotAuthenticated } from '../../../utils/authWrapper';
import { appType } from '../../../../app-config';
import PageTemplate from '../../templates/PageTemplate';

const AUTH_URL = endpoints.auth_endpoint + '/login';

const Login = (props) => {
  const { actions, intl: { formatMessage } = {}, history } = props;
  const { loginSuccess, loginFailure } = actions;
  const onSuccess = (response) => {
    loginSuccess(response);
    history.push('/');
  };
  const onFailure = (err) => {
    loginFailure(err);
  };

  const isNativeApp = appType !== 'external';
  return (
    <>
      <FormattedMessage {...messages.login}>
        {(message) => (
          <Helmet
            title={message}
            meta={[
              {
                name: 'description',
                content: <FormattedMessage {...messages.loginPage} />,
              },
            ]}
          />
        )}
      </FormattedMessage>
      {isNativeApp ? (
        <InternalIntouchLogin
          signInLabel={formatMessage(messages.signIn)}
          userNameLabel={formatMessage(messages.userName)}
          passwordLabel={formatMessage(messages.password)}
          apiEndPoint={AUTH_URL}
          onSuccess={onSuccess}
          onFailure={onFailure}
        />
      ) : (
        <PageTemplate>
          <br/>
          <h1>Login Page</h1>
          <br/>
          <h2>
            Since you have a custom or external app, you can create your own Login Component and render it inside Login.js. <br/>
            You can pass this props: signInLabel, userNameLabel, passwordLabel, onSuccess and onFailure. <br/>
            call onSuccess() when your api call succeeds and call onFailure() when your api call fails. <br/>
            Run command `npm run generate` to generate component boilerplate and render it inside Login.js.
          </h2>
        </PageTemplate>

      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose.apply(null, [
  withRouter,
  userIsNotAuthenticated,
  withConnect,
])(injectIntl(Login));
