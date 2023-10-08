import * as type from '../types';

export function loginRequest(payload) {
  return {
    type: type.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: type.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: type.LOGIN_FAILURE,
    payload,
  };
}
