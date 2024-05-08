import styles from './navbar.module.css'
import {useRouter} from "next/router";
import CustomButton from "../Button";
import Form from "../Form/Form";
import {useModalOpen} from "../../../hooks/UseModalOpen";
import Input from "../Form/Input";
import style_form from "../Form/form.module.css";
import UploadImage from "../uploadImage/UploadImage";

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
                    <div className={styles.admin_box}>
                        <img src="/imgs/avatar.png" alt=""/>
                        <span>Admin</span>
                    </div>
                </div>
            </div>
            <Form  isOpen={isOpen}  onClose={onClose}>
                    <div>
                        <h2 className=''>Add Products</h2>
                        <div className={style_form.form_items}>
                            <div className={style_form.left_item}>
                                <h4>Upload your product image</h4>
                            </div>
                            <div className={style_form.right_item}>
                                <div className={style_form.upload_box}>
                                    <UploadImage/>
                                </div>
                            </div>
                        </div>
                        <div className={style_form.form_items}>
                            <div className={style_form.left_item}>
                                <h4>Add your Product description and necessary information</h4>
                            </div>
                            <div className={style_form.right_item}>
                                <div className={style_form.form_list}>
                                    <Input title={'Name'} type={'text'} name={'product_name'}/>
                                    <Input title={'Price'} type={'number'} name={'product_price'}/>
                                    <Input title={'Price'} type={'number'} name={'product_price'}/>
                                </div>
                            </div>
                        </div>
                    </div>
            </Form>
        </>
    );
}
