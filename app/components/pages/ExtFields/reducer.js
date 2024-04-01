import { fromJS } from 'immutable';
import { actionTypes } from './constants';
import * as constants from '../App/constants';

const { REQUEST, SUCCESS, FAILURE } = constants;

export const initialState = fromJS({
  getExtFieldsStatus: null,
  extendedFields: [],
  getExtFieldsError: null,
});

const extFieldsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXTENDED_FIELDS_REQUEST:
      return state
        .set('getExtFieldsStatus', REQUEST)
        .set('extendedFields', fromJS([]));
    case actionTypes.GET_EXTENDED_FIELDS_SUCCESS:
      return state
        .set('getExtFieldsStatus', SUCCESS)
        .set('extendedFields', action.data);
    case actionTypes.GET_EXTENDED_FIELDS_FAILURE:
      return state
        .set('getExtFieldsStatus', FAILURE)
        .set('getExtFieldsError', action.error);
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default extFieldsReducer;
