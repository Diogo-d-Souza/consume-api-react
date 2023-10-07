import * as type from '../types';

export function buttonClickRequest() {
  return {
    type: type.BUTTON_CLICKED_REQUEST,
  };
}

export function buttonClickSuccess() {
  return {
    type: type.BUTTON_CLICKED_SUCCESS,
  };
}

export function buttonClickFailure() {
  return {
    type: type.BUTTON_CLICKED_FAILURE,
  };
}
