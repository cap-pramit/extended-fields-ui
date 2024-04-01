const { prefix, appType, appName } = require('../../app-config');
const internalLoginUrl = `${prefix}/login`;
const intouchLoginUrl = '/auth/login';

module.exports = {
  publicPath: prefix,
  prefixPath: `${prefix}/`,
  loginPageUrl: () => ({
    development: internalLoginUrl,
    production: appType !== 'external' &&
      process.env.NODE_ENV === 'production' &&
      !localStorage.getItem(`${appName}__isStandalone`)
      ? intouchLoginUrl
      : internalLoginUrl,
  }[process.env.NODE_ENV]),
};
