import { all } from "redux-saga/effects"
import {authSaga} from "./authReducer";
import {userInfoSaga} from "./userReducer";


export default function* rootSaga() {
    yield all([
        authSaga(),
        userInfoSaga()
        ]
    )
}