import React,{Fragment} from "react";
import './SignIn.css'
import {Form, Formik, useField} from "formik";
import {Button, CircularProgress, makeStyles, TextField} from "@material-ui/core";
import {login} from "../../modules/authReducer";
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


const handleSubmit = async (values, {setSubmitting, setStatus, props}) => {
    const userData = trimVal(values);
    props.loginUser(userData);
    setSubmitting(false);
    setStatus({afterSubmit: true});
};

const SignInForm = (props) => {
    const isAuthenticated = useSelector(state => state.authReducer.authenticated);
    const error = useSelector(state => state.authReducer.error);
    const loginDispatch = useDispatch();
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    /*const componentDidUpdate = (prevProps, prevState, snapshot) => {
        const {error, errors, status, values, setStatus, result} = this.props;
        //setFieldError('userName', this.props.error);
        if (error && !status.error && status.afterSubmit) {
            // set server error to status error value
            // set status after submit to false
            setStatus({error, afterSubmit: false});
        }
        // If server send error and
        // current status error is not null and
        // values is changed
        if (error && status.error && prevProps.values !== values && !status.afterSubmit) {
            // set error status to null
            setStatus({error: null});
        }

        // if server send error and
        // current status error is not null and
        // and the error from server is different than the error status
        // and after form submission
        if (error && status.error && error !== status.error && status.afterSubmit) {
            // renew error status
            setStatus({error});
        }

        // If server send error
        // and server error contain error property
        // and previous formik errors is equal to current formik error
        // and after user submit the form
        if (error && error.errors && prevProps.errors === errors && status.afterSubmit) {
            this.props.setFieldError(error.errors[0].path, error.errors[0].message);
        }

        // If registration succeed
        if (!isEmpty(result) && result.success && status.afterSubmit) {
            // Send verification message
            this.props.sendVerificationEmail(result.signup_data.email);
            console.log(result.message);
        }
    }*/

   /* const disableButton = () => {
        const {
            isLoading,
            errors,
            isSubmitting,
            dirty,
            status,
            //result: { success },
        } = this.props;
        return /!*success ||*!/ isSubmitting || !isEmpty(errors) || Boolean(status.error) || !dirty || isLoading;
    };
*/

    return (
        <div className={classes.dialog}>

            <Formik initialValues={{username: "", password: ""}} onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);

                const userData = trimVal(values);
                loginDispatch(login(userData));

                // make async call
                history.replace(from);
                console.log("submit: ", values);
                setSubmitting(false);
            }}>
                {({ values, errors, touched,isSubmitting }) => (

                    <Fragment>
                        {error && touched ? (
                            <div>{error}</div>) : null}
                    <Form autoComplete="off">

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