import * as actionTypes from './actionTypes';
import {updateObject} from '../../../shared/utility';

const initialState = {
  orders: [],
  error: null,
  loader: false,
};

const fatchOrderSuccess = (state, action) => {
  let updatedOrders = [];
  for (let key in action.orders) {
    updatedOrders.push({ ...action.orders[key], orderId: key });
  }
  const updatedState = {
    loader: false,
    orders: updatedOrders,
    error: null,
  };
  return updateObject(state, updatedState);
};

const delOrder = (state, action) => {
  const updatedOrders = state.orders.filter((el) => el.orderId !== action.id);
  return updateObject(state, { orders: [...updatedOrders] });
};

const fatchOrderFailed = (state, action) => {
  return updateObject(state, { loader: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FATCH_ORDER_START:
      return updateObject(state, { loader: true });
    case actionTypes.FATCH_ORDERS_SUCCESS:
      return fatchOrderSuccess(state, action);
    case actionTypes.FATCH_ORDERS_FAILED:
      return fatchOrderFailed(state, action);
    case actionTypes.DEL_ORDER:
      return updateObject(state, delOrder(state, action));
    default:
      return state;
  }
};

export default reducer;
