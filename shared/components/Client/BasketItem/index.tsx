import styles from "../../../../pages/user/basket/basket.module.css";
import Image from "next/image";
import RemoveSvg from "../svg/RemoveSvg";
import React, {useEffect, useState} from "react";
import PlusSvg from '../svg/PlusSvg'
import MinusSvg from '../svg/MinusSvg'
import {AddBasket, clearBasket, deleteBasket, updateBasketProductCount} from "../../../services";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {BasketPostDataType} from "../../../interfaces";
import {toast} from "react-toastify";

type BasketState = {
    id: string,
    product_id:string,
    name: string,
    price: string,
    count: number,
    img_url:string,
    basket_id:string
}
export default function BasketItem(product: BasketState) {
    let {name, id, price,img_url, count,basket_id} = product;
    const user = useSelector((state: RootState) => state.user);
    const queryClient = useQueryClient();
    const mutationClear = useMutation(
        (basketProduct: BasketPostDataType) => deleteBasket(basketProduct),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('basket');
                toast.success("Product deleted successfully!", {
                    autoClose: 1000,
                });
            },
            onError: (error) => {
                console.error("Error deleting product:", error);
                toast.error("Error deleting product count", {
                    autoClose: 1000,
                });
            },
        }
    );
    const mutation = useMutation(
        (basketProduct: BasketPostDataType) => AddBasket(basketProduct),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('basket');
                toast.success("Product added to the basket successfully!", {
                    autoClose: 1000,
                });
            },
            onError: (error) => {
                console.error("Error adding product to the basket:", error);
                toast.error("Error adding product to the basket", {
                    autoClose: 1000,
                });
            },
        }
    );
    const handleAddToBasket = () => {
        const basketProduct: BasketPostDataType = {
            user_id: user.id,
            product_id: product.id,
        };
        if(user){
            mutation.mutate(basketProduct);
        }
        if(!user){
        }

    };
    async function  handleRemove(){
        const basketId: BasketPostDataType = {
            user_id: user.id,
            basket_id: basket_id,
            product_id: id,
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
                            {price} ₼
                        </p>
                    </div>
                </div>
                <div className={styles.basket_item}>
                    <div className={styles.basket_quantity}>
                        <button onClick={handleAddToBasket}><PlusSvg/>
                        </button>
                        <input type="number" value={count}/>
                        <button onClick={handleRemove}><MinusSvg/></button>
                    </div>
                    <button onClick={handleRemove}><RemoveSvg/></button>
                </div>
            </div>
        </>
    )
}
