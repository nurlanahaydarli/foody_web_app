import styles from './lang.module.css'
export default function ChangeLanguage(){
    return(
        <>
            <div className={styles.lang_box}>
                <button><img src="/imgs/en.png" alt=""/></button>
            </div>
        </>
    )
}