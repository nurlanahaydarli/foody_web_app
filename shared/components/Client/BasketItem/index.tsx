import styles from "../../../../pages/user/basket/basket.module.css";
import Image from "next/image";
import RemoveSvg from "../svg/RemoveSvg";
import React, {useState} from "react";
import PlusSvg from '../svg/PlusSvg'
import MinusSvg from '../svg/MinusSvg'


export default function BasketItem(product: any) {
    console.log(product,'product')
    const [count, setCount] = useState(1);

    function increaseFn(product: any) {
        // let num = count == product.quantity ? product.quantity : count + 1
        let num = count === product.quantity ? product.quantity : Math.min(count + 1, product.quantity)
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
                    <img src='/imgs/basket1.png'  alt={'title'}/>
                    <div className={styles.basket_text}>
                        <h4>
                            {product.name}
                        </h4>
                        <p>
                            ${product.price}
                        </p>
                    </div>
                </div>
                <div className={styles.basket_item}>
                    <div className={styles.basket_quantity}>
                        <button disabled={count === product.quantity} onClick={() => increaseFn(product)}><PlusSvg/>
                        </button>
                        <input type="number" value={count}/>
                        <button onClick={decreaseFn} disabled={count === 1}><MinusSvg/></button>
                    </div>
                    <button><RemoveSvg/></button>
                </div>
            </div>
        </>
    )
}