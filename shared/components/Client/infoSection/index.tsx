import React, { useEffect, useState } from 'react';
import InfoBox from '../adminInfoBox';
import styles from '../infoSection/infoSection.module.css'


import AOS from 'aos';
import 'aos/dist/aos.css';
import {shortText} from "../../../utils/shortText";
interface Props{
  data:any
    // img1:any,
    // img2:any,
    // img3:any,
    // title1:string,
    // title2:string,
    // title3:string,
    TITLE:string,
    DES:string
}
function InfoSection(props:Props) {
  let [mobile,setmobile]=useState(false)

    useEffect(() => {
        AOS.refresh(); // Обновите AOS при монтировании компонента
        if(window.innerWidth<800){
          setmobile(true)
      }else{
          setmobile(false)
      }
      }, []);
    let {
        data,
        TITLE,
        DES
    }=props
    const {Title,des,div}=styles
    let newdata =[]
    if(data && data.length){
        newdata = data.slice(-3)
    }
    
    return (
        <div className={'flex flex-col  items-center mt-20 gap-2 '+div}>
        <h2 className={Title} data-aos='fade-up'>{TITLE}</h2>
        <p className={des} data-aos='fade-up'>{DES}</p>
        <div className={mobile?'w-full flex flex-col items-center justify-around mt-7':"w-full flex flex-row justify-around mt-7"} data-aos='fade-up'>
            {newdata?.map((item:any)=>(
              <InfoBox
              RestuarantID={item.description===undefined?item.id:item.rest_id}
              Desc={shortText(item.description===undefined?item.address:item.description,30)}
              img={item.img_url}
              Title={item.name}
              />
            ))}
            {/* <InfoBox
            img={img1}
            Title={title1}
            />
            
            
            
            <InfoBox
            img={img2}
            Title={title2}
            />
            
            
            <InfoBox
            img={img3}
            Title={title3}
            />
             */}
            
            
        </div>
        <div>
      
      <div data-aos="zoom-in" data-aos-delay="300" style={{display:'none'}}>
        {/* Содержимое */}
      </div>
    </div>
    </div>
    );
}

export default InfoSection;