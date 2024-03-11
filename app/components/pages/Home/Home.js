import React from 'react';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import { Link, Outlet } from 'react-router-dom';
import styles from './style';
import { CapRow, CapColumn } from '@capillarytech/cap-ui-library';
import PageTemplate from '../../templates/PageTemplate';
const Home = ({ className, history, ...rest }) => {
  return (
      <div className={className}>
        <h3>We will make xaja api call here and integrate it in org-aettings-ui (updates)</h3>
      </div>
  );
};

export default withStyles(Home, styles);
