import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PizzaIcon from '../../../../public/BIGPIZZA.svg'
import BurgerIcon from '../../../../public/HAMBURGER.svg'
// import style from '../FooterTop/top.module.css'
import style from './top.module.css'
import { useRouter } from 'next/router';
import {useTranslation} from "next-i18next";
function FooterTop() {
    let router = useRouter()
    const {Footer,title,button}=style
    let [mobile,setmobile]=useState(false)
    const {t} = useTranslation("common")
    useEffect(()=>{
        if(window.innerWidth<800){
            setmobile(true)
        }else{
            setmobile(false)
        }
      
        
        
    },[])
    return (
        <div className="w-full h-auto relative h-98 flex justify-center ">
            <div className={Footer} data-aos='fade-up'>
                <Image
                src={PizzaIcon}
                alt='PizzaIcon'
                width={200}
                height={200}
                style={mobile?{display:'none'}:{}}
                />
                <div className='flex flex-col justify-center items-center'>
                    <h3 className={title}>{t("Discover Restaurants Near From you")}</h3>
                    <button className={button} style={{background:'red'}} onClick={()=>router.push("restaurants")}>{t("Explore now")}</button>
                </div>
                <Image
                src={BurgerIcon}
                alt='BurgerIcon'
                width={200}
                height={200}
                style={mobile?{display:'none'}:{}}
                />
            </div>
            <div data-aos="zoom-in" data-aos-delay="300" style={{display:'none'}}>
        {/* Содержимое */}
      </div> 
        </div>
    );
}

export default FooterTop;