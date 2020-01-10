import {call,all, put, takeLatest} from "redux-saga/effects";


import {GTK_CLEAN_CURRENT_USER, GTK_LOAD_CURRENT_USER} from "./commonAction";
import * as api from "../api";

export const GTK_LOAD_LIST_ENTERPRISE = 'GTK_LOAD_LIST_ENTERPRISE';
export const GTK_LOAD_CURRENT_USER_INFO = 'GTK_LOAD_CURRENT_USER_INFO';
export const GTK_CHANGE_CURRENT_ENTERPRISE = 'GTK_CHANGE_CURRENT_ENTERPRISE';


const initialState = {
    error: '',
    enterprises:null,
    currentUser: null,
    selectedEnterprise : 0
}


export default  function userReducer(state = initialState, action) {
     switch (action.type) {

         case GTK_LOAD_LIST_ENTERPRISE : {

             return {...state,enterprises: action.payload}
         }
         case GTK_LOAD_CURRENT_USER_INFO : {
             return {...state, currentUser: action.payload,selectedEnterprise: action.payload.idService}
         }
         case GTK_CHANGE_CURRENT_ENTERPRISE : {
             return {...state, selectedEnterprise: action.payload.idService}
         }
         case GTK_CLEAN_CURRENT_USER : {
             return {...state,enterprises: null, currentUser : null, selectedEnterprise:  null }
         }




         default : {
             return state
         }
     }
}



export function* userInfoSaga() {
    yield all([ takeLatest(GTK_LOAD_CURRENT_USER,loadInformUser)]);
}


function* loadInformUser(data) {
    try {
       const token = data.payload;
       let userInfo = yield  call(api.userInfo,token)
       let enterprises = yield call(api.userEnterprise,token);
        yield put(userInfoSet(userInfo.data))
       yield put(enterpriseUser(enterprises.data))
    } catch (e) {


    }
}




const enterpriseUser = (data) => {
    return {
        type: GTK_LOAD_LIST_ENTERPRISE,
        payload:data
    }
}

const userInfoSet = (data) => {
    return {
        type: GTK_LOAD_CURRENT_USER_INFO,
        payload:data
    }
}

export const changeCurrentEnterprise = (idEnterprise) => {
    return {
        type: GTK_CHANGE_CURRENT_ENTERPRISE,
        payload: {idService:idEnterprise}

    }
}
