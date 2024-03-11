import { NotFoundPage } from '../../../pages/NotFoundPage/NotFoundPage';

export const naviData = {
  userData: {},
  componentRoutes: [
    {
      exact: true,
      path: '/',
      type: 'login',
      component: NotFoundPage,
    },
  ],
  showSecondaryTopBar: true,
  sidebarMenuItemsPosition: 'left',
};
