import React, {Component} from "react";


import './SignIn.css'
import {Field, Form, Formik} from "formik";
import {Button, TextField} from "@material-ui/core";

class SignIn extends Component {

    render() {
        return (
            <div >
                <Formik initialValues={{userName: '', password: ''}} onSubmit={ (data,{setSubmitting}) => {
                 setSubmitting(true);
                 console.log(data);
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

                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>

                    )}
                </Formik>

            </div>
        )
    }


}

export default SignIn