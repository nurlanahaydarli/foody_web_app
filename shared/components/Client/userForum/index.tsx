import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../userInp';
import style from '../userForum/Forum.module.css'
interface FormValues {
  phoneNumber: string;
  username: string;
  email: string;
  fullName: string;
  address: string;
}

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+994\d{9}$/, 'Phone number must start with +994 and have 9 additional digits')
    .required('Phone number is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  fullName: Yup.string().required('Full name is required'),
  address: Yup.string().required('Address is required'),
});

const initialValues: FormValues = {
  phoneNumber: '',
  username: '',
  email: '',
  fullName: '',
  address: '',
};

const UserForm: React.FC = () => {
  const onSubmit = (values: FormValues) => {
    console.log(values);
  };
  let {div,inpdiv,button}=style
  return (
    <div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
            <div className={div}>
                <div className={inpdiv}>
                    <Input name='phoneNumber' type='text' placeholder='+994' title='Contact'/>
                    <Input name='username' type='text' placeholder='rahimlisarkhan' title='Username'/>
                    <Input name='fullName' type='text' placeholder='Sarkhan Rahimli' title='Full Name'/>
                </div>
                <div className={inpdiv}>
                    <Input name='email' type='email' placeholder='rahimlisarkhan@gmail.com' title='Email'/>
                    <Input name='address' type='text' placeholder='address' title='Address'/>
                    <button type="submit" className={button}>Submit</button>
                </div>
            </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
