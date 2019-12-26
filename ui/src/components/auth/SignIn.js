import React, {Component} from "react";


import './SignIn.css'
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";
import {login} from "../../modules/authReducer";
import {connect} from "react-redux";

class SignIn extends Component {

    render() {
        return (
            <div >
                <Formik initialValues={{userName: '', password: ''}} onSubmit={ (data,{setSubmitting}) => {
                 setSubmitting(true);

                    this.props.loginUser(data);
                 setSubmitting(false);
                }}>
                    {({values, isSubmitting}) => (
                        <Form>
                            <Field name='userName' type={'input'} as={TextField} />
                            <div>
                                <Field name='password' type={'password'} as={TextField}/>
                            </div>

                            <div>
                                <Button disabled={isSubmitting} type="submit">
                                    Войти
                                </Button>
                            </div>
                            <h6>{this.props.token}</h6>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>

                    )}
                </Formik>

            </div>
        )
    }


}
const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: e => dispatch(login(e))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)