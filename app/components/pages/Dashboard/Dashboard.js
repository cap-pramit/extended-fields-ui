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
    <h2>Click on links below to see the api call result.</h2>
    <CapRow>
      <CapColumn span={4}><Link to="/tags">Loyalty Tags</Link></CapColumn>
      <CapColumn span={4}><Link to="/extFields">Extended Fields</Link></CapColumn>
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

