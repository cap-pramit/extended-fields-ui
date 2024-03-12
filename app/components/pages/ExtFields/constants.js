import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils'

const scope = "/Components/pages/ExtFields/"

export const actionTypes = defineActionTypes(
  {
    CLEAR_DATA: 'CLEAR_DATA',
    GET_EXTENDED_FIELDS_REQUEST: 'GET_EXTENDED_FIELDS_REQUEST',
    GET_EXTENDED_FIELDS_SUCCESS: 'GET_EXTENDED_FIELDS_SUCCESS',
    GET_EXTENDED_FIELDS_FAILURE: 'GET_EXTENDED_FIELDS_FAILURE',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);
