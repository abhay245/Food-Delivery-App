import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './Reducer';
import { REGISTER_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS
,DISPLAY_ALERT,CLEAR_ALERT,LOGOUT_USER } from './Actions';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
export const initialState = {
  isMember: false,
  isLoading: false,
  showAlert: false,
  token:'',
  email:'',
  alertType: '',
  alertText: '',
  user: false,
  FoodCat:'',
  FoodItem:'',
};

const AppContext = React.createContext(initialState);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    clearAlert();
    dispatch({ type: DISPLAY_ALERT });
  };
  
  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
};

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
  };
  
  const addUserToLocalStorage = ({ user, token }) => {
   removeUserFromLocalStorage();
    localStorage.setItem('token', token);
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const data = await axios.post("/createuser", currentUser);
      const { authToken,name } = data;
      addUserToLocalStorage({ authToken });
      dispatch({ type: REGISTER_USER_SUCCESS, payload: authToken,name:name });
  
    } catch (error) {
        dispatch({ type: REGISTER_USER_ERROR });
    }
    setTimeout(() => {
      clearAlert();
    }, 5000);
  };
  

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const data = await axios.post("/login", currentUser);
      const {authToken,name}=data;
      addUserToLocalStorage({ user, token});
      dispatch({ type: LOGIN_USER_SUCCESS, payload:authToken,name:name });

    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR });
    }
    setTimeout(() => {
        clearAlert();
      }, 5000);
  };

const logout = ()=>{
    dispatch({type:LOGOUT_USER})
    console.log(state)
    removeUserFromLocalStorage();
    console.log('logout')
}
  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        displayAlert,
        clearAlert,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider, useAppContext };
  