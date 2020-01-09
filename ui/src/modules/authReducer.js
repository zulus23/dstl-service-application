import {call, put, takeLatest,all} from 'redux-saga/effects'
import * as api from '../api/index'
import {cleanCurrentUser, GTK_LOAD_CURRENT_USER, loadCurrentUser} from "./commonAction";


export const USER_SIGNIN = 'gtk_user_signin_user';
export const USER_SIGNOUT = 'gtk_user_signout_user';
export const VERIFY_TOKEN = 'gtk_verify_token';
export const AUTHENTICATED = 'gtk_authenticated_user';
export const UNAUTHENTICATED = 'gtk_unauthenticated_user';
export const AUTHENTICATION_ERROR = 'gtk_authentication_error';


const initialState = {
    authenticated: false,
    error: '',
    token: '',
}


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATED : {

            return {...state, authenticated: true, token: action.payload.token, error: ''}
        }
        case  AUTHENTICATION_ERROR : {
            return {...state, error: action.payload, authenticated: false, token: ''}
        }
        case UNAUTHENTICATED : {
            return {...state,authenticated: false,token: ''}
        }
        default : {
            return state
        }
    }
}

export function login(user) {
    return {type: USER_SIGNIN, payload: user}

}
export function logout() {
    return {type: USER_SIGNOUT}

}


export function verify(token) {
     return {type: VERIFY_TOKEN, payload: token}

}


export function* authSaga() {
   yield all([ takeLatest(USER_SIGNIN, authorizathion),takeLatest(VERIFY_TOKEN, verifyToken),takeLatest(USER_SIGNOUT,userSignout)]);
}
function* userSignout() {
    try {
        localStorage.removeItem('userToken');
        yield put({type:UNAUTHENTICATED});
        yield put(cleanCurrentUser())


    } catch (e) {

        yield put({
            type: AUTHENTICATION_ERROR,
            payload: e.message
        })
    }
}



function* verifyToken(data) {
    try {
        const token = data.payload;
        console.log(data);
        let tokenData = yield call(api.verify, token);
        console.log('tokenData ---- ', tokenData);
        yield put(successAuthorized(token));
        yield put(loadCurrentUser(token));


    } catch (e) {

        yield put({
            type: AUTHENTICATION_ERROR,
            payload: e.message
        })
    }
}

function* authorizathion(user) {
    try {
        const userData = user.payload;

        let token = yield call(api.authentication, userData);
        console.log(" token ",token);
        yield put(successAuthorized(token.data));
        yield put(loadCurrentUser(token.data));
        localStorage.setItem('userToken', token.data);

    } catch (e) {
        console.log(e.message);
        yield put({
            type: AUTHENTICATION_ERROR,
            payload: e.message
        })
    }

}

const successAuthorized = (data) => {
    return {
        type: AUTHENTICATED,
        payload: {token: data}
    }
}


