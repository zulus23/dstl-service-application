import { all } from "redux-saga/effects"
import {authSaga} from "./auth";
import {userInfoSaga} from "./user";


export default function* rootSaga() {
    yield all([
        authSaga(),
        userInfoSaga()
        ]
    )
}