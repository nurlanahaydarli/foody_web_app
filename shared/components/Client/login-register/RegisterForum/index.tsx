import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginInp from '../loinInp';
import styles from '../loginForum/forum.module.css'
import RegisterInp from '../registerInp';
import { Post } from '../../../../../server/helper/reguests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterFormValues {
  fullname: string;
  username: string;
  email: string;
  password: string;
};
const initialValues: RegisterFormValues = {
  "email": '',
  
  "password": '',
  "fullname": '',
  "username": '',
  
  
};

const RegisterForm: React.FC = () => {
  const validationSchema = Yup.object({
    fullname: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values: RegisterFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // You can perform your registration logic here
    
      (async()=>{
        let res= await Post(values, `auth/signup`)
        console.log(res.user); 
        // add to local
        toast.success("register sucsesfuly", {
          position:"top-right",
        });
      })()
        
     
    
    
    
    // console.log('Submitting:', values);
    setSubmitting(false);
  };


  return (
    <div>
      <Formik
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={handleSubmit}
      
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>

          <RegisterInp
          title='Full Name'
          icon={true}
          name='fullname'
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
      <ToastContainer />
    </div>
    
    
  );
};

export default RegisterForm;

