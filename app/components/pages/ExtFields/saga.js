import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import { actionTypes } from './constants';

export function* getExtendedFields() {
  try {
    const response = yield call(Api.getExtendedFields);
    if (response.success) {
      yield put({
        type: actionTypes.GET_EXTENDED_FIELDS_SUCCESS,
        data: response.entity,
      });
    } else {
      yield put({
        type: actionTypes.GET_EXTENDED_FIELDS_FAILURE,
        error: response?.errors,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_EXTENDED_FIELDS_FAILURE,
      error,
    });
  }
}

export function* watchForGetExtendedFields() {
  yield takeLatest(actionTypes.GET_EXTENDED_FIELDS_REQUEST, getExtendedFields);
}

export default function* () {
  yield all([watchForGetExtendedFields()]);
}
