import { actionTypes } from './constants';

export const logout = () => ({
  type: actionTypes.LOGOUT_REQUEST,
});

export const loginSuccess = res => ({
  type: actionTypes.LOGIN_SUCCESS,
  res,
});

export const loginFailure = error => ({
  type: actionTypes.LOGIN_FAILURE,
  error,
});

export const getSidebarMenuData = () => ({
  type: actionTypes.GET_SIDEBAR_MENU_DATA_REQUEST,
});

export const getSidebarMenuDataSuccess = data => ({
  type: actionTypes.GET_SIDEBAR_MENU_DATA_SUCCESS,
  data,
});

export const getSidebarMenuDataFailure = error => ({
  type: actionTypes.GET_SIDEBAR_MENU_DATA_FAILURE,
  error,
});

export const clearSidebarMenuData = () => ({
  type: actionTypes.CLEAR_SIDEBAR_MENU_DATA,
});

export const getTopbarMenuData = () => ({
  type: actionTypes.GET_TOPBAR_MENU_DATA_REQUEST,
});

export const getTopbarMenuDataSuccess = data => ({
  type: actionTypes.GET_TOPBAR_MENU_DATA_SUCCESS,
  data,
});

export const getTopbarMenuDataFailure = error => ({
  type: actionTypes.GET_TOPBAR_MENU_DATA_FAILURE,
  error,
});

export const clearTopbarMenuData = () => ({
  type: actionTypes.CLEAR_TOPBAR_MENU_DATA,
});

export const changeOrg = (orgID, successCallback) => ({
  type: actionTypes.SWITCH_ORG_REQUEST,
  orgID,
  successCallback,
});

export const getUserData = () => ({
  type: actionTypes.GET_USER_DATA_REQUEST,
});
