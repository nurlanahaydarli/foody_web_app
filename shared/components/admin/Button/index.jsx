import PlusSvg from "../svg/PlusSvg";
import styles from './button.module.css'

export default function CustomButton({title, size, onAction, type,color,icon, innerText,className }) {
    let type_color = color === '1' ? 'type_submit':'type_cancel'
    let type_btn = type === 'submit' ? 'submit':'button'
    return (
        <>
            <button type={type_btn} onClick={onAction} className={`${styles[size]} ${className} ${styles.btn} ${styles[type_color]}`}>
            {innerText}
                {icon && <PlusSvg/>}
                <span>{title}</span>
            </button>
        </>
    )
}