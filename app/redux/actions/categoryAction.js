export const FETCH_CATEGORY_BEGIN = 'FETCH_CATEGORY_BEGIN';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

export const fetchCategoryBegin = () => ({
  type: FETCH_CATEGORY_BEGIN
});

export const fetchCategorySuccess = categories => ({
  type: FETCH_CATEGORY_SUCCESS,
  payload: {
    categories
  }
});

export const fetchCategoryFailure = error => ({
  type: FETCH_CATEGORY_FAILURE,
  payload: {
    error
  }
});