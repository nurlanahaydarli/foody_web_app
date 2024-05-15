import PlusSvg from "../svg/PlusSvg";
import styles from './button.module.css'

interface CustomButtonProps {
    title?: any;
    size?: any;
    onAction?: any;
    type?: any;
    color?: any;
    icon?: any;
    innerText?: any;
    className?: any;
}

export default function CustomButton({
                                         title,
                                         size,
                                         onAction,
                                         type,
                                         color,
                                         icon,
                                         innerText,
                                         className
                                     }: CustomButtonProps) {
    let type_color = color === '1' ? 'type_submit' : 'type_cancel';
    let type_btn = type === 'submit' ? 'submit' : 'button';
    return (
        <>
            <button
                type={type_btn}
                onClick={onAction}
                className={`${styles[size]} ${className} ${styles.btn} ${styles[type_color]}`}
            >
                {icon && <PlusSvg />}
                <span>{innerText}</span>
                {title}
            </button>
        </>
    )
}