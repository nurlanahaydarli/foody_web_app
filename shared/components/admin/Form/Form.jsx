import styles from './form.module.css'
import CloseSvg from "../svg/CloseSvg";
import CustomButton from "../Button";
import style_form from "./form.module.css";
// import UploadImage from "../uploadImage/UploadImage";
import {useEffect, useState} from "react";
import UploadSvg from "../svg/UploadSvg";
import Image from "next/image";

;

function Form({
                  onClose, isOpen, children, title, subtitle,
                  btnTitle = 'Create  Product',
                  onAction = () => console.log('add action'),
                  setIMG = (img) => console.log('add set img'),
                  IMG = undefined,
              }) {
    const [imgFile,setImgFile]=useState('/imgs/no-photo.avif')
    function setImgChange(e){
        const file = e.target.files[0];
        if (file) {
            setIMG(e.target.files[0])
            setImgFile(URL.createObjectURL(file));
        }
    }
    useEffect(() => {
        if (IMG) {
            setImgFile(IMG instanceof File ? URL.createObjectURL(IMG) : IMG);
        }
    }, [IMG]);
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
                                    <img  className='mt-2' src={IMG? IMG : imgFile} alt=""/>
                                </div>
                                <div className={style_form.right_item}>
                                    <div className={style_form.upload_box}>
                                        <input type="file" id='upload_file' onChange={setImgChange}  />
                                        <label htmlFor="upload_file">
                                            <UploadSvg/>
                                            <span>upload</span>
                                        </label>
                                        {/*<UploadImage setImageList={setIMG} IMG={IMG} />*/}
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
                            />
                            <CustomButton  icon={false} title={btnTitle} type='button' size={'lg'} color={'1'}
                                          onAction={onAction} />

                        </div>
                    </div>
                </div>
            </>
            }
        </>
    )
}

export default Form