import React, {Fragment, useEffect} from "react";
import './SignIn.css'
import {Form, Formik, useField, } from "formik";
import {Button, CircularProgress, makeStyles, TextField} from "@material-ui/core";
import {login} from "../../redux/modules/auth";
import {useDispatch, useSelector} from "react-redux";
import {
    useHistory,
    useLocation
} from "react-router-dom";


const useStyles = makeStyles( theme => {
    return {
        errorMessage: {color: theme.palette.error.dark, textAlign: "center"},
        dialog: {width: '300px', height: '200px', margin: '10px auto'},
        field_input: {width: '100%'},

    };
});


const MyTextField = ({placeholder, type, ...props}) => {
    const [field] = useField(props)

    return (
        <TextField placeholder={placeholder} type={type}{...field}
                   style={{width: '100%', paddingBottom: '10px', textAlign: "center"}}/>
    )
}



const SignInForm = (props) => {
    const isAuthenticated = useSelector(state => state.auth.authenticated);
    const error = useSelector(state => state.auth.error);

    const loginDispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const t = async (userData) => {

        await loginDispatch(login(userData));
    }
    const handlerSubmit = (values, actions) => {

        console.log(actions);
        actions.setSubmitting(true);
        const userData = trimVal(values);
        t(userData);

        actions.setSubmitting(false);
    }
    useEffect(() => {

        if (isAuthenticated) {
            history.replace(from);
        } else {

        }
    },[isAuthenticated,error])
    return (
        <div className={classes.dialog}>
            <Formik initialValues={{username: "", password: ""}} onSubmit={handlerSubmit }>
                {({ values, errors, touched,isSubmitting }) => (

                    <Fragment>


                    <Form autoComplete="off">
                        {(error ) ? <div>{JSON.stringify(touched, null, 2)}</div> :null}

                        <div className={classes.field_input}>
                            <MyTextField name='username' placeholder='имя пользователя' type={"input"}/>
                        </div>
                        <div className={classes.field_input}>
                            <MyTextField name='password' placeholder='пароль' type={"password"}/>
                        </div>
                        <div style={{height: '100px', display: 'flex', alignItems: 'center'}}>
                            <Button disabled={isSubmitting} type="submit" fullWidth>
                                {isSubmitting ? <CircularProgress size={24}/> : "Войти"}
                            </Button>
                        </div>
                    </Form>
                    </Fragment>
                    )}
            </Formik>
        </div>
    )
}


const trimVal = obj => {
    if (typeof obj !== "object") {
        return;
    }

    let value;
    let output = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            value = obj[key].trim();
            output[key] = value;
        }
    }
    return output;
};


export default SignInForm