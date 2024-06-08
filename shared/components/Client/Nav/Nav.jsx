import {useRouter} from "next/router";
import styles from './nav.module.css'
import {useTranslation} from "next-i18next";
export default function Nav(){
    let {push, pathname} = useRouter()
    const { t } = useTranslation('common');
    const isActive = (p) => (pathname === p ? "active" : "");
    return(
        <>
            <nav className={styles.nav_box}>
                <ul>
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