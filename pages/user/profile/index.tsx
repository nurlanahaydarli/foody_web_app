import React, { useEffect, useState } from 'react';
import uploadIcon from '../../../public/upload.svg'
import Navbar from '../../../shared/components/Client/user-NAV';
import styles from '../profile/profile.module.css'
import Image from 'next/image';
import UserForm from '../../../shared/components/Client/userForum';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";
import { AppDispatch, RootState } from '../../../shared/redux/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import withClientAuth from "../../../shared/HOC/withClienAuth";
import UploadImage from '../../../shared/components/admin/uploadImage/UploadImage';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

function Profile() {
    let [IMG,setIMG]=useState<any>("")
    const { t } = useTranslation("common");
    let [mobile,setmobile]=useState(false)
    
    useEffect(()=>{
        if(window.innerWidth<800){
            setmobile(true)
        }else{
            setmobile(false)
        }
    },[mobile])
    // console.log(IMG);
    
    let {Profile, headText, addPhoto} = styles
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    console.log("user",user);
    
    return (
        <>
         <MainLayout>
             <div className='px-8 pt-1 pb-[100px]'>
                 <div className='flex flex-row'>
                     <div className={mobile?"hidden":"w-1/4"}>
                         <Navbar active={1}/>
                     </div>
                     <div className="lg:w-3/4 w-full p-[16px] pe-[0px] ">
                     <div className={Profile}>
                         <h2 className={headText}>{t("Your Profile")}</h2>
                         <div className='w-full flex items-center justify-center'>
                             <div className={addPhoto}>
                                
                                 <UploadImage setImageList={setIMG} IMG={IMG[0]?.data_url?IMG[0]?.data_url:""}  uerPage={true}/>
                                 
                             </div>
                         </div>
                         <UserForm img={IMG} />
                     </div>
                     </div>
                 </div>
             </div>
         </MainLayout>
        </>
    );
}

export default withClientAuth(Profile);
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
});