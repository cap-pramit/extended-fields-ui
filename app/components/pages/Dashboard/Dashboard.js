import React from 'react';

import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  injectSaga,
  injectReducer,
  clearDataOnUnmount,
} from '@capillarytech/vulcan-react-sdk/utils';
import PageTemplate from '../../templates/PageTemplate';
import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';
import { makeSelectDashboard } from './selectors';

export const Dashboard = () => (
  <PageTemplate>
    <h1>
      Start editing your files. <br />
      You have few routes available to you in routes.js for your reference.
    </h1>
    <h2>This is your Dashboard page</h2>
  </PageTemplate>
);

Dashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'dashboard', saga });
const withReducer = injectReducer({ key: 'dashboard', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(clearDataOnUnmount(Dashboard, 'clearData'));
