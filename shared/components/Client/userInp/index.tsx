import {ErrorMessage, Field} from 'formik';
import React from 'react';
import style from '../userInp/input.module.css'

interface Props {
    name: string,
    type: string,
    placeholder?: string,
    title?: string,
}

function Input(props: Props) {
    let {label, inp, eror} = style
    let {name, type, placeholder, title} = props
    return (
        <div className='flex flex-col'>
            <label htmlFor={name} className={label}>{title}</label>
            <Field type={type} id={name} name={name} className={inp} placeholder={placeholder}/>
            <ErrorMessage name={name} component="div" className={eror}/>
        </div>
    );
}

export default Input;