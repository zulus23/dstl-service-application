import { combineReducers } from 'redux';
import authReducer from "./modules/authReducer";

const rootReducer = combineReducers({
    authReducer
})
export default rootReducer