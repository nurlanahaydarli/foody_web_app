import React from 'react';
import style from '../adminInfoBox/infoBox.module.css'
import Image from 'next/image';
import BoucherIcon from '../../../../public/Boucher.svg'
import { useRouter } from 'next/router';
import {shortText} from "../../../utils/shortText";

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
            <h3 className={title}>{shortText(Title,15)}</h3>
            <p className={des}>{shortText(Desc,20)}</p>
        </div>
    );
}

export default InfoBox;