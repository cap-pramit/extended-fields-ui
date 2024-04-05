/**
 *
 * Asynchronously loads the component for Contact
 *
 */

import React, { lazy, Suspense } from 'react';
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
const LoadableComponent = lazy(() => import('./index'));

export default () => (
  <Suspense fallback={<CapSpin />}>
    <LoadableComponent />
  </Suspense>
);
