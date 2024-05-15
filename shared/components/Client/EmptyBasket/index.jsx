import styles from "../../../../pages/user/basket/basket.module.css";
import BasketSvg from "../svg/BasketSvg";
import React from "react";
import Image from "next/image";

export default function EmptyBasket() {
    return (
        <>
            <div className={styles.empty_box}>
                <div className={`${styles.item_counts} ${styles.disabled}`}>
                    <BasketSvg/> <span>0 items</span>
                </div>
                <div className={styles.empty_body}>
                    <Image src={'/imgs/empty.png'} alt={'Empty Basket'} width={265} height={236}/>
                    <h5>Opps! Basket empty</h5>
                </div>
                <button className={`${styles.checkout_btn} ${styles.disabled}`}>
                        <span>
                            Checkout
                        </span>
                    <p>
                        $0.00
                    </p>
                </button>
            </div>
        </>
    )
}