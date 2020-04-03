import { FETCH_CATEGORY_BEGIN, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from '../actions/categoryAction';

const initialState = {
  categories: [],
  loading: false,
  error: null
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories
      };

    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        categories: []
      };

    default:
      return state;
  }
}