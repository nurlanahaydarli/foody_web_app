import React, {useState} from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";
import styles from './basket.module.css'
import Image from "next/image";
import BasketSvg from '../../../shared/components/Client/svg/BasketSvg'
import RemoveSvg from '../../../shared/components/Client/svg/RemoveSvg'
import BasketItem from "../../../shared/components/Client/BasketItem";
import EmptyBasket from "../../../shared/components/Client/EmptyBasket";

type BasketProps = {
    productCount?: number;
    data_list?: string[]
}
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

function Basket(props: BasketProps) {
    return (
        <>
            <MainLayout>
                <div className='px-8'>
                    <div className='flex flex-row'>
                        <Navbar active={1}/>
                        <div className={styles.user_cabinet_box}>
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
                                            <BasketItem key={product.id} {...product} />
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
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Basket;
