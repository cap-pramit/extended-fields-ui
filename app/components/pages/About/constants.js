/*
 *
 * About constants
 *
 */
import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils'

const scope = "/Components/pages/About/"

export const actionTypes = defineActionTypes(
  {
    DEFAULT_ACTION: 'DEFAULT_ACTION',
    CLEAR_DATA: 'CLEAR_DATA',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);


// Define any other constants here like so...
// export const DATE_DISPLAY_FORMAT = 'D MMM YYYY, h:mm:ss A';

