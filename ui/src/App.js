import React, {Component} from 'react';
import ruMessages from 'devextreme/localization/messages/ru.json';
import 'devextreme-intl';
import { locale, loadMessages } from 'devextreme/localization';



import './App.css';
import Header from "./components/header/Header";
import {Switch, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginForm from "./components/auth/SignIn";
import noRequireAuth from './components/auth/no_require_auth'

class App extends Component {


    constructor(props, context) {
        super(props, context);
        loadMessages(ruMessages);
        locale('ru');

    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div>
                    <Switch>
                        <Route exact path={'/'} component={HomePage}/>
                        <Route exact path={'/signin'} component={noRequireAuth(LoginForm)}/>
                    </Switch>
                </div>

            </div>
        );

    }
}

export default App;
