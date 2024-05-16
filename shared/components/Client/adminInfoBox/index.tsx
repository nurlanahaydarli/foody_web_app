import React from 'react';
import style from '../adminInfoBox/infoBox.module.css'
import Image from 'next/image';
import BoucherIcon from '../../../../public/Boucher.svg'

interface Props{
    img:any,
    Title:string,
   
}

function InfoBox(props:Props) {
const {title,des,box,icon}=style
let {img,Title}=props
    return (
        <div className={box}>
            <Image
            src={img}
            alt={`${img}`}
            width={240}
            className={icon}
            />
            <h3 className={title}>{Title}</h3>
            <p className={des}>Lorem ipsum is placeholder  commonly used in the graphic </p>
        </div>
    );
}

export default InfoBox;