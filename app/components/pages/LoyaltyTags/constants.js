import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils'

const scope = "/Components/pages/LoyaltyTags/"

export const actionTypes = defineActionTypes(
  {
    CLEAR_DATA: 'CLEAR_DATA',
    GET_LOYALTY_TAGS_REQUEST: 'GET_LOYALTY_TAGS_REQUEST',
    GET_LOYALTY_TAGS_SUCCESS: 'GET_LOYALTY_TAGS_SUCCESS',
    GET_LOYALTY_TAGS_FAILURE: 'GET_LOYALTY_TAGS_FAILURE',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);
