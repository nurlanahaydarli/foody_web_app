import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginInp from '../loinInp';
import styles from '../loginForum/forum.module.css'
import RegisterInp from '../registerInp';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { PostSingUP } from '../../../../services';
import Spiner from '../../Spiner';
import { useToast } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next';

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
interface Props{
  setsingin:any
}
const RegisterForm= (props:Props) => {
  const toast = useToast()
  const {t} = useTranslation("common")
  const user = useSelector((state: RootState) => state.user);
  let {setsingin}:any=props
  let [Loading,setLoading]=useState(false)
  
  const validationSchema = Yup.object({
    fullname: Yup.string().required('Required'),
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = (values: RegisterFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    // You can perform your registration logic here
    
      (async()=>{
       
        
        try{
          setLoading(true)
          PostSingUP(values).then(()=>{
            // toast.success("register sucsesfuly", {
            //     position:"top-right",
            //   });
            toast({
              title: `Register successfully!`,
              status: 'success',
              duration: 2000,
              isClosable: true,
              position:'top-right',
              variant:'subtle'
            })
            toast({
              title: `Now you can sing in!`,
              status: 'info',
              duration: 2000,
              isClosable: true,
              position:'top-right',
              variant:'subtle'
            })
              // toast.info("now sing in", {
              //     position:"top-right",
              //   });
              //
            setLoading(false)
          }).catch((err)=>{
            setLoading(false)
            // toast.info(err.message, {
            //   position:"top-right",
            // });
            toast({
              title: err.message,
              status: 'info',
              duration: 2000,
              isClosable: true,
              position:'top-right',
              variant:'subtle'
            })
          })

        }catch(err){
          console.log(err);
          
        }
       

        // const user = useSelector((state: RootState) => state.user);
        // console.log(user);
        
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
          title={t("Full Name")}
          icon={true}
          name='fullname'
          />
          <RegisterInp
          title={t("User Name")}
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
            {Loading?<Spiner/>: `${t("Register")}`}
            
          </button>
        </Form>
      )}
    </Formik>
    </div>
    
    
  );
};

export default RegisterForm;

