/**
 *
 * Contact
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { injectSaga, injectReducer, clearDataOnUnmount  } from '@capillarytech/vulcan-react-sdk/utils';
import makeSelectContact from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

function Contact(props) {
  const {actions} = props;

  return (
    <div>
      Heading - Contact <br/>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Contact.propTypes = {};

const mapStateToProps = createStructuredSelector({
  contact: makeSelectContact(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

//Do not remove your appName hash from here.
const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-contact`, reducer });
//Do not remove your appName hash from here.
const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-contact`, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(clearDataOnUnmount(Contact, "clearData"));

