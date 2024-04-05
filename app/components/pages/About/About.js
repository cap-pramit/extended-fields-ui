/**
 *
 * About
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { injectSaga, injectReducer, clearDataOnUnmount } from '@capillarytech/vulcan-react-sdk/utils';
import makeSelectAbout from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function About(props) {
  const {actions} = props;

  return (
    <div>
      <Helmet>
        <title>Heading - About</title>
        <meta name="description" content="Description of About" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

About.propTypes = {};

const mapStateToProps = createStructuredSelector({
  about: makeSelectAbout(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

//Do not remove your appName hash from here.
const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-about`, reducer });
//Do not remove your appName hash from here.
const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-about`, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(clearDataOnUnmount(About, "clearData"));

