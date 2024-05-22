import  styles from './products.module.css'
import Image from "next/image";
import PlusSvg from "../svg/PlusSvg";
import {useState} from "react";


export default function ProductsCard() {
    const [active,setActive]=useState(false);
    function onActive(){
        setActive(!active)
    }
    return (
        <>
            <div className={`flex justify-between sm:flex-nowrap flex-wrap  gap-[12px] ${styles.product_box}`}>
                <div className={`flex justify-start md:flex-nowrap flex-wrap md:gap-[30px] gap-2 ${styles.product_left}`}>
                    <Image src={'/imgs/header-res.png'} alt={'title'} width={60} height={60} />
                    <div className={styles.left_text}>
                        <h4>
                            Papa John’s Pizza Restaurant
                        </h4>
                        <p>Prepared with a patty, a slice of cheese and special sauce</p>
                    </div>
                </div>
                <div className={`flex justify-end items-center md:gap-[30px] gap-2 ${styles.product_right}`}>
                    <p>
                        From <span>$7.90</span>
                    </p>
                    <button onClick={onActive} className={active? styles.active: ''}><PlusSvg/></button>
                </div>
            </div>
        </>
    )
}