import styles from './navbar.module.css'
import {useRouter} from "next/router";
import CustomButton from "../Button";
import Form from "../Form/Form";
import {useModalOpen} from "../../../hooks/UseModalOpen";
import Input from "../Form/Input";
import ChangeLanguage from "../../Language/ChangeLanguage";
import MenuSvg from '../svg/MenuSvg';
import {useDispatch, useSelector} from "react-redux";
import {openSidebar} from "../../../redux/featuries/sidebar/sidebarSlice";
import {AppDispatch, RootState} from "../../../redux/store";
export default function Navbar() {
    let {push} = useRouter();
    const {isOpen,onOpen,onClose} = useModalOpen()
    let  dispatch: AppDispatch = useDispatch()
    function handleOpenSidebar(){
        dispatch(openSidebar())
    }
    return (
        <>

            <div className={styles.navbar_box}>
                <div className='flex items-center gap-3'>
                    <button onClick={handleOpenSidebar} className={styles.menu_btn}> <MenuSvg /></button>
                    <div className={`${styles.logo_box} flex`}>
                        <button onClick={() => push('/admin/')}>
                            <img src={'/imgs/logo.png'} alt={'logo'}/>
                        </button>
                    </div>
                </div>
                <div className={styles.navbar_right}>
                    <CustomButton icon={true} title={'Add product'} size={'sm'} color={'1'} type={'button'} onAction={onOpen} />
                    <ChangeLanguage/>
                    <div className={styles.admin_box}>
                        <img src="/imgs/avatar.png" alt=""/>
                        <span>Admin</span>
                    </div>
                </div>
            </div>
            <Form  isOpen={isOpen} title={'Add Product'} subtitle={"Add your Product description and necessary information"}  onClose={onClose}>
                <Input title={'Name'} type={'text'} input_name={'product_name'}/>
                <Input title={'Price'} type={'number'} input_name={'product_price'}/>
                <Input title={'Price'} type={'number'} input_name={'product_price'}/>
            </Form>
        </>
    );
}
