import React from 'react';
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

function Profile() {
    let {Profile, headText, addPhoto} = styles
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    console.log(user);
    
    return (
        <>
         <MainLayout>
             <div className='px-8 pt-1 pb-[100px]'>
                 <div className='flex flex-row'>
                     <div className="w-1/4">
                         <Navbar active={1}/>
                     </div>
                     <div className="w-3/4 p-[16px] pe-[0px] ">
                     <div className={Profile}>
                         <h2 className={headText}>Profile</h2>
                         <div className='w-full flex items-center justify-center'>
                             <div className={addPhoto}>
                                 <Image
                                     src={uploadIcon}
                                     alt='uploadIcon'
                                     width={60}
                                     height={60}
                                 />
                                 <h5>upload</h5>
                             </div>
                         </div>
                         <UserForm />
                     </div>
                     </div>
                 </div>
             </div>
         </MainLayout>
        </>
    );
}

export default withClientAuth(Profile);
