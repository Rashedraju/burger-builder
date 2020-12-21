import * as actionTypes from './actionTypes';
import axios from '../../../axios';

const fatchOrdersStart = () => {
  return {
    type: actionTypes.FATCH_ORDER_START,
  };
};

export const initOrders = (res) => {
  return {
    type: actionTypes.FATCH_ORDERS_SUCCESS,
    orders: res,
  };
};

const fatchOrderFailed = (error) => {
  return {
    type: actionTypes.FATCH_ORDERS_FAILED,
    error: error,
  };
};

export const fatchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fatchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get('/orders.json' + queryParams)
      .then((response) => {
        dispatch(initOrders(response.data));
      })
      .catch((error) => {
        dispatch(fatchOrderFailed(error));
      });
  };
};

export const delOrderSuccess = (orderId) => {
  return {
    type: actionTypes.DEL_ORDER,
    id: orderId,
  };
};

export const delOrder = (orderId, token) => {
  return (dispatch) => {
    axios
      .delete('/orders/' + orderId + '.json?auth=' + token)
      .then((response) => {
        dispatch(delOrderSuccess(orderId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
