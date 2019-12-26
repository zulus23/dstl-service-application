import { all } from "redux-saga/effects"
import {authSaga} from "./authReducer";


export default function* rootSaga() {
    yield all([
        authSaga()
        ]
    )
}