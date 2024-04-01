import { fromJS } from 'immutable';
import { actionTypes } from './constants';
import * as constants from '../App/constants';

const { REQUEST, SUCCESS, FAILURE } = constants;

export const initialState = fromJS({
  loyaltyTagsStatus: null,
  loyaltyTags: [],
  loyaltyTagsError: null,
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LOYALTY_TAGS_REQUEST:
      return state
        .set('loyaltyTagsStatus', REQUEST)
        .set('loyaltyTags', fromJS([]));
    case actionTypes.GET_LOYALTY_TAGS_SUCCESS:
      return state
        .set('loyaltyTagsStatus', SUCCESS)
        .set('loyaltyTags', action.data);
    case actionTypes.GET_LOYALTY_TAGS_FAILURE:
      return state
        .set('loyaltyTagsStatus', FAILURE)
        .set('loyaltyTagsError', action.error);
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
