import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginInp from '../loinInp';
import styles from '../loginForum/forum.module.css'
import { Post } from '../../../../../server/helper/reguests';
import { useToast } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { setUser, clearUser, updateUser } from '../../../../redux/featuries/user/userSılice';
import { useRouter } from 'next/router';
import Spiner from '../../Spiner';
import { useTranslation } from 'next-i18next';

interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const toast = useToast()
  let [Loading,setLoaging]=useState(false)
  const {t}= useTranslation("common")
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });
    let ruter=useRouter()
  const handleSubmit = (values: SignInFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // You can perform your sign-in logic here
    (async()=>{
      try{
        setLoaging(true)
         await Post(values, `auth/signin`).then((res)=>{
          setLoaging(false)
        console.log(res);
        // add to local
        localStorage.setItem("access_token",res.user.access_token)

        localStorage.setItem("user_info",JSON.stringify(res.user))
        dispatch(setUser(res.user));
        // // add to local
        // toast.success("singin sucsesfuly", {
        //   position:"top-right",
        // });
           toast({
             title: `Signed in successfully!`,
             status: 'success',
             duration: 2000,
             isClosable: true,
             position:'top-right',
             variant:'subtle'
           })
        ruter.push('/user/profile')
        })
        
        
  
       
      }catch(err){
        // toast.error("Email or password is wrong", {
        //   position:"top-right",
        // });
        toast({
          title: `Email or password is wrong`,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position:'top-right',
          variant:'subtle'
        })
      }
      

      
    })()
    setSubmitting(false);
  };
    //tolkid
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  // logout
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
          title={t("E-mail")}
          icon={true}
          type='email'
          />
          <LoginInp
                    name='password'

          title={t("Password")}
          icon={false}
          type='password'
          />
          <button className={styles.button} type="submit" disabled={isSubmitting} style={ Loading?{cursor: "not-allowed"}:{cursor: 'pointer'}}>
            
            {Loading?<Spiner />: `${t("Login")}` }
          </button>
        </Form>
      )}
    </Formik>
  </div>
    
  );
};

export default SignInForm;