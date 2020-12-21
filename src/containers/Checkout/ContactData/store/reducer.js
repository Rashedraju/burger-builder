import * as actionTypes from './actionTypes';
import { updateObject } from '../../../../shared/utility';

const initialState = {
  error: null,
  loader: false,
  redirect: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_ORDER_START:
      return updateObject(state, { loader: true });
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      return updateObject(state, { loader: false, redirect: true });
    case actionTypes.SUBMIT_ORDER_FAILED:
      return updateObject(state, { error: action.error, loader: false });
    case actionTypes.REDIRECT_AFTER_SUBMIT:
      return updateObject(state, { redirect: false });
    default:
      return state;
  }
};
export default reducer;
