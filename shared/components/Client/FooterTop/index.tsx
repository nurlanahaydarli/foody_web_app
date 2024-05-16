import Image from 'next/image';
import React from 'react';
import PizzaIcon from '../../../../public/BIGPIZZA.svg'
import BurgerIcon from '../../../../public/HAMBURGER.svg'
import style from '../FooterTop/top.module.css'
function FooterTop() {
    const {Footer,title,button}=style
    return (
        <div className="w-full h-auto relative h-98 flex justify-center ">
            <div className={Footer} data-aos='fade-up'>
                <Image
                src={PizzaIcon}
                alt='PizzaIcon'
                width={200}
                height={200}
                />
                <div className='flex flex-col justify-center items-center'>
                    <h3 className={title}>Discover Restaurants Near From you</h3>
                    <button className={button}>Explore now</button>
                </div>
                <Image
                src={BurgerIcon}
                alt='BurgerIcon'
                width={200}
                height={200}
                />
            </div>
            <div data-aos="zoom-in" data-aos-delay="300" style={{display:'none'}}>
        {/* Содержимое */}
      </div> 
        </div>
    );
}

export default FooterTop;