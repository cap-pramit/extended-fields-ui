import { lazy } from 'react';
const Dashboard = lazy(() => import('../Dashboard/Loadable'));
const LoyaltyTags = lazy(() => import('../LoyaltyTags'));
const ExtFields = lazy(() => import('../ExtFields'));

const routes = [
  {
    path: `/tags`,
    exact: true,
    component: LoyaltyTags,
  },
  {
    path: `/extFields`,
    exact: true,
    component: ExtFields,
  },
  {
    exact: true,
    path: `/accessForbidden`,
    component: lazy(() => import('@capillarytech/vulcan-react-sdk/components/AccessForbidden')),
  },
  // this will be your default / home / landing page route
  {
    exact: true,
    path: `/*`,
    component: Dashboard,
  },
];

export default routes;
