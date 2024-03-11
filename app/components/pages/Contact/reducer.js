/*
 *
 * Contact reducer
 *
 */

import produce from 'immer';
import { actionTypes } from './constants';

export const initialState = {};

const contactReducer = produce((state, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_ACTION:
      return state;
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}, initialState);

export default contactReducer;
