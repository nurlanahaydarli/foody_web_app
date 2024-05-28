import {useRouter} from "next/router";
import styles from './nav.module.css'
export default function Nav(){
    let {push, pathname} = useRouter()
    const isActive = (p) => (pathname === p ? "active" : "");
    return(
        <>
            <nav className={styles.nav_box}>
                <ul>
                    <li onClick={()=>push('/')} className={styles[`${isActive("/")}`]}>
                        Home
                    </li>
                    <li onClick={()=>push('/restaurants')} className={styles[`${isActive("/restaurants")}`]}>
                        Restaurants
                    </li>
                    <li onClick={()=>push('/about-us')} className={styles[`${isActive("/about-us")}`]}>
                        About us
                    </li>
                    <li onClick={()=>push('/how-it-work')} className={styles[`${isActive("/how-it-work")}`]}>
                        How it works
                    </li>
                    <li onClick={()=>push('/faq')} className={styles[`${isActive("/faq")}`]}>
                        FAQs
                    </li>
                   
                </ul>
            </nav>
        </>
    )
}