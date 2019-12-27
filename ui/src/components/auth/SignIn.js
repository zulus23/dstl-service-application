import React, {Component} from "react";


import './SignIn.css'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";
import {login} from "../../modules/authReducer";
import {connect} from "react-redux";

class SignIn extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { error, errors, status, values, setStatus,setFieldError, result } = this.props;
        console.log(this.props);
        setFieldError('userName',this.props.error);

    }

    render() {
        return (
            <div >
                <Formik initialValues={{userName: '', password: ''}} onSubmit={ (data,{setSubmitting,setFieldError}) => {
                 setSubmitting(true);

                    this.props.loginUser(data);
                    console.log(this.props.error);
                    setFieldError('userName',this.props.error);
                 setSubmitting(false);
                }}>
                    {({values, errors,isSubmitting}) => (
                        <Form>
                            <Field name='userName' type={'input'} as={TextField} />
                            <div>
                                <Field name='password' type={'password'} as={TextField}/>
                            </div>
                            <ErrorMessage name="userName" />
                            <div>
                                <Button disabled={isSubmitting} type="submit" >
                                    Войти
                                </Button>
                            </div>
                            <h6>{this.props.error} - {isSubmitting}</h6>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre>
                        </Form>

                    )}
                </Formik>

            </div>
        )
    }


}
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
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)