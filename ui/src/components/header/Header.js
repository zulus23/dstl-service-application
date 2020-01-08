import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import {NavLink} from "react-router-dom";
import AuthorizationDialog from '../auth/AuthorizationDialog'
import {connect, useSelector} from "react-redux";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from "@material-ui/core/Menu";
import CurrentUser from "./CurrentUser";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const showDialog = (e) => {
    const dialog = AuthorizationDialog;
    dialog();


}


const Header = (props) => {
    const [openLogin, setOpenLogin] = React.useState(false);
    const classes = useStyles()
    const isAuthenticated = useSelector(state => state.authReducer.authenticated);
    const handlerOpenLogin = (e) => {
        setOpenLogin(true);
    }
    const handlerClose = () => {
        setOpenLogin(false)
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
                {!isAuthenticated ? <Button color="inherit" onClick={handlerOpenLogin}>Login</Button> : <CurrentUser/>}
            </Toolbar>
            <AuthorizationDialog open={openLogin} handlerClose={handlerClose}/>
        </AppBar>

    );

}


export default Header;