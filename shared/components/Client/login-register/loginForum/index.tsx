import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginInp from '../loinInp';
import styles from '../loginForum/forum.module.css'
import { Post } from '../../../../../server/helper/reguests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { setUser, clearUser, updateUser } from '../../../../redux/featuries/user/userSılice';
import { useRouter } from 'next/router';
interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });
    let ruter=useRouter()
  const handleSubmit = (values: SignInFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // You can perform your sign-in logic here
    console.log('Submitting:', values);
    (async()=>{
      let res= await Post(values, `auth/signin`)
      console.log(res.user); 
      // add to local

      dispatch(setUser(res.user));
      // add to local

      toast.success("singin sucsesfuly", {
        position:"top-right",
      });
      ruter.push('/user/profile')

      
    })()
    setSubmitting(false);
  };
    //tolkid
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  // logouth
  const handleLogout = () => {
    dispatch(clearUser());
  };
  //update
  const handleUpdateUser = () => {
    const updateData = {
      email: 'newemail@example.com',
    };
    dispatch(updateUser(updateData));
  };
  return (<div>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
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

export default SignInForm;