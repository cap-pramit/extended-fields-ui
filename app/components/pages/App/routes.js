import { lazy } from 'react';
const Dashboard = lazy(() => import('../Dashboard'));
const LoyaltyTags = lazy(() => import('../LoyaltyTags'));
const ExtFields = lazy(() => import('../ExtFields'));

const routes = [
  {
    exact: true,
    path: `/`,
    component: Dashboard,
  },
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
];

export default routes;
