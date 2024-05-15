import styles from "../../../../pages/user/basket/basket.module.css";
import Image from "next/image";
import RemoveSvg from "../svg/RemoveSvg";
import React, {useState} from "react";
import PlusSvg from '../svg/PlusSvg'
import MinusSvg from '../svg/MinusSvg'


export default function BasketItem(product) {
    const [count, setCount] = useState(1);

    function increaseFn(product) {
        let num = count == product.quantity ? product.quantity : count + 1
        setCount(num)
    }

    function decreaseFn() {
        let num = count === 1 ? 1 : count - 1
        setCount(num)
    }

    return (
        <>
            <div className={styles.basket_box} key={product.id}>
                <div className={styles.basket_item}>
                    <Image src='/imgs/basket1.png' width={96} height={96} alt={'title'}/>
                    <div className={styles.basket_text}>
                        <h4>
                            {product.title}
                        </h4>
                        <p>
                            ${product.price}
                        </p>
                    </div>
                </div>
                <div className={styles.basket_item}>
                    <div className={styles.basket_quantity}>
                        <button disabled={count === product.quantity ? 'disabled' : ''} onClick={() => increaseFn(product)}><PlusSvg /></button>
                        <input type="number" value={count} />
                        <button onClick={decreaseFn} disabled={count === 1 ? 'disabled' : ''}><MinusSvg /> </button>
                    </div>
                    <button><RemoveSvg/></button>
                </div>
            </div>
        </>
    )
}