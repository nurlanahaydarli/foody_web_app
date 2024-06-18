import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../userInp';
import style from '../userForum/Forum.module.css'
import { AccessPut, Put } from '../../../../server/helper/reguests';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import uploadFile from '../../../utils/uploadFile';
import { PutAuthUser } from '../../../services';
import Spiner from '../../../components/Client/Spiner'
import Image from 'next/image';
import {AxiosResponse} from "axios";
import { useTranslation } from 'react-i18next';
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
interface Props{
  img:any|undefined
  
}
const UserForm: any = (props:Props) => {
  let {img,}:any=props
  let [logoding,setlogoding]=useState(false)
  const { t } = useTranslation("common");

  // let IMG=img[0]?.data_url
  
  
  const user = useSelector((state: RootState) => state.user);
console.log(user);

  

  const onSubmit = (values: FormValues) => {
    console.log(img);
    
    if(img==undefined||img===""){
    
      
      toast.info("You have to add image to profile", {
        position:"top-right",
      });
      return
    }
    (async ()=>{
    
        setlogoding(true)
      try{
        let imgres= await uploadFile({
          file:img,
          collectionId:"users-hash-password",
          documentId:"users-hash-password"
      }) as AxiosResponse<string|null>;
     
      // let res =await AccessPut("auth/user",{
      //     ...values,
      //     img_url: imgres,
      //   })
        let res =await PutAuthUser({
          ...values,
          img_url: imgres,
        })
        if(res){
          toast.success("User Uptodate", {
            position:"top-right",
          });
          setlogoding(false)
        }
      }catch(err){
        console.log(err);
        setlogoding(false)
        
      }
      
  
    
      //
   
    })()
   

    
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
                    <Input name='phoneNumber' type='text' placeholder='+994 XX XXX XX XX' title={t("Contact Number")}/>
                    <Input name='username' type='text' placeholder={user.username} title={t("User Name")}/>
                    <Input name='fullName' type='text' placeholder='Sarkhan Rahimli' title={t("Full Name")}/>
                </div>
                <div className={inpdiv}>
                    <Input name='email' type='email' placeholder='Exsample@gmail.com' title='Email' value={user.email}/>
                    <Input name='address' type='text' placeholder='address' title={t("Address")}/>
                    <button type="submit" className={button}  style={ logoding?{cursor: "not-allowed"}:{cursor: 'pointer'}}>
                      {logoding?<Spiner />:t("Save")}
                    </button>
                </div>
            </div>
        </Form>
      </Formik>
      <ToastContainer/>
    </div>
  );
};

export default UserForm;
