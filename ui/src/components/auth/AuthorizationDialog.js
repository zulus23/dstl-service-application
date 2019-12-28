import React, {useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import SignIn from "./SignIn";


function PaperComponent(props) {
    return (
        <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function AuthorizationDialog({open,handlerClose}) {


    return (

        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            onClose={(e)=>handlerClose()}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{cursor: 'move',textAlign:'center'}} id="draggable-dialog-title" >
                Вход
            </DialogTitle>
            <DialogContent>
                <SignIn/>
            </DialogContent>

        </Dialog>

    );
}






