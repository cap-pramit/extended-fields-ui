import React from 'react';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import { Link, Outlet } from 'react-router-dom';
import styles from './style';
import { CapRow, CapColumn } from '@capillarytech/cap-ui-library';
import PageTemplate from '../../templates/PageTemplate';
const Home = ({ className, history, ...rest }) => {
  return (
    <PageTemplate>
      <div className={className}>
        <h1>This is your home page</h1>
        <br />
        <CapRow>
          <CapColumn span={4}>
            <Link to="/home/about">About</Link>
          </CapColumn>
          <CapColumn span={4}>
            <Link to="/home/contact">Contact</Link>
          </CapColumn>
          <CapColumn span={4}>
            <Link to="/">Back to dashboard</Link>
          </CapColumn>
        </CapRow>
        <div class="children-routes">{rest.children}</div>
      </div>
    </PageTemplate>
  );
};

export default withStyles(Home, styles);
