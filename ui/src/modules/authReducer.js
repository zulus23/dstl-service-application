import {call, put, takeLatest,all} from 'redux-saga/effects'
import * as api from '../api/index'


export const USER_SIGNIN = 'gtk_user_signin_user';
export const VERIFY_TOKEN = 'gtk_verify_token';
export const AUTHENTICATED = 'gtk_authenticated_user';
export const UNAUTHENTICATED = 'gtk_unauthenticated_user';
export const AUTHENTICATION_ERROR = 'gtk_authentication_error';


const initialState = {
    authenticated: false,
    error: '',
    user: {},
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
        default : {
            return state
        }
    }
}

export function login(user) {
    return {type: USER_SIGNIN, payload: user}

}

export function verify(token) {
    console.log(token);
    return {type: VERIFY_TOKEN, payload: token}

}


export function* authSaga() {
   yield all([ takeLatest(USER_SIGNIN, authorizathion),takeLatest(VERIFY_TOKEN, verifyToken)]);
}

function* verifyToken(data) {
    try {
        const token = data.payload;
        console.log(data);
        let tokenData = yield call(api.verify, token);
        console.log(tokenData);
        yield put(successAuthorized(token));


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
        yield put(successAuthorized(token.data));
        localStorage.setItem('user', token.data);

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


