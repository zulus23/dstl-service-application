import {call, put, takeLatest} from 'redux-saga/effects'
import * as api from '../api/index'


export const USER_SIGNIN = 'gtk_user_signin_user';
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
            console.log(action);
            return {...state, authenticated: true,token: action.payload.token,error: ''}
        }
        case  AUTHENTICATION_ERROR : {
            return {...state, error: action.payload,authenticated: false,token:''}
        }
        default : {
            return state
        }
    }
}

export function login(user) {
    return {type: USER_SIGNIN, payload: user}

}

export function* authSaga() {
    yield takeLatest(USER_SIGNIN, authorizathion);
}

function* authorizathion(user) {
    try {
        const userData = user.payload;

        let token = yield call(api.authorization,userData);

        yield put(successAuthorized(token.data));

    } catch (e) {
        console.log(e.message);
        yield put({
            type: AUTHENTICATION_ERROR,
            payload: e.message
        })
    }

}
const successAuthorized = (data)=> {
    return {
        type: AUTHENTICATED,
        payload: {token:data}
    }
}


