import PlusSvg from "../svg/PlusSvg";
import styles from './button.module.css'
import { Spinner } from '@chakra-ui/react'

interface CustomButtonProps {
    title?: any;
    size?: any;
    onAction?:any;
    type?: any;
    color?: any;
    icon?: any;
    innerText?: any;
    className?: any;
    loading?:boolean
}

export default function CustomButton({
                                         title,
                                         size,
                                         onAction,
                                         type,
                                         color,
                                         icon,
                                         innerText,
                                         className,
                                         loading
                                     }: CustomButtonProps) {
    let type_color = color === '1' ? 'type_submit' : 'type_cancel';
    // let type_btn = type === 'submit' ? 'submit' : 'button';
    return (
        <>
            <button
                type={type}
                onClick={onAction}
                className={`${styles[size]} ${className} ${styles.btn} ${styles[type_color]}`}
                disabled={loading}
            >
                {icon && <PlusSvg />}
                <span>{loading&&  <Spinner size='sm' /> } {innerText} {title}</span>
                
            </button>
        </>
    )
}