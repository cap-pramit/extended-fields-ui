import React, { useEffect } from 'react';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectReducer, injectSaga, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import styles from './style';
import * as actions from './actions';
import { makeSelectExtendedFieldsData } from './selectors';
import saga from './saga';
import reducer from './reducer';
import { CapTable, CapHeading } from '@capillarytech/cap-ui-library';
import { REQUEST } from '../App/constants';

const ExtFields = ({
  actions,
  extendedFieldsData: {
    getExtFieldsStatus = '',
    extendedFields = [],
  } = {},
  className
}) => {
  useEffect(() => {
    actions.getExtendedFields();
  }, []);

  const getColumns = () => ([{
    title: (
      <CapHeading type="h3">
        Extended Field Name
      </CapHeading>
    ),
    key: 'extendedFieldName',
    width: '22.5%',
    render: (text, record) => record.label,
  }]);

  const columns = React.useMemo(() => getColumns(), [
    extendedFields,
  ]);
  const getExtendedFieldsData = () => extendedFields?.['customer']?.map(field => ({ label: field.label }));
  const data = React.useMemo(() => getExtendedFieldsData(), [extendedFields]);

  return (
    <div className={className}>
      <h1>Extended Fields</h1>
      <CapTable
        columns={columns}
        dataSource={data}
        loading={getExtFieldsStatus === REQUEST}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  extendedFieldsData: makeSelectExtendedFieldsData()
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

const withSaga = injectSaga({ key: 'extFields', saga });
const withReducer = injectReducer({ key: 'extFields', reducer });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withStyles(ExtFields, styles));

