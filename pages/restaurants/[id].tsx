import {useRouter} from "next/router";
import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import React from "react";
import styles from './restaurants.module.css'
import Image from "next/image";
import BasketContainer from "../../shared/components/Client/BasketItem/BasketContainer";
import ProductsContainer from "../../shared/components/Client/Products/ProductsContainer";

export default function RestaurantDetail() {
    let router = useRouter()
    return (
        <>
            <MainLayout>
                <div className='px-8 pt-1 pb-[100px]'>
                    <div className={styles.restaurant_top}>
                        <img src={'/imgs/header-res.png'} alt={"Restaurant title"} className={styles.cover_width} />
                    </div>
                    <div className={`${styles.restaurant_detail} l:flex-nowrap flex-wrap flex justify-between items-center`}>
                        <div className={styles.left_top}>
                            <h1>
                                Papa John’s Pizza Restaurant
                            </h1>
                            <p>19 Nizami street, Sabail, Baku</p>
                        </div>
                        <div className={`flex items-center md:justify-end justify-between md:flex-nowrap flex-wrap  ${styles.top_right} gap-10`}>
                            <div className={styles.restaurant_desc}>
                                <p>Cuisine</p>
                                <span>pizza, drink, hotdog, sendvich, roll</span>
                            </div>
                            <div className={`${styles.action} flex items-center gap-10`}>
                                <span>$5 Delivery</span>
                                <button onClick={()=>router.back()}>Go Back</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex lg:flex-nowrap flex-wrap max-w-screen-xl mx-auto">
                        <div className="lg:w-4/6  w-full">
                            <ProductsContainer/>
                        </div>
                        <div className="lg:w-2/6  w-full">
                            <BasketContainer size={'md'} />
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}