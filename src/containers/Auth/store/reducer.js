import * as actionTypes from './actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const authSuccess = (state, action) => {
  const updatedState = {
    ...state,
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  }
  return updateObject(state, updatedState)
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const logout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
