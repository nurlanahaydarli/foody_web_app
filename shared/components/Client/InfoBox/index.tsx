import React, { useState } from 'react';
import style from '../InfoBox/Box.module.css'
import Image from 'next/image';


import  { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
interface Props{
    row:boolean,
    img:any,
    desc:string,
    title:string,
    w:number,
    h:number
}
function INFoBox( props:Props) {
    let [mobile,setmobile]=useState(false)

    useEffect(() => {
        AOS.refresh(); // Обновите AOS при монтировании компонента
        if(window.innerWidth<800){
          setmobile(true)
      }else{
          setmobile(false)
      }
      }, []);
    let {Title,des,bgDiv1,IMG,bgDiv2}=style
    let {row,img,desc,title,w,h}=props
    return (
        <div className={mobile?'flex flex-col ': row?'flex flex-row  mt-28':'flex  flex-row-reverse mt-28'}>
            <div className={mobile?'w-full':'w-1/2  ml-16 '} data-aos={mobile?'fade-up':row?"fade-right":"fade-left"}>
                <h2 className={Title}>{title}</h2>
                <p className={des}>{desc}</p>
            </div>
            <div className={mobile?'w-full ':'w-1/2 flex items-center justify-center relative '} data-aos={mobile?'fade-up':row?"fade-left":"fade-right"}>
                <div className={row? bgDiv1:bgDiv2} style={mobile?{display:'none'}:{}}></div>
                <Image
                src={img}
                alt={`${img}`}
                width={w}
                height={h}
                className={IMG}
                />
            </div >
            <div data-aos="zoom-in" data-aos-delay="300" style={{display: 'none'}}>
                {/* Содержимое */}
            </div>
        </div>
    );
}

export default INFoBox;