import styles from './form.module.css'
import CloseSvg from "../svg/CloseSvg";
import UploadSvg from "../svg/UploadSvg";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import AddButton from "../Button";
import CustomButton from "../Button";




function Form({onClose,isOpen,children}) {
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
                        {children}
                        <div className={styles.form_bottom}>
                            <CustomButton icon={false} title={'Cancel'} type='button' size={'lg'} color={'2'}
                                          onAction={''}/>
                            <CustomButton icon={false} title={'Create  Product'} type='button' size={'lg'} color={'1'}
                                          onAction={''}/>
                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}
export default Form