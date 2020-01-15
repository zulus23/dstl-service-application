import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import transport from '../../assets/images/transport.png'
import {ListItemAvatar, ListItemIcon, ListItemText} from "@material-ui/core";
import { Link } from 'react-router-dom';
import {Image} from "@material-ui/icons";

const LinkToTransportPage = () => {
    return (
        <ListItem button key={'Транспорт'} component={Link} to='/transport'>
            <ListItemAvatar>
                <img src={transport}/>
            </ListItemAvatar>
            <ListItemText primary={'Транспорт'}></ListItemText>
        </ListItem>
    );
};

export default LinkToTransportPage;