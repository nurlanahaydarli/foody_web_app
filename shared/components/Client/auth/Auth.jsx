import {useRouter} from "next/router";
import ButtonWeb from "../../Client/Button/ButtonWeb";

export default function Auth(){
    let {push}=useRouter()
    function goAuth(){
        push('login-register')
        console.log('log')
    }
    return(
        <>
             <ButtonWeb addButtonFun={goAuth} typeButton={true} title={'Sign up'} btnSize={'sm'} addButton={false} />
            {/*<button className={`${styles.btn} ${styles.btn_sm} ${styles.main}`} >Sign up</button>*/}
        </>
    )
}