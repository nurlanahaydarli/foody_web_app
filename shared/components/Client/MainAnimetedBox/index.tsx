import React from 'react';
import styles from '../MainAnimetedBox/Box.module.css'
import Image from 'next/image';
import pizzaIcon from '../../../../public/pizza.svg'
interface Props{
    class:string,
    img:any,
    title:string,
    
}

function AnimetedBox(props:Props) {

    const {Box,text,moving}=styles
    return (
        <div className={Box+" "+props.class +' '+moving}>
            <Image
            src={props.img}
            alt={`${props.img}`}
            width={70}
            height={50}
            />
            <div className='flex flex-col  items-center justify-center p-2'>
                <h5 className={text}>{props.title} </h5>
                <p className={text}>Yummy ...</p>
            </div>
        </div>
    );
}

export default AnimetedBox;