import styles from './navbar.module.css'
import LogoWeb from "../svg/LogoWeb";
import Nav from "../Nav/Nav";
import Search from "../Search/Search";
import ChangeLanguage from "../../Language/ChangeLanguage";
import MenuSvg from '../../admin/svg/MenuSvg';
import CloseSvg from '../../admin/svg/CloseSvg';
import { useModalOpen } from '../../../hooks/UseModalOpen';
import {useResize} from "../../../hooks/useResize";
import {useRouter} from "next/router";
import Auth from "../auth/Auth";

export default function Header() {
        let {isOpen,onOpen,onClose}=useModalOpen();
        let {isMobile} = useResize()
        let {push} = useRouter()
    return (
        <>
            <section className={`${styles.header_box} ${isOpen? styles.shadow :''} `}>
                <div className={`${styles.logo_box} flex gap-3 items-center`}>
                <button onClick={onOpen} className={styles.mobile_svg}><MenuSvg /></button>
                <div className='cursor-pointer' onClick={()=>push('/')}><LogoWeb/></div>
                </div>
              
                <div className={`${styles.menu_box} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`}>
                    <button onClick={onClose} className={styles.mobile_show}>
                        <CloseSvg  />
                    </button>
                    <div className={styles.mobile_show}>
                        <Auth />
                    </div>
                    <Nav />
                </div>
                <Search/>
                <div className='flex flex-row gap-4 items-center'> 
                    <ChangeLanguage/>
                    <div className={styles.mobile_hide}>
                        <Auth/>
                    </div>
                </div>
            </section>
        </>
    )
}