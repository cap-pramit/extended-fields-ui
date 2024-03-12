import React, { useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectReducer, injectSaga, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import styles from './style';
import * as actions from './actions';
import { makeSelectTagsData } from './selectors';
import saga from './saga';
import reducer from './reducer';
import { CapTable, CapHeading } from '@capillarytech/cap-ui-library';
import { REQUEST } from '../App/constants';

const LoyaltyTags = ({
  actions,
  tagsData: {
    loyaltyTagsStatus = '',
    loyaltyTags = [],
  } = {},
  className
}) => {
  useEffect(() => {
    actions.getLoyaltyTags();
  }, []);

  const getColumns = () => ([
    {
      title: (
        <CapHeading type="h3">
          Campaign Id
        </CapHeading>
      ),
      key: 'campaignId',
      width: '22.5%',
      render: (text, record) => record.id,
    },
    {
      title: (
        <CapHeading type="h3">
          Campaign Name
        </CapHeading>
      ),
      key: 'campaignName',
      width: '22.5%',
      render: (text, record) => record.name,
    },
    {
      title: (
        <CapHeading type="h3">
          Campaign Type
        </CapHeading>
      ),
      key: 'campaignType',
      width: '22.5%',
      render: (text, record) => record.type,
    },
  ]);
  const columns = React.useMemo(() => getColumns(), [
    loyaltyTags,
  ]);

  const getLoyaltyTagsData = () =>
    (Object.entries(loyaltyTags) || [])
      .map(([key, value]) => ({
        name: value?.campaign_name,
        id: value?.campaign_id,
        type: value?.campaign_type
      }));


  const data = React.useMemo(() => getLoyaltyTagsData(), [loyaltyTags]);

  return (
    <div className={className}>
      <h1>Loyalty Tags</h1>
      <CapTable
        columns={columns}
        dataSource={data}
        loading={loyaltyTagsStatus === REQUEST}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  tagsData: makeSelectTagsData()
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

const withSaga = injectSaga({ key: 'loyaltyTags', saga });
const withReducer = injectReducer({ key: 'loyaltyTags', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withStyles(LoyaltyTags, styles));

