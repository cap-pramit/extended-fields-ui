import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './_redirectToLoginPage.scss';
import { loginPageUrl } from '../../../config/path';

const originUrl = window.location.origin;

const RedirectToLoginPage = () => {
  const timeoutRef = React.useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      window.location.href = loginPageUrl();
    }, 1000);

    return () => {
      // Clear the timeout on unmount
      clearTimeout(timeoutRef.current);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="redirect-login-page">
      <div className="header">
        <FormattedMessage {...messages.header} />
      </div>
      <div className="message">
        <div>
          <FormattedMessage {...messages.message} />
        </div>
        <div>
          <FormattedMessage {...messages.loginAgainMessage} />
        </div>
      </div>
    </div>
  );
};

export default RedirectToLoginPage;
