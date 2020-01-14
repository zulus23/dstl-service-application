import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import transport from '../../assets/images/transport.png'
import {ListItemIcon, ListItemText} from "@material-ui/core";
import { Link } from 'react-router-dom';

const LinkToTransportPage = () => {
    return (
        <ListItem button key={'Транспорт'} component={Link} to='/transport'>
            <ListItemIcon><img src={transport}/> </ListItemIcon>
            <ListItemText primary={'Транспорт'}></ListItemText>
        </ListItem>
    );
};

export default LinkToTransportPage;