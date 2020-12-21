import * as actionTypes from './actionTypes';
import { updateObject } from '../../../shared/utility';

const initialState = {
  ingredients: null,
  price: 4,
  error: null,
  authRedirectPath: '/',
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 1,
  meat: 0.8,
};

const addIngredient = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] + 1,
    },
    price: state.price + INGREDIENT_PRICES[action.ingredientType],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] - 1,
    },
    price: state.price - INGREDIENT_PRICES[action.ingredientType],
  };
  return updateObject(state, updatedState);
};

const initIngredients = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    price: 4,
  };
  return updateObject(state, updatedState);
};
const initIngredientsFailed = (state, action) => {
  return updateObject(state, { error: action.error });
};

const authRedirectPath = (state, action) => {
  let path = action.isRedirect ? '/checkout' : '/';
  return updateObject(state, { authRedirectPath: path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.INIT_INGREDIENTS:
      return initIngredients(state, action);
    case actionTypes.INIT_INGREDIENTS_FAILED:
      return initIngredientsFailed(state, action);
    case actionTypes.AUTH_REDIRECT_PATH:
      return authRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
