import { FETCH_AUTHENTICATION_BEGIN, FETCH_AUTHENTICATION_SUCCESS } from '../actions/authenticationAction';

const initialState = {
  address: null,
  loading: false,
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTHENTICATION_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FETCH_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload.address
      };

    default:
      return state;
  }
}