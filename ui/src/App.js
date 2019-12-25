import React, {Component} from 'react';

import './App.css';
import SignIn from "./components/auth/SignIn";
import Header from "./components/header/Header";
import {Switch, Route} from 'react-router-dom'
import HomePage from "./pages/HomePage";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div>
                    <Switch>
                        <Route exact path={'/'} component={HomePage}/>
                        <Route exact path={'/signin'} component={SignIn}/>
                    </Switch>
                </div>

            </div>
        );

    }
}

export default App;
