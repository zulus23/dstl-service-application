import React, {Component} from "react";


import './SignIn.css'
import {Formik, Field, Form} from "formik";
import {TextField} from "@material-ui/core";

class SignIn extends Component {


    constructor(props, context) {
        super(props, context);

    }


    render() {
        return (
            <div>
                <Formik initialValues={{userName: '', password: ''}}>
                    {({values, isSubmitting}) => (
                        <Form>
                            <Field name='userName' type={'input'} as={TextField} />
                            <div>
                                <Field name='password' type={'password'} as={TextField}/>
                            </div>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>

                    )}
                </Formik>

            </div>
        )
    }


}

export default SignIn