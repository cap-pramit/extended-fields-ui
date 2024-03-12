import { fromJS } from 'immutable';
import { actionTypes } from './constants';
import * as constants from '../App/constants';

const { REQUEST, SUCCESS, FAILURE } = constants;

export const initialState = fromJS({
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default dashboardReducer;
