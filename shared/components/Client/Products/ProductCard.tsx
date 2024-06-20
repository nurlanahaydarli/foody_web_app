import styles from './products.module.css';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { AddBasket, GetBasket } from '../../../services';
import { BasketPostDataType } from '../../../interfaces';
import 'react-toastify/dist/ReactToastify.css';
import PlusSvg from "../svg/PlusSvg";
import {useToast} from "@chakra-ui/react";

type ProductState = {
    id: string;
    description?: string;
    img_url: string;
    name: string;
    price: number;
};

export default function ProductsCard(product: ProductState) {
    let { id, description, img_url, name, price } = product;
    const queryClient = useQueryClient();
    const [buttonClicked, setButtonClicked] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const toast = useToast()
    const { data: basketData } = useQuery('basket', GetBasket);

    useEffect(() => {
        if (basketData) {
            const isInBasket = basketData.data.result.data.items.some((basketProduct: any) => basketProduct.product_id === id);
            setButtonClicked(isInBasket);
        }
    }, [basketData, id]);

    const mutation = useMutation((basketProduct: BasketPostDataType) => AddBasket(basketProduct),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('basket');
                toast({
                    title: `Product added to the basket successfully!`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position:'top-right',
                    variant:'subtle'
                })
            },
            onError: (error) => {
                console.error("Error adding product to the basket:", error);
                setButtonClicked(false);
                toast({
                    title: `Please log in to add products to the basket`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position:'top-right',
                    variant:'subtle'
                })
            },
        }
    );

    const handleAddToBasket = () => {
        if (!user.fullname.length) {
            toast({
                title: `Please log in to add products to the basket`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top-right',
                variant:'subtle'
            })
            return;
        }

        const basketProduct = {
            user_id: user.id,
            product_id: id,
        };

        setButtonClicked(true);
        mutation.mutate(basketProduct);
    };

    return (
        <>
            <div className={`flex justify-between sm:flex-nowrap flex-wrap gap-[12px] ${styles.product_box}`}>
                <div className={`flex justify-start md:flex-nowrap flex-wrap md:gap-[30px] gap-2 ${styles.product_left}`}>
                    <img src={img_url} alt={name} className='w-[60px] h-[60px]' />
                    <div className={styles.left_text}>
                        <h4>{name}</h4>
                        {description && <p>{description}</p>}
                    </div>
                </div>
                <div className={`flex justify-end items-center md:gap-[30px] gap-2 ${styles.product_right}`}>
                    <p>From <span>{price} &#8380;</span></p>
                    <button onClick={handleAddToBasket} className={buttonClicked ? styles.active : ''}>
                        <PlusSvg />
                    </button>
                </div>
            </div>
        </>
    );
}
