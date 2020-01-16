import { combineReducers } from 'redux';

import auth from './redux/modules/auth'
import user from './redux/modules/user'


const rootReducer = combineReducers({
    auth,user
})
export default rootReducer