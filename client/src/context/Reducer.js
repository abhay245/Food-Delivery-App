import {CLEAR_ALERT,DISPLAY_ALERT,REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR,
LOGIN_USER_BEGIN,LOGIN_USER_SUCCESS,LOGIN_USER_ERROR,LOGOUT_USER} from './Actions'
import { initialState } from './AppContext'
const reducer = (state,action)=>{
    if(action.type===DISPLAY_ALERT){
        return {
          ...state,
          showAlert: true,
          alertType: 'warning',
          alertText: 'Enter your credentials'
        }
    }
    if(action.type===CLEAR_ALERT){
        return {
          ...state,
          showAlert: false,
          alertType: '',
          alertText: ''
        };
    }
    if(action.type===REGISTER_USER_BEGIN){
        return {
          ...state,
          isLoading: true
        };
    }
    if(action.type===REGISTER_USER_SUCCESS){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          user:true,
          token:action.payload,
          alertType: 'success',
          alertText: 'User Created! Redirecting...'
        };
    }
    if(action.type===REGISTER_USER_ERROR){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'warning',
          alertText: 'Error'
        };
    }
    if(action.type===LOGIN_USER_BEGIN){
        return {
          ...state,
          isLoading: true
        };
    }
    if(action.type===LOGIN_USER_SUCCESS){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          user:true,
          token:action.payload,
          alertType: 'success',
          alertText: 'Login Successfully! Redirecting...'
        };
    }
    if(action.type===LOGIN_USER_ERROR){
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: "Invalid Credentials"
        };
    }
    if(action.type===LOGOUT_USER){
      return{
        initialState
      }
    }

    else{
        throw new Error(`No such action: ${action.type}`);

    }
}
export default reducer;
