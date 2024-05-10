import React, { useState } from 'react';
import ayeIcon from '../../../../../public/aye.svg'
import { ErrorMessage, Field } from 'formik';
import styles from '../loinInp/login.module.css'
import Image from 'next/image';
interface Props{
    title:string;
    
    icon:boolean;
    name:string

}
function RegisterInp(props:Props) {
    let{title,icon,name}=props
    let [show,setshow]=useState(false)
    return (
        <div className={styles.div}>
           
        <label htmlFor={name} className={styles.label}>{title}</label>
        <div className={'flex flex-row '+styles.relative}>
        
        <Field className={styles.inp} type={'text'}  name={name}   />
        <Image
        src={ayeIcon}
        alt='ayeIcon'
        width={35}
        height={32}
        className={styles.ayeIcon}
        style={icon!?{display:'none'}:{display:'block'}}
        onClick={()=>setshow(prev=>!prev)}
        />
        
        </div>
        
        <ErrorMessage name={name}  component="div" />
      
      </div>
    );
}

export default RegisterInp;