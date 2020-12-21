import * as actionTypes from './actionTypes';
import axios from '../../../axios';

export const add = (ingType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: ingType,
  };
};
export const remove = (ingType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: ingType,
  };
};

const fatchInitialIngs = (res) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: res,
  };
};

const fatchInitialIngsFailed = (error) => {
  return {
    type: actionTypes.INIT_INGREDIENTS_FAILED,
    error: error,
  };
};

export const authRedirectPath = (isRedirect) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    isRedirect: isRedirect
  }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('/ingredients.json')
      .then((response) => {
        dispatch(fatchInitialIngs(response.data));
      })
      .catch((error) => {
        dispatch(fatchInitialIngsFailed(error));
      });
  };
};
