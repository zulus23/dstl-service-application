import React from 'react';
import ruMessages from 'devextreme/localization/messages/ru.json';
import 'devextreme-intl';
import {loadMessages, locale} from 'devextreme/localization';


import './App.css';
import Header from "./components/header/Header";
import {Redirect, Route, Switch} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginForm from "./components/auth/SignIn";
import TransportPage from "./pages/transport/TransportPage";
import {useSelector} from "react-redux";

const PrivateRoute = ({children, ...rest}) => {
    const isAuthenticated = useSelector(state => state.auth.authenticated);

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}


const App = (props) => {
    //TODO load russion language
    loadMessages(ruMessages);
    locale('ru');


    return (
        <div className="App">
            <Header/>
            <div>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route exact path={'/login'}>
                        <LoginForm/>
                    </Route>
                    <PrivateRoute path="/transport">
                        <TransportPage/>
                    </PrivateRoute>


                </Switch>
            </div>

        </div>
    );


}

export default App;
