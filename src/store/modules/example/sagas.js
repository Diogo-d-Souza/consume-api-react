import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from './actions';

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* exampleRequest() {
  try {
    yield call(request);
    yield put(actions.buttonClickSuccess());
  } catch {
    yield put(actions.buttonClickFailure());
  }
}

export default all([takeLatest(types.BUTTON_CLICKED_REQUEST, exampleRequest)]);
