import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga'


import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./rootReducer";
import {Provider} from "react-redux";
import rootSaga from "./modules/rootSaga";
import {BrowserRouter} from "react-router-dom";

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer,createStoreWithMiddleware);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
