import React, {useEffect, useState} from 'react';
import {useTheme} from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LinkToTransportPage from "../common/LinkToTransportPage";

const drawerWidth = 240;
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
const  DrawerLeft = (props) => {
    const classes = useStyles();
    //const [stateOpen, setStateOpen] = useState( props.open);
    const toggleDrawer = props.toggleDrawer;
    const stateOpen = props.open;

    const sideList = side => (

        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['План отгрузок', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <LinkToTransportPage/>
            </List>
        </div>
    );


    return (
        <div>
            <Drawer open={stateOpen} onClose={toggleDrawer( false)}>
                {sideList('left')}
            </Drawer>
        </div>
    )
}
export default DrawerLeft;