import styles from './lang.module.css'
import {useModalOpen} from "../../hooks/UseModalOpen";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


export default function ChangeLanguage() {
    const router = useRouter()

    const initialState = {
        language: typeof window !== "undefined" ?  window.localStorage.getItem('language') : router.locale,
    };
    const {isOpen, onClose, onToggle} = useModalOpen();

    function changeLang(lang:any) {
        router.locale = lang
        const {pathname, asPath, query, push} = router
        router.push({pathname, query}, asPath, {locale: lang})
        localStorage.setItem('language', lang)
        if (router.locale === lang) {
            onClose()
        }
    }

    return (
        <>
            <div className={styles.lang_box}>
                <button onClick={onToggle}><img src={`/imgs/${initialState.language}.png`} alt=""/></button>
                {isOpen &&
                <ul className={styles.lang_list}>
                    <li onClick={() => changeLang('en')}><img src="/imgs/en.png" alt=""/></li>
                    <li onClick={() => changeLang('az')}><img src="/imgs/az.png" alt=""/></li>
                    <li onClick={() => changeLang('fr')}><img src="/imgs/fr.png" alt=""/></li>
                </ul>
                }
            </div>
            {isOpen && <div className={styles.shadow} onClick={onClose}></div>}
        </>
    )
}
