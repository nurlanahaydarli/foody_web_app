import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginInp from '../loinInp';
import styles from '../loginForum/forum.module.css'
import RegisterInp from '../registerInp';

interface RegisterFormValues {
  fullName: string;
  username: string;
  email: string;
  password: string;
};
const initialValues: RegisterFormValues = {
  fullName: '',
  username: '',
  email: '',
  password: '',
};

const RegisterForm: React.FC = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values: RegisterFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // You can perform your registration logic here
    console.log('Submitting:', values);
    setSubmitting(false);
  };


  return (
    <Formik
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={handleSubmit}
      
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          {/* <div>
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div> */}
          {/* <LoginInp
          title='Full Name'
          icon={true}
          type='text'
          name='fullName'
          /> */}
          <RegisterInp
          title='Full Name'
          icon={true}
          name='fullName'
          />
          <RegisterInp
          title='Username'
          icon={true}
          name='username'
          />
          
           {/* <LoginInp
          title='User Name'
          icon={true}
          type='text'
          name='userName'
          /> */}
          <LoginInp
          name='email'
          title='Email'
          icon={true}
          type='email'
          />
          <LoginInp
          name='password'
          title='Password'
          icon={false}
          type='password'
          />
          <button className={styles.button} type="submit" disabled={isSubmitting}>
            Sign In
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;

