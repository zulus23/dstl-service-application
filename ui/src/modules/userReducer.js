import {call,all, put, takeLatest} from "redux-saga/effects";


import {GTK_CLEAN_CURRENT_USER, GTK_LOAD_CURRENT_USER} from "./commonAction";
import * as api from "../api";

export const GTK_LOAD_LIST_ENTERPRISE = 'GTK_LOAD_LIST_ENTERPRISE';



const initialState = {
    error: '',
    enterprises:null,
    user: null
}


export default  function userReducer(state = initialState, action) {
     switch (action.type) {

         case GTK_LOAD_LIST_ENTERPRISE : {
             console.log("GTK_LOAD_LIST_ENTERPRISE ---- ",action.payload);
             return {...state,enterprises: action.payload}
         }
         case GTK_CLEAN_CURRENT_USER : {
             return {...state,enterprises: null, user : null }
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
       let enterprises = yield call(api.userEnterprise,token);
       yield put(enterpriseUser(enterprises.data))
    } catch (e) {


    }
}




const enterpriseUser = (data) => {
    console.log(" enterpriseUser ",data);
    return {
        type: GTK_LOAD_LIST_ENTERPRISE,
        payload:data
    }
}