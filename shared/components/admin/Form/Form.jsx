import styles from './form.module.css'
import CloseSvg from "../svg/CloseSvg";
import CustomButton from "../Button";
import style_form from "./form.module.css";
import UploadImage from "../uploadImage/UploadImage";





function Form({onClose,isOpen,children,title,subtitle}) {
   
    return (
        <>
            {isOpen &&
            <>
                <div className={styles.backdrop} onClick={onClose}></div>
                <div className={styles.add_form_container}>
                    <button type='button' className={styles.close} onClick={onClose}>
                        <CloseSvg/>
                    </button>
                    <div className={styles.form_box}>
                        <div>
                            <h2 className=''>{title}</h2>
                            <div className={style_form.form_items}>
                                <div className={style_form.left_item}>
                                    <h4>Upload your image</h4>
                                </div>
                                <div className={style_form.right_item}>
                                    <div className={style_form.upload_box}>
                                        <UploadImage/>
                                    </div>
                                </div>
                            </div>
                            <div className={style_form.form_items}>
                                <div className={style_form.left_item}>
                                    <h4>{subtitle}</h4>
                                </div>
                                <div className={style_form.right_item}>
                                    <div className={style_form.form_list}>
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.form_bottom}>
                            <CustomButton icon={false} title={'Cancel'} type='button' size={'lg'} color={'2'}
                                          onAction={''}/>
                            <CustomButton icon={false} title={'Create  Product'} type='button' size={'lg'} color={'1'}
                                          onAction={''}/>
                    
          {/* <CustomButton icon={false} title={'Update Product'} type='button' size={'lg'} color={'1'}
                                          onAction={''}/> */}
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}
export default Form