import styles from './navbar.module.css'
import {useRouter} from "next/router";
import CustomButton from "../Button";
import Form from "../Form/Form";
import {useModalOpen} from "../../../hooks/UseModalOpen";
import Input from "../Form/Input";
import ChangeLanguage from "../../Language/ChangeLanguage";

export default function Navbar() {
    let {push} = useRouter();
    const {isOpen,onOpen,onClose} = useModalOpen()

    return (
        <>

            <div className={styles.navbar_box}>
                <div className={styles.logo_box}>
                    <button onClick={() => push('/admin/products')}>
                        <img src={'/imgs/logo.png'} alt={'logo'}/>
                    </button>
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
                <Input title={'Name'} type={'text'} name={'product_name'}/>
                <Input title={'Price'} type={'number'} name={'product_price'}/>
                <Input title={'Price'} type={'number'} name={'product_price'}/>
            </Form>
        </>
    );
}
