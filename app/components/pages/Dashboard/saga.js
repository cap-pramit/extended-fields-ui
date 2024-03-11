import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import { actionTypes } from './constants';

export function* testDashboard() {
  console.log('test dashboard saga');
}

export function* watchForTestDashboard() {
  yield takeLatest(actionTypes.TEST_DASHBOARD_REQUEST, testDashboard);
}

export default function*() {
  yield all([watchForTestDashboard()]);
}
