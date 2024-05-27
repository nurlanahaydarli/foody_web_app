import styles from "../../../../pages/user/basket/basket.module.css";
import BasketSvg from "../svg/BasketSvg";
import BasketItem from "./index";
import React, {useEffect, useState} from "react";
import EmptyBasket from '../EmptyBasket/index'
import {GetBasket, getCategories} from "../../../services";
import {useQuery} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useRouter} from "next/router";

type BasketProps = {
    productCount?: number;
    data_list?: string[],
    size: string
}

export default function BasketContainer(props: BasketProps) {
    let {size} = props
    let {push}=useRouter()
    const user = useSelector((state: RootState) => state.user);
    const [totalAmount, setTotalAmount] = useState(0);
    const { data: basketList } = useQuery("basket", GetBasket);
    let basket_list = basketList?.data.result.data;


    useEffect(() => {
        function initialAmount() {
            let x = basket_list?.items?.map((num) => {
                return +num.price * (num.quantity || 1); // Use quantity if available
            }) || [];

            // Calculate the sum of the array
            let sum = x.reduce((acc, curr) => acc + curr, 0);

            setTotalAmount(sum);
        }

        initialAmount();
    }, [basket_list]);

    return (
        <>
            <div className={`${styles.user_cabinet_box} ${styles[size]}`}>
                {basket_list?
                    <>
                        <h2 className={styles.user_cabinet_title}>
                            Your Basket
                        </h2>
                        <div className={styles.item_counts}>
                            <BasketSvg/> <span>{basket_list?.items.length} items</span>
                        </div>
                        <div className={styles.basket_list}>
                            {basket_list?.items?.map((product) => (
                                <BasketItem setTotalAmount={setTotalAmount} key={product.id}  {...product} />
                            ))}
                        </div>
                        <button className={styles.checkout_btn} onClick={()=>push('/user/checkout')}>
                                <span>
                                    Checkout
                                </span>
                            <p>
                                &#8380; {totalAmount}
                            </p>
                        </button>
                    </> :
                    <EmptyBasket/>
                }
            </div>
        </>
    )
}