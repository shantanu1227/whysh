export const FETCH_AUTHENTICATION_BEGIN = 'FETCH_AUTHENTICATION_BEGIN';
export const FETCH_AUTHENTICATION_SUCCESS = 'FETCH_AUTHENTICATION_SUCCESS';

export const fetchAuthenticationBegin = () => ({
  type: FETCH_AUTHENTICATION_BEGIN
});

export const fetchAuthenticationSuccess = address => ({
  type: FETCH_AUTHENTICATION_SUCCESS,
  payload: {
    address
  }
});