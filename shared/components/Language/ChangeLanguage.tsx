import styles from './lang.module.css'
import {useModalOpen} from "../../hooks/UseModalOpen";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";


export default function ChangeLanguage() {
    const router = useRouter()
    console.log(router,'router')
    const searchParams = useSearchParams()
    let search = searchParams.get('lang') || 'az'

    const {isOpen, onClose, onToggle} = useModalOpen();
    const {t, i18n} = useTranslation('common')
    const [lang, setLang] = useState("")

    function changeLang(lang) {
        setLang(lang)
        router.locale = lang
    }

    useEffect(()=>{
        if(search) setLang(search)
    },[search])

    const onToggleLanguageClick = (newLocale: string) => {
        const {pathname, asPath, query, push} = router
        router.push({pathname, query}, asPath, {locale: newLocale})
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clientSideLanguageChange = (newLocale: string) => {
        // i18n.changeLanguage(newLocale);
    }
    return (
        <>
            <div className={styles.lang_box}>
                <button onClick={onToggle}><img src={`/imgs/${lang}.png`} alt=""/></button>
                {isOpen &&
                <ul className={styles.lang_list}>
                    <li onClick={() => changeLang('en')}><img src="/imgs/en.png" alt=""/></li>
                    <li onClick={() => changeLang('az')}><img src="/imgs/az.png" alt=""/></li>
                    <li onClick={() => changeLang('ru')}><img src="/imgs/ru.png" alt=""/></li>
                </ul>
                }
            </div>
            {isOpen && <div className={styles.shadow} onClick={onClose}></div>}
        </>
    )
}