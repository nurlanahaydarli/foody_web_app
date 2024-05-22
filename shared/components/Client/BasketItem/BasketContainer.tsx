import styles from "../../../../pages/user/basket/basket.module.css";
import BasketSvg from "../svg/BasketSvg";
import BasketItem from "./index";
import React from "react";
import EmptyBasket from '../EmptyBasket/index'

type BasketProps = {
    productCount?: number;
    data_list?: string[],
    size: string
}

export default function BasketContainer(props: BasketProps) {
    let {size} = props
    let data_list = [
        {
            id: "1",
            "title": "Papa John’s Pizza Restaurant",
            "price": 10,
            "inventory": 1,
            "quantity": 5,
            "date_added": 1496757350,
        },
        {
            id: "2",
            "title": "Papa John’s Cheecburger Restaurant",
            "price": 40,
            "inventory": 1,
            "quantity": 7,
            "date_added": 1496757290
        },
        {
            id: "10",
            "title": "Cheecburger Cheecburger Cheecburger",
            "price": 40,
            "inventory": 1,
            "quantity": 10,
            "date_added": 1496757290
        },
        {
            id: "4",
            "title": "Papa John’s Pizza Restaurant",
            "price": 10,
            "inventory": 1,
            "quantity": 5,
            "date_added": 1496757350,
        },
        {
            id: "6",
            "title": "Papa John’s Cheecburger Restaurant",
            "price": 40,
            "inventory": 1,
            "quantity": 7,
            "date_added": 1496757290
        },
        {
            id: "160",
            "title": "Cheecburger Cheecburger Cheecburger",
            "price": 40,
            "inventory": 1,
            "quantity": 10,
            "date_added": 1496757290
        }
    ]
    return (
        <>
            <div className={`${styles.user_cabinet_box} ${styles[size]}`}>
                {data_list.length ?
                    <>
                        <h2 className={styles.user_cabinet_title}>
                            Your Basket
                        </h2>
                        <div className={styles.item_counts}>
                            <BasketSvg/> <span>{data_list.length} items</span>
                        </div>
                        <div className={styles.basket_list}>
                            {data_list?.map((product) => (
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