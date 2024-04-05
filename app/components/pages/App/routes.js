import { lazy } from 'react';
const Dashboard = lazy(() => import('../Dashboard/Loadable'));
const Home = lazy(() => import('../Home/Loadable'));
const About = lazy(() => import('../About/Loadable'));
const Contact = lazy(() => import('../Contact/Loadable'));
const LoyaltyTags = lazy(() => import('../LoyaltyTags'));
const ExtFields = lazy(() => import('../ExtFields'));

const routes = [
  {
    path: `/home`,
    component: Home,
    routes: [
      {
        exact: true,
        path: `/home/about`,
        component: About,
      },
      {
        exact: true,
        path: `/home/contact`,
        component: Contact,
      },
    ],
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
  // this will be your default / home / landing page route
  {
    exact: true,
    path: `/*`,
    component: Dashboard,
  },
];

export default routes;