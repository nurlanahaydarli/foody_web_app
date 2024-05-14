import styles from './navbar.module.css'
import LogoWeb from "../svg/LogoWeb";
import Nav from "../Nav/Nav";
import Search from "../Search/Search";
import ChangeLanguage from "../../Language/ChangeLanguage";
import Auth from "../auth/Auth";

export default function Header() {
    return (
        <>
            <section className={styles.header_box}>
                <div className={styles.logo_box}>
                    <LogoWeb/>
                </div>
                <Nav/>
                <Search/>
                <ChangeLanguage/>
                <Auth/>
            </section>
        </>
    )
}