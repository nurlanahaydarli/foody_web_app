import {NextPage} from "next";
import styles from './btn.module.css'
interface PROPS {
    title?:string;
    typeButton: boolean;
    btnSize: string;
    addButton?: boolean;
    typeButtonFun?: any ;
    addButtonFun?: any ;

}
function ButtonWeb(props:PROPS) {
    // typeButtonFun,addButtonFun,addTitle
    let {title,btnSize,typeButton,}= props;
    let btn_type = typeButton ? 'main':'ghost'
    return (
        <>
            <button className={`${styles.btn} ${styles[btn_type]} ${styles[btnSize]}`} >
                {title}
            </button>
        </>
    );
};

export default ButtonWeb;
