import * as actionTypes from './actionTypes';
import axios from '../../../../axios';

export const submitOrderStart = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START,
  };
};

export const submitOrderSuccess = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_SUCCESS,
  };
};

export const submitOrderFailed = (error) => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAILED,
    error: error,
  };
};

export const redirectAfterSubmit = () => {
  return {
    type: actionTypes.REDIRECT_AFTER_SUBMIT,
  };
};

export const submitOrder = (orderData, token) => {
  return (dispatch) => {
    dispatch(submitOrderStart());
    axios
      .post('/orders.json?auth=' + token, orderData)
      .then((response) => {
        dispatch(submitOrderSuccess());
      })
      .catch((error) => {
        dispatch(submitOrderFailed(error));
      });
  };
};
