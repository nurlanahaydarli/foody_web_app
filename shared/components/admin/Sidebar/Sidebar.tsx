import DashboardSvg from "../svg/DashboardSvg";
import ProductsSvg from "../svg/ProductsSvg";
import RestaurantsSvg from "../svg/RestaurantsSvg";
import OrdersSvg from "../svg/OrdersSvg";
import OfferSvg from "../svg/OfferSvg";
import LogoutSvg from "../svg/LogoutSvg";
import styles from './sidebar.module.css'
import {useRouter} from "next/router";
import CategorySvg from "../svg/CategorySvg";
import { signOut } from 'firebase/auth';
import { auth } from '../../../../server/configs/firebase';
import UploadSvg from "../svg/UploadSvg";
import { ToastContainer, toast } from "react-toastify";
import LeftSvg from '../svg/LeftSvg'
import LogoWeb from "../../Client/svg/LogoWeb";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import {closeSidebar} from "../../../redux/featuries/sidebar/sidebarSlice";
import {useResize} from '../../../hooks/useResize'
import {useTranslation} from "next-i18next";
import {useToast} from "@chakra-ui/react";

export default function Sidebar() {
    let {push,pathname} = useRouter();
    let  dispatch: AppDispatch = useDispatch()
    const isActive = (p:string) => (pathname === p ? "active" : "");
    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
    let {isMobile} = useResize()
    const { t } = useTranslation("common");
    const toast = useToast()

    const logout = async () => {
        try {
          await signOut(auth);
            toast({
                title: `Logout successfully!`,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top-right',
                variant:'subtle'
            })
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      };
      const handleLogout = async () => {
        await logout();
        push('/admin/login');
      };

    function handleCloseMenu(){
        dispatch(closeSidebar)
    }
    return (
        <>
        <ToastContainer/>
                    <div className={`${styles.sidebar_box} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`}>
                        <ul>
                            <div className={styles.sidebar_top}>
                                <button onClick={handleCloseMenu}><LeftSvg/></button>
                                <div>
                                    <LogoWeb/>
                                </div>
                            </div>
                            <li onClick={() => {
                                push('/admin');
                                dispatch(closeSidebar)
                            }} className={styles[`${isActive("/admin")}`]}>
                                <DashboardSvg/>
                                <span>{t("Dashboard")}</span>
                            </li>
                            <li onClick={() => {
                                push('/admin/products');
                                dispatch(closeSidebar)
                            }}
                                className={styles[`${isActive("/admin/products")}`]}>
                                <ProductsSvg/>
                                <span>{t("Products")}</span>
                            </li>
                            <li onClick={() => {
                                push('/admin/restaurants');
                                dispatch(closeSidebar)
                            }}
                                className={styles[`${isActive("/admin/restaurants")}`]}>
                                <RestaurantsSvg/>
                                <span>{t("Restaurants")}</span>
                            </li>
                            <li onClick={() => {
                                push('/admin/category');
                                dispatch(closeSidebar)
                            }}
                                className={styles[`${isActive("/admin/category")}`]}>
                                <CategorySvg/>
                                <span>{t("Category")}</span>
                            </li>
                            <li onClick={() => {
                                push('/admin/orders');
                                dispatch(closeSidebar)
                            }}  className={styles[`${isActive("/admin/orders")}`]}>
                                <OrdersSvg/>
                                <span>{t("Orders")}</span>
                            </li>
                            <li onClick={() => {
                                push('/admin/orders/history');
                                dispatch(closeSidebar)
                            }}
                                className={styles[`${isActive("/admin/orders/history")}`]}>
                                <UploadSvg/>
                                <span>{t("History")}</span>
                            </li>
                            <li onClick={() => {
                                push('//admin/offer');
                                dispatch(closeSidebar)
                            }}  className={styles[`${isActive("/admin/offer")}`]}>
                                <OfferSvg/>
                                <span>{t("Offers")}</span>
                            </li>
                            <li onClick={handleLogout}>
                                <LogoutSvg/>
                                <span>{t("Logout")}</span>
                            </li>
                        </ul>
                        <div className={styles.sidebar_bottom}>
                            <p>Version 1.0.0</p>
                        </div>
                    </div>
                    <div className={`${styles.sidebar_shadow} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.hide}`} />
        </>
    );
}


