import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../userInp';
import style from '../userForum/Forum.module.css'
import {AppDispatch, RootState} from '../../../redux/store';
import uploadFile from '../../../utils/uploadFile';
import { PutAuthUser } from '../../../services';
import Spiner from '../../../components/Client/Spiner'
import { useToast } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'next-i18next';
import {setUser} from "../../../redux/featuries/user/userSılice";
interface FormValues {
  phoneNumber: string;
  username: string;
  email: string;
  fullname: string;
  address: string;

}

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+994\d{9}$/, 'Phone number must start with +994 and have 9 additional digits')
    .required('Phone number is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
    fullname: Yup.string().required('Full name is required'),
  address: Yup.string().required('Address is required'),
});

const initialValues: FormValues = {
  phoneNumber: '',
  username: '',
  email: '',
  fullname: '',
  address: '',
};
interface Props{
  img:any|undefined

}
const UserForm: any = (props:Props) => {
    const toast = useToast()
  let {img,}:any=props
  let [logoding,setlogoding]=useState(false)
  const { t } = useTranslation("common");
    const dispatch: AppDispatch = useDispatch();
  // let IMG=img[0]?.data_url


  const user = useSelector((state: RootState) => state.user);




  const onSubmit = (values: FormValues) => {
    console.log(img);

    if(img==undefined||img===""){
      // toast.info("You have to add image to profile", {
      //   position:"top-right",
      // });
        toast({
            title: `You have to add image to profile`,
            status: 'info',
            duration: 2000,
            isClosable: true,
            position:'top-right',
            variant:'subtle'
        })
      return
    }
    (async ()=>{

        setlogoding(true)
      try{
        let imgres= await uploadFile({
          file:img,
          collectionId:"users-hash-password",
          documentId:"users-hash-password"
      }) as string|null;

      // let res =await AccessPut("auth/user",{
      //     ...values,
      //     img_url: imgres,
      //   })
          let userInfo = {
              ...values,
              img_url: imgres,
          }
        let res =await PutAuthUser(userInfo)
      localStorage.setItem("user_info",JSON.stringify(userInfo))
      dispatch(setUser(userInfo));
        if(res){
          // toast.success("User Uptodate", {
          //   position:"top-right",
          // });
            toast({
                title: `User info is Updated`,
                status: 'info',
                duration: 2000,
                isClosable: true,
                position:'top-right',
                variant:'subtle'
            })
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
                    <Input name='phoneNumber' type='text' placeholder={user.phoneNumber? user.phoneNumber: '+994 XX XXX XX XX'} title={t("Contact Number")}/>
                    <Input name='username' type='text' placeholder={user.username} title={t("User Name")}/>
                    <Input name='fullname' type='text' placeholder={user.fullname} title={t("Full Name")}/>
                </div>
                <div className={inpdiv}>
                    <Input name='email' type='email' title='Email'  value={user.email}/>
                    <Input name='address' type='text' placeholder={user.address} title={t("Address")}/>
                    <button type="submit" className={button}  style={ logoding?{cursor: "not-allowed"}:{cursor: 'pointer'}}>
                      {logoding?<Spiner />:t("Save")}
                    </button>
                </div>
            </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserForm;
