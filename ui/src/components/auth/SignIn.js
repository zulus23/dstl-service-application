import React, {Component} from "react";


import './SignIn.css'
import {ErrorMessage, Field, Form, useField, withFormik} from "formik";
import {Button, CircularProgress, TextField, withStyles} from "@material-ui/core";
import {login} from "../../modules/authReducer";
import {connect} from "react-redux";

import isEmpty from "lodash/isEmpty";
import styles from "./style";


const MyTextField = ({placeholder, ...props}) => {
    const [field] = useField(props)

    return (
        <TextField placeholder={placeholder} {...field} style={{width:'100%', paddingBottom:'10px' ,textAlign: "center"}} />
    )
}


class SignInForm extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
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
    }

    disableButton = () => {
        const {
            isLoading,
            errors,
            isSubmitting,
            dirty,
            status,
            //result: { success },
        } = this.props;
        return /*success ||*/ isSubmitting || !isEmpty(errors) || Boolean(status.error) || !dirty || isLoading;
    };

    render() {
        const {
            isLoading,
            handleSubmit,
            isSubmitting,
            status,
            classes,
            // result: { success },
        } = this.props;
        return (
            <div className={classes.dialog}>


                <Form onSubmit={handleSubmit} autoComplete="off">
                    {status.error && (
                        <div className={classes.errorMessage}>
                            {this.props.error}
                        </div>
                    )}
                    <div className={classes.field_input}>
                        <MyTextField name='username' placeholder='имя пользователя' type={"input"}/>
                    </div>
                    <div className={classes.field_input}>
                        <MyTextField name='password' type={'password'} placeholder='пароль'/>
                    </div>
                    <div style={{height:'100px',display:'flex', alignItems:'center' }}>
                        <Button disabled={this.disableButton()} type="submit" fullWidth >
                            {isLoading ? <CircularProgress size={24}/> : "Войти"}
                        </Button>
                    </div>
                   {/* <pre>{JSON.stringify(status, null, 2)}</pre>*/}

                </Form>


            </div>
        )
    }


}


const mapPropsToValues = props => ({
    username: "",
    password: "",

});
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
const mapPropsToStatus = props => {
    return {error: null};
};
const handleSubmit = async (values, {setSubmitting, setStatus, props}) => {
    const userData = trimVal(values);
    props.loginUser(userData);
    setSubmitting(false);
    setStatus({afterSubmit: true});
};


const options = {
    handleSubmit,
    mapPropsToValues,
    enableReinitialize: true,
    mapPropsToStatus,
};

const LoginForm = withFormik(options)(SignInForm);


const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        error: state.authReducer.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: e => dispatch(login(e))
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginForm))