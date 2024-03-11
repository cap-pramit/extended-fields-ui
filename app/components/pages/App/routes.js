import { lazy } from 'react';
const Dashboard = lazy(() => import('../Dashboard'));
const Home = lazy(() => import('../Home'));
const About = lazy(() => import('../About/Loadable'));
const Contact = lazy(() => import('../Contact'));

const routes = [
  {
    exact: true,
    path: `/`,
    component: Dashboard,
  },
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
    exact: true,
    path: `/accessForbidden`,
    component: lazy(() => import('@capillarytech/vulcan-react-sdk/components/AccessForbidden')),
  },
];

export default routes;
