import {useRouter} from "next/router";
import ButtonWeb from "../../Client/Button/ButtonWeb";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import BasketSvg from "../svg/BasketSvg";
import styles from './auth.module.css'
import {getNameFirstLetter} from "../../../utils/getNameFirstLetter";
import {useState} from "react";
import {useResize} from "../../../hooks/useResize";
import {useTranslation} from "next-i18next";

export default function Auth() {
    let {push} = useRouter()
    const [active,setActive]=useState(false)
    function goAuth() {
        push('/login-register')
    }
    let {isMobile} =useResize()
    const { t } = useTranslation('common');
    let user = useSelector((state: RootState) => state.user);
    const nameChar = getNameFirstLetter(user.fullname);
    function handleClick(){
        setActive(!active)
    }
    return (
        <>
            {user.id.length >0 ?
                <div className='flex items-center justify-end gap-3'>
                    <button onClick={()=>push('/user/basket')} className={`flex justify-center items-center ${styles.basket_btn} ${styles.auth_btn}`}><BasketSvg/></button>
                    <button onClick={handleClick} className={`flex justify-center items-center ${styles.user_btn} ${styles.auth_btn}`}>{nameChar} </button>
                    <span className={styles.user_name}>{isMobile && user.fullname}</span>
                    {active &&
                    <>
                        <ul className={styles.submenu}>
                            <li onClick={()=>push('/user/profile')}>{t("Your Profile")}</li>
                            <li onClick={()=>push('/user/basket')}>{t("Your Basket")}</li>
                            <li onClick={()=>push('/user/orders')}>{t("Your Orders")}</li>
                            <li onClick={()=>push('/user/checkout')}>{t("Checkout")}</li>
                            <li>Logout</li>
                        </ul>
                        <div onClick={handleClick} className={styles.shadow}/>
                    </>
                    }
                </div> :
                <ButtonWeb addButtonFun={goAuth} typeButton={true} title={t('Sign Up')} btnSize={'sm'} addButton={false}/>
            }

            {/*<button className={`${styles.btn} ${styles.btn_sm} ${styles.main}`} >Sign up</button>*/}
        </>
    )
}