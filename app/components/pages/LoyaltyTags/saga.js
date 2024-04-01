import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import { actionTypes } from './constants';

export function* getLoyaltyTags() {
  try {
    const response = yield call(Api.getLoyaltyTags);
    if (response.success) {
      yield put({
        type: actionTypes.GET_LOYALTY_TAGS_SUCCESS,
        data: response.result?.listitem,
      });
    } else {
      yield put({
        type: actionTypes.GET_LOYALTY_TAGS_FAILURE,
        error: response?.error,
      });
    }
    
  } catch (error) {
    yield put({
      type: actionTypes.GET_LOYALTY_TAGS_FAILURE,
      error,
    });
  }
}

export function* watchForGetLoyaltyTags() {
  yield takeLatest(actionTypes.GET_LOYALTY_TAGS_REQUEST, getLoyaltyTags);
}

export default function* () {
  yield all([watchForGetLoyaltyTags()]);
}
