import React from "react";
import {Formik,Field,Form} from "formik";
import { Input, } from 'antd';
const SignIn = ()=> {
   return (
       <div>
           <Formik initialValues={{user:"",password:""}}
                   onSubmit={data => {console.log(data)}}
           >
               {({values}) => (
                 <Form >
                     <Field name="user" type="input" as={Input} placeholder="Введите имя пользователя"/>

                     <Field name="password" type="input" as={Input.Password} placeholder="Введите пароль"/>
                     <pre>
                         {JSON.stringify(values,null,2)}
                     </pre>
                 </Form>
               )
               }
           </Formik>
       </div>
   )
}

export default SignIn