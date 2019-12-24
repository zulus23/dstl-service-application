import React from 'react';
import ReactDOM from 'react-dom';


import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from "redux";
import reduxThunk from 'redux-thunk';
import rootReducer from "./rootReducer";
import {Provider} from "react-redux";

const createStoreWithMiddleware = applyMiddleware(reduxThunk);
const store = createStore(rootReducer,createStoreWithMiddleware);

ReactDOM.render(<Provider store={store}><App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
