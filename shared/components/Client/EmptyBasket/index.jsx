import styles from "../../../../pages/user/basket/basket.module.css";
import BasketSvg from "../svg/BasketSvg";
import React from "react";
import Image from "next/image";
import {useTranslation} from "next-i18next";

export default function EmptyBasket() {
    const { t } = useTranslation("common");
    return (
        <>
            <div className={`${styles.empty_box} min-h-[550px]`}>
                <div className={`${styles.item_counts} ${styles.disabled}`}>
                    <BasketSvg/> <span>0 {t("items")}</span>
                </div>
                <div className={styles.empty_body}>
                    <Image src={'/imgs/empty.png'} alt={'Empty Basket'} width={265} height={236}/>
                    <h5 className='text-center'>Opps! {t("basket is empty")}</h5>
                </div>
                <button className={`${styles.checkout_btn} ${styles.disabled}`}>
                         <span>
                            {t("Checkout")}
                        </span>
                    <p>
                        $0.00
                    </p> 
                </button>
            </div>
        </>
    )
}