import {useState, useEffect, useLayoutEffect} from 'react';
import { useRouter } from 'next/router';
import styles from './lang.module.css';
import { useModalOpen } from '../../hooks/UseModalOpen';

export default function ChangeLanguage() {
    const router = useRouter();
    const [language, setLanguage] = useState<string>('');
    const { isOpen, onClose, onToggle } = useModalOpen();

    useLayoutEffect(() => {
        const storedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('language') : null;
        const initialLang = storedLanguage || 'az';
        if (router.locale !== initialLang) {
            router.push(router.pathname, router.asPath, { locale: initialLang });
        }

        setLanguage(initialLang);
    }, [router.locale]);

    function changeLang(lang: string) {
        router.push(router.pathname, router.asPath, { locale: lang });
        localStorage.setItem('language', lang);
        setLanguage(lang);
        onClose();
    }

    return (
        <>
            <div className={styles.lang_box}>
                <button onClick={onToggle}>
                    <img src={`/imgs/${language}.png`} alt="" />
                </button>
                {isOpen && (
                    <ul className={styles.lang_list}>
                        <li onClick={() => changeLang('en')}>
                            <img src="/imgs/en.png" alt="" />
                        </li>
                        <li onClick={() => changeLang('az')}>
                            <img src="/imgs/az.png" alt="" />
                        </li>
                        <li onClick={() => changeLang('fr')}>
                            <img src="/imgs/fr.png" alt="" />
                        </li>
                    </ul>
                )}
            </div>
            {isOpen && <div className={styles.shadow} onClick={onClose} />}
        </>
    );
}
