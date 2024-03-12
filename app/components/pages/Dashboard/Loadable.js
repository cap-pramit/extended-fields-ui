import React, { Suspense } from 'react';
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';

const LoadableComponent = React.lazy(() => import('./Dashboard'));

export default () => (
  <Suspense fallback={<CapSpin />}>
    <LoadableComponent />
  </Suspense>
);
