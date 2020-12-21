import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  removeAuthFromLocalStorage();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthLogout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPBl8X7b2yYpdkK0tMJCoBbkGQLOhTP8c';

    if (!method) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPBl8X7b2yYpdkK0tMJCoBbkGQLOhTP8c';
    }
    axios
      .post(url, authData)
      .then((response) => {
        setAuthToLocalStore(response.data.idToken, response.data.localId, response.data.expiresIn)
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthLogout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expiresIn'))
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}


const setAuthToLocalStore = (idToken, localId, expiresIn) => {
  localStorage.setItem('token', idToken);
  localStorage.setItem('userId', localId);
  const logoutTime = new Date(new Date().getTime() + expiresIn * 1000);
  localStorage.setItem('expiresIn', logoutTime);
}

const removeAuthFromLocalStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expiresIn')
}