import { fromJS } from 'immutable';
import { actionTypes } from './constants';

export const initialState = fromJS({});

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_ACTION:
      return state;
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default contactReducer;
