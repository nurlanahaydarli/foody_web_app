import {useRouter} from "next/router";
import styles from './nav.module.css'
import {useTranslation} from "next-i18next";
import {useResize} from "../../../hooks/useResize";
import {useSelector,useDispatch} from "react-redux";
import {clearUser} from "../../../redux/featuries/user/userSılice";
import {useEffect, useState} from "react";

export default function Nav(){
    let {push, pathname} = useRouter()
    let {isMobile} =useResize()
    const [accessToken, setAccessToken] = useState(null);
    const dispatch = useDispatch();
    const { t } = useTranslation('common');
    const isActive = (p) => (pathname === p ? "active" : "");
    let user = useSelector((state) => state.user);
    useEffect(() => {
        const token = localStorage.getItem('user_info');
        setAccessToken(token);
    }, [user]);
    return(
        <>
            <nav className={styles.nav_box}>
                <ul>

                    {(isMobile && accessToken) ?
                        <>
                            <li className={styles[`${isActive("/user/profile")}`]} onClick={() => push('/user/profile')}>{t("Your Profile")}</li>
                            <li className={styles[`${isActive("/user/basket")}`]} onClick={()=>push('/user/basket')}>{t("Your Basket")}</li>
                            <li className={styles[`${isActive("/user/orders")}`]} onClick={()=>push('/user/orders')}>{t("Your Orders")}</li>
                            <li className={styles[`${isActive("/user/checkout")}`]} onClick={()=>push('/user/checkout')}>{t("Checkout")}</li>
                            <li className={styles[`${isActive("/user/checkout")}`]} onClick={()=>{push('/user/checkout');
                                localStorage.removeItem("user_info");
                                localStorage.removeItem("access_token");
                                dispatch(clearUser());
                            }}>{t("Logout")}</li>
                        </>: ''
                    }
                    <li onClick={()=>push('/')} className={styles[`${isActive("/")}`]}>
                        {t("Home")}
                    </li>
                    <li onClick={()=>push('/restaurants')} className={styles[`${isActive("/restaurants")}`]}>
                        {t("Restaurants")}
                    </li>
                    <li onClick={()=>push('/about-us')} className={styles[`${isActive("/about-us")}`]}>
                        {t("About us")}
                    </li>
                    <li onClick={()=>push('/how-it-work')} className={styles[`${isActive("/how-it-work")}`]}>
                        {t("How it works")}
                    </li>
                    <li onClick={()=>push('/faq')} className={styles[`${isActive("/faq")}`]}>
                        {t("F.A.Q")}
                    </li>
                   
                </ul>
            </nav>
        </>
    )
}