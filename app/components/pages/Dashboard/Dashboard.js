import React from 'react';

import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { injectSaga,injectReducer,clearDataOnUnmount, } from '@capillarytech/vulcan-react-sdk/utils';
import PageTemplate from '../../templates/PageTemplate';
import * as actions from './actions';
import saga from './saga';
import reducer from './reducer';
import { makeSelectDashboard } from './selectors'
import { CapRow, CapColumn } from '@capillarytech/cap-ui-library'

export const Dashboard = () => (
  <PageTemplate>
    <h1>Start editing your files. <br/>You have few routes available to you in routes.js for your reference.</h1>
    <h2>This is your Dashboard page</h2>
    <br/>
    <br/>
    <br/>
    <CapRow>
      <CapColumn span={4}><Link to="/home">Go to Home</Link></CapColumn>
    </CapRow>

  </PageTemplate>
);

Dashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard()
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
)(clearDataOnUnmount(Dashboard, "clearData"));

