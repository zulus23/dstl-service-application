import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import transport from '../../assets/images/transport.png'
import {ListItemAvatar, ListItemText} from "@material-ui/core";
import {Link} from 'react-router-dom';

const LinkToTransportPage = () => {
    return (
        <ListItem button key={'Транспорт'} component={Link} to='/transport'>
            <ListItemAvatar>
                <img src={transport} alt={'Транспорт'}/>
            </ListItemAvatar>
            <ListItemText primary={'Транспорт'}></ListItemText>
        </ListItem>
    );
};

export default LinkToTransportPage;