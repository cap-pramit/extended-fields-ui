/*
 *
 * Contact actions
 *
 */

import { actionTypes } from './constants';

export function defaultAction() {
  return {
    type: actionTypes.DEFAULT_ACTION,
  };
}

export function clearData(){
  return {
    type: actionTypes.CLEAR_DATA,
  };
}