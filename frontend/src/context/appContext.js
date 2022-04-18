import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from "./actions";

import reducer from "./reducer";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  isAlert: false,
  alertMessage: "",
  alertClass: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, [2000]);
  };

  const addTokenLocalStorage = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const deleteTokenLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const register = async (newUser) => {
    dispatch({ type: REGISTER_START });

    try {
      const response = await axios.post("/auth/register", newUser);
      const { user, token } = response.data;

      dispatch({ type: REGISTER_SUCCESS, payload: { user, token } });
      addTokenLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const login = async (currentUser) => {
    dispatch({ type: LOGIN_START });
    try {
      const response = await axios.post("/auth/login", currentUser);
      const { user, token } = response.data;

      dispatch({ type: LOGIN_SUCCESS, payload: { user, token } });
      addTokenLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logout = () => {
    deleteTokenLocalStorage();
    dispatch({ type: LOGOUT_SUCCESS });
  };

  return (
    <AppContext.Provider
      value={{ ...state, displayAlert, register, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
