import React, {Component} from 'react';

import './App.css';
import Header from "./components/header/Header";
import {Switch, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginForm from "./components/auth/SignIn";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div>
                    <Switch>
                        <Route exact path={'/'} component={HomePage}/>
                        <Route exact path={'/signin'} component={LoginForm}/>
                    </Switch>
                </div>

            </div>
        );

    }
}

export default App;
