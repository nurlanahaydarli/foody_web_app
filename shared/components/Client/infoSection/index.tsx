import React, { useEffect } from 'react';
import InfoBox from '../adminInfoBox';
import styles from '../infoSection/infoSection.module.css'


import AOS from 'aos';
import 'aos/dist/aos.css'; 
interface Props{
    img1:any,
    img2:any,
    img3:any,
    title1:string,
    title2:string,
    title3:string,
    TITLE:string,
    DES:string
}
function InfoSection(props:Props) {
    useEffect(() => {
        AOS.refresh(); // Обновите AOS при монтировании компонента
      }, []);
    let {
        img1,
        img2,
        img3,
        title1,
        title2,
        title3,
        TITLE,
        DES
    }=props
    const {Title,des,div}=styles

    return (
        <div className={'flex flex-col  items-center mt-20 gap-2 '+div}>
        <h2 className={Title} data-aos='fade-up'>{TITLE}</h2>
        <p className={des} data-aos='fade-up'>{DES}</p>
        <div className="w-full flex flex-row justify-around mt-7" data-aos='fade-up'>
            
            <InfoBox
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
            
            
            
        </div>
        <div>
      
      <div data-aos="zoom-in" data-aos-delay="300">
        {/* Содержимое */}
      </div>
    </div>
    </div>
    );
}

export default InfoSection;