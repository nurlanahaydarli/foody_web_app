import styles from "../../../../pages/user/basket/basket.module.css";
import Image from "next/image";
import RemoveSvg from "../svg/RemoveSvg";
import React, {useEffect, useState} from "react";
import PlusSvg from '../svg/PlusSvg'
import MinusSvg from '../svg/MinusSvg'
import {clearBasket, deleteBasket} from "../../../services";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {BasketPostDataType} from "../../../interfaces";
import {toast} from "react-toastify";

type ProductState = {
    id: string,
    name: string,
    price: string,
    count: number,
    img_url:string,
    setTotalAmount: any,
}
export default function BasketItem(product: ProductState) {
    let {name, id, price,img_url, count, setTotalAmount} = product;
    let price_number: number = +price;
    const [quantity, setQuantity] = useState(1);
    const user = useSelector((state: RootState) => state.user);
    const queryClient = useQueryClient();
    console.log(user,'user')
    const mutationClear = useMutation(
        (basketProduct: BasketPostDataType) => clearBasket(basketProduct),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('basket');
                toast.success("Product deleted successfully!", {
                    autoClose: 1000,
                });
            },
            onError: (error) => {
                console.error("Error deleteing product :", error);
                toast.error("Error deleteing product count", {
                    autoClose: 1000,
                });
            },
        }
    );

    useEffect(() => {
        setTotalAmount((prev:any) => prev + price_number * quantity);
        return () => {
            setTotalAmount((prev:any) => prev - price_number * quantity);
        };
    }, []);

    function increaseFn() {
        if (quantity < count) {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity + 1;
                setTotalAmount((prev:any) => prev + price_number);
                return newQuantity;
            });
        }
    }

    function decreaseFn() {
        if (quantity > 1) {
            setQuantity((prevQuantity) => {
                const newQuantity = prevQuantity - 1;
                setTotalAmount((prev:any) => prev - price_number);
                return newQuantity;
            });
        }
    }
    async function  handleRemove(){
        const basketId: BasketPostDataType = {
            user_id: user.id,
            basket_id: id,
        };
        mutationClear.mutate(basketId);
    }

    return (
        <>
            <div className={styles.basket_box} key={id}>
                <div className={styles.basket_item}>
                    <img src={img_url} alt={'title'}/>
                    <div className={styles.basket_text}>
                        <h4>
                            {name}
                        </h4>
                        <p>
                            ${price}
                        </p>
                    </div>
                </div>
                <div className={styles.basket_item}>
                    <div className={styles.basket_quantity}>
                        <button disabled={quantity === count} onClick={increaseFn}><PlusSvg/>
                        </button>
                        <input type="number" value={quantity}/>
                        <button onClick={decreaseFn} disabled={quantity === 1}><MinusSvg/></button>
                    </div>
                    <button onClick={handleRemove}><RemoveSvg/></button>
                </div>
            </div>
        </>
    )
}