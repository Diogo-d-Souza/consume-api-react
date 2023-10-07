import * as types from '../types';

const initialState = {
  buttonClicked: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.BUTTON_CLICKED_SUCCESS: {
      console.log('Sucesso');
      const newState = { ...state };
      newState.buttonClicked = !newState.buttonClicked;
      return newState;
    }

    case types.BUTTON_CLICKED_FAILURE: {
      console.log('Erro');
      return state;
    }

    case types.BUTTON_CLICKED_REQUEST: {
      console.log('Request');
      return state;
    }

    default: {
      return state;
    }
  }
}
