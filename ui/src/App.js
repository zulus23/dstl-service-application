import React, {Component, useEffect} from 'react';
import ruMessages from 'devextreme/localization/messages/ru.json';
import 'devextreme-intl';
import { locale, loadMessages } from 'devextreme/localization';



import './App.css';
import Header from "./components/header/Header";
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginForm from "./components/auth/SignIn";
import TransportPage from "./pages/transport/TransportPage";
import AuthorizationDialog from "./components/auth/AuthorizationDialog";
import {useSelector} from "react-redux";
import authReducer from "./modules/authReducer";

const PrivateRoute = ({ children, ...rest }) =>{
    const isAuthenticated = useSelector(state => state.authReducer.authenticated);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
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

    useEffect((props)=> {
        console.log(props);
        loadMessages(ruMessages);
        locale('ru');
    },[])




        return (
            <div className="App">
                <Header/>
                <div>
                    <Switch>
                        <Route exact path={'/'} component={HomePage}/>
                        <Route exact path={'/signin'} component={LoginForm}/>
                        <PrivateRoute path="/transport">
                            <TransportPage/>
                        </PrivateRoute>


                    </Switch>
                </div>

            </div>
        );


}

export default App;
