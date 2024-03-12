import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils'

const scope = "/Components/pages/Dashboard/"

export const actionTypes = defineActionTypes(
  {
    CLEAR_DATA: 'CLEAR_DATA',
    TEST_DASHBOARD_REQUEST: 'TEST_DASHBOARD_REQUEST',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);
