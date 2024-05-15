import {useRouter} from "next/router";
import ButtonWeb from "../Button/ButtonWeb";
import styles from '../Button/btn.module.css'

export default function Auth(){
    let {push}=useRouter()
    return(
        <>
             {/*<ButtonWeb typeButton={true} title={'Sign up'} btnSize={'sm'} addButton={false} />*/}
            <button className={`${styles.btn} ${styles.btn_sm} ${styles.main}`} >Sign up</button>
        </>
    )
}