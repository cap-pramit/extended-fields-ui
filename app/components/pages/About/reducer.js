/*
 *
 * About reducer
 *
 */

import produce from 'immer';
import { actionTypes } from './constants';

export const initialState = {};

const aboutReducer = produce((state, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_ACTION:
      return state;
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
}, initialState);

export default aboutReducer;
