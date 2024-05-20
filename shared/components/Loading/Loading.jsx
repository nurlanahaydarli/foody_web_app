import styles from '../../../styles/Home.module.css'
export default function Loading(){

    return(
        <>
            <div className={styles.loading_box}>
                <img src="/imgs/loading-food.gif" alt="" />
            </div>
        </>
    )
}