import { combineReducers } from 'redux';
import authReducer from "./modules/authReducer";
import userReducer from "./modules/userReducer";

const rootReducer = combineReducers({
    authReducer,userReducer
})
export default rootReducer