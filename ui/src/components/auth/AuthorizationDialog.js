import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import SignIn from "./SignIn";
import {useSelector} from "react-redux";


function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const AuthorizationDialog = (props) => {
    const {open, handlerClose} = props;
    const isAuthenticated = useSelector(state => state.authReducer.authenticated)

    return (

        <Dialog
            open={(open && !isAuthenticated)}
            PaperComponent={PaperComponent}
            onClose={(e) => handlerClose()}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move', textAlign: 'center'}} id="draggable-dialog-title">
                Вход
            </DialogTitle>
            <DialogContent>
                <SignIn/>
            </DialogContent>

        </Dialog>

    );
}


export default AuthorizationDialog






