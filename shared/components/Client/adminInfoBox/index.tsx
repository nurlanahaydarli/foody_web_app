import React from 'react';
import style from '../adminInfoBox/infoBox.module.css'
import Image from 'next/image';
import BoucherIcon from '../../../../public/Boucher.svg'
import { useRouter } from 'next/router';

interface Props{
    img:any,
    Title:string,
    Desc:string,
    RestuarantID:string
}

function InfoBox(props:Props) {
    let ruter=useRouter()
const {title,des,box,icon}=style
let {img,Title,Desc,RestuarantID}=props
    return (
        <div className={box} onClick={()=>ruter.push(`/restaurants/${RestuarantID}`)}>
            {/* <Image
            src={img}
            alt={`${img}`}
            width={240}
            className={icon}
            /> */}
            <img src={img} className={icon} />
            <h3 className={title}>{Title}</h3>
            <p className={des}>{Desc}</p>
        </div>
    );
}

export default InfoBox;