import styles from './products.module.css'
import Image from "next/image";
import PlusSvg from "../svg/PlusSvg";
import React, {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {AddBasket} from "../../../services";
import {BasketPostDataType} from "../../../interfaces";
import { ToastContainer, toast } from 'react-toastify';

type ProductState = {
    id: string ;
    description?: string ;
    img_url: string ;
    name: string ;
    price: number ;
}
export default function ProductsCard(product: ProductState) {
    let {id, description, img_url, name, price} = product;
    const queryClient = useQueryClient();
    const [buttonClicked, setButtonClicked] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    // const {data: basket_data} = useQuery('basket',GetBasket)
    // useEffect(()=>{
    //     basket_data?.data.result.data.items.filter((basket_product)=>{
    //         if(basket_product.id === id){
    //             return setButtonClicked(true)
    //         }else{
    //             return setButtonClicked(false)
    //         }
    //     })
    // },[])

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
                setButtonClicked(false)
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
        if (user) {
            setButtonClicked(true);
            mutation.mutate(basketProduct);
            // toast.success("Successfully!", {
            //     autoClose: 1000,
            // });
        }
        if (!user) {
            setButtonClicked(false);
            // toast.error("Error ", {
            //     autoClose: 1000,
            // });

        }}

        return (
            <>
                <div className={`flex justify-between sm:flex-nowrap flex-wrap  gap-[12px] ${styles.product_box}`}>
                    <div
                        className={`flex justify-start md:flex-nowrap flex-wrap md:gap-[30px] gap-2 ${styles.product_left}`}>
                        <img src={img_url} alt={name} className='w-[60px] h-[60px]'/>
                        <div className={styles.left_text}>
                            <h4>
                                {name}
                            </h4>
                            {description && <p>{description}</p>}
                        </div>
                    </div>
                    <div className={`flex justify-end items-center md:gap-[30px] gap-2 ${styles.product_right}`}>
                        <p>
                            From <span>{price} &#8380;</span>
                        </p>
                        <button onClick={handleAddToBasket} className={buttonClicked ? styles.active : ''}><PlusSvg/>
                        </button>
                    </div>
                </div>

            </>
        )
    }
