import {useRouter} from "next/router";
import ButtonWeb from "../../Client/Button/ButtonWeb";
import {useSelector,useDispatch} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import BasketSvg from "../svg/BasketSvg";
import styles from './auth.module.css'
import {getNameFirstLetter} from "../../../utils/getNameFirstLetter";
import {useEffect, useState} from "react";
import {useResize} from "../../../hooks/useResize";
import {useTranslation} from "next-i18next";
import {clearUser} from "../../../redux/featuries/user/userSılice";

export default function Auth() {
    let {push} = useRouter()
    const [active,setActive]=useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    function goAuth() {
        push('/login-register')
    }
    const dispatch: AppDispatch = useDispatch();
    let {isMobile} =useResize()
    const { t } = useTranslation('common');
    let user = useSelector((state: RootState) => state.user);
    const nameChar = getNameFirstLetter(user.fullname);
    function handleClick(){
        setActive(!active)
    }
    useEffect(() => {
        const token = localStorage.getItem('user_info');
        setAccessToken(token);
    }, [user]);
    return (
        <>
            {accessToken ?
                <div className='flex items-center justify-end gap-3'>
                    <button onClick={()=>push('/user/basket')} className={`flex justify-center items-center ${styles.basket_btn} ${styles.auth_btn}`}><BasketSvg/></button>
                    <button onClick={handleClick} className={`flex justify-center items-center ${styles.user_btn} ${styles.auth_btn}`}>{nameChar} </button>
                    <span className={styles.user_name}>{isMobile && user.fullname}</span>
                    {active &&
                    <>
                        {!isMobile &&
                        <>
                            <ul className={styles.submenu}>
                                <li onClick={() => push('/user/profile')}>{t("Your Profile")}</li>
                                <li onClick={() => push('/user/basket')}>{t("Your Basket")}</li>
                                <li onClick={() => push('/user/orders')}>{t("Your Orders")}</li>
                                <li onClick={() => push('/user/checkout')}>{t("Checkout")}</li>
                                <li onClick={() => {
                                    push('/')
                                    localStorage.removeItem("access_token")
                                    localStorage.removeItem("user_info")
                                    dispatch(clearUser());
                                }}>{t("Logout")}
                                </li>
                            </ul>
                            <div onClick={handleClick} className={styles.shadow}/>
                        </>
                        }
                    </>
                    }
                </div> :
                <ButtonWeb addButtonFun={goAuth} typeButton={true} title={t('Sign Up')} btnSize={'sm'} addButton={false}/>
            }

        </>
    )
}