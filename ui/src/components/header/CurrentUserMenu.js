import React,{Fragment} from 'react';
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/modules/auth";





const CurrentUserMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userLogout = useDispatch();

    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = event => {
        console.log(event);
        setAnchorEl(event.currentTarget);
    };



    const handleMenuClose = () => {
        setAnchorEl(null);

    };
    const handleMenuLoginOut = () => {
       userLogout(logout())
    }


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            id={menuId}

            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuLoginOut}>Выйти</MenuItem>
        </Menu>
    );






    return (
        <Fragment>
        <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}

            color="inherit"
        >
            <AccountCircle/>
        </IconButton>
            {renderMenu}
        </Fragment>
    );
};

export default CurrentUserMenu;