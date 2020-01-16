import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga'


import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./rootReducer";
import {Provider} from "react-redux";
import rootSaga from "./redux/modules/rootSaga";
import {BrowserRouter} from "react-router-dom";
import {AUTHENTICATED, verify, VERIFY_TOKEN} from "./redux/modules/auth";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer,composeEnhancers(createStoreWithMiddleware));

sagaMiddleware.run(rootSaga);

const user = localStorage.getItem('userToken');
if(user) {
    console.log(user);
    store.dispatch(verify(user));
}


ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
