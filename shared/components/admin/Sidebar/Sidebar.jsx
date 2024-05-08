import DashboardSvg from "../svg/DashboardSvg";
import ProductsSvg from "../svg/ProductsSvg";
import RestaurantsSvg from "../svg/RestaurantsSvg";
import OrdersSvg from "../svg/OrdersSvg";
import OfferSvg from "../svg/OfferSvg";
import LogoutSvg from "../svg/LogoutSvg";
import styles from './sidebar.module.css'
import {useRouter} from "next/router";
import {useState} from "react";
import CategorySvg from "../svg/CategorySvg";

export default function Sidebar() {
    let {push,pathname} = useRouter();
    const isActive = (p) => (pathname === p ? "active" : "");

    return (
        <>
            <div className={styles.sidebar_box}>
                <ul>
                    <li onClick={() => push('/admin')} className={styles[`${isActive("/admin")}`]}>
                        <DashboardSvg/>
                        <span>Dashboard</span>
                    </li>
                    <li onClick={() => push('/admin/products')} className={styles[`${isActive("/admin/products")}`]}>
                        <ProductsSvg/>
                        <span>Products</span>
                    </li>
                    <li onClick={() => push('/admin/restaurants')} className={styles[`${isActive("/admin/restaurants")}`]}>
                        <RestaurantsSvg/>
                        <span>Restaurants</span>
                    </li>
                    <li onClick={() => push('/admin/category')} className={styles[`${isActive("/admin/category")}`]}>
                        <CategorySvg/>
                        <span>Category</span>
                    </li>
                    <li onClick={() => push('/admin/orders')} className={styles[`${isActive("/admin/orders")}`]}>
                        <OrdersSvg/>
                        <span>Orders</span>
                    </li>
                    <li onClick={() => push('/admin/offer')} className={styles[`${isActive("/admin/offer")}`]}>
                        <OfferSvg/>
                        <span>Offer</span>
                    </li>
                    <li>
                        <LogoutSvg/>
                        <span>Logout</span>
                    </li>
                </ul>
                <div className={styles.sidebar_bottom}>
                    <p>Version 1.0.0</p>
                </div>
            </div>
        </>
    );
}
