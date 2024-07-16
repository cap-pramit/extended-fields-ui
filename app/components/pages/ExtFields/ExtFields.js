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

  const getColumns = () => ([
    {
      title: (
        <CapHeading type="h3">
          Extended Field Name
        </CapHeading>
      ),
      key: 'extendedFieldName',
      width: '22.5%',
      render: (text, record) => record.label,
    },
    {
      title: (
        <CapHeading type="h3">
          Data type
        </CapHeading>
      ),
      key: 'dataType',
      width: '22.5%',
      render: (text, record) => record.length || 0,
    },
  ]);

  const columns = React.useMemo(() => getColumns(), [
    extendedFields,
  ]);
  const getExtendedFieldsData = () => extendedFields?.['customer']?.map(field => ({ label: field.label, length: field.dataType }));
  const data = React.useMemo(() => getExtendedFieldsData(), [extendedFields]);

  return (
    <div className={className}>
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

//Do not remove your appName hash from here.
const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}-extFields`, reducer });
//Do not remove your appName hash from here.
const withSaga = injectSaga({ key: `${CURRENT_APP_NAME}-extFields`, saga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
)(withStyles(ExtFields, styles));

