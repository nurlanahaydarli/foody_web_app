import styles from "../../../../pages/user/basket/basket.module.css";
import BasketSvg from "../svg/BasketSvg";
import BasketItem from "./index";
import React, {useEffect} from "react";
import EmptyBasket from '../EmptyBasket/index'
import {GetBasket, getCategories} from "../../../services";
import {useQuery} from "react-query";

type BasketProps = {
    productCount?: number;
    data_list?: string[],
    size: string
}

export default function BasketContainer(props: BasketProps) {
    let {size} = props
    const {data:basketList} = useQuery("basket", GetBasket);
    let basket_list = basketList?.data.result.data
    console.log(basket_list?.items,'basket_list')
    return (
        <>
            <div className={`${styles.user_cabinet_box} ${styles[size]}`}>
                {basket_list?.length ?
                    <>
                        <h2 className={styles.user_cabinet_title}>
                            Your Basket
                        </h2>
                        <div className={styles.item_counts}>
                            <BasketSvg/> <span>{basket_list.length} items</span>
                        </div>
                        <div className={styles.basket_list}>
                            {basket_list.items?.map((product) => (
                                <BasketItem key={product.id}  { ...product} />
                            ))}
                        </div>
                        <button className={styles.checkout_btn}>
                                <span>
                                    Checkout
                                </span>
                            <p>
                                $37.40
                            </p>
                        </button>
                    </> :
                    <EmptyBasket/>
                }
            </div>
        </>
    )
}