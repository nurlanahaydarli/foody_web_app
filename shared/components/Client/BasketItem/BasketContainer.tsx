import styles from "../../../../pages/user/basket/basket.module.css";
import BasketSvg from "../svg/BasketSvg";
import BasketItem from "./index";
import React, {useEffect, useState} from "react";
import EmptyBasket from '../EmptyBasket/index'
import {clearBasket, deleteBasket, GetBasket, getCategories} from "../../../services";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useRouter} from "next/router";
import RemoveSvg from "../svg/RemoveSvg";
import {BasketPostDataType} from "../../../interfaces";
import {toast} from "react-toastify";
import Loading from "../../Loading/Loading";

type BasketProps = {
    productCount?: number;
    data_list?: string[],
    size: string
}

export default function BasketContainer(props: BasketProps) {
    let {size} = props
    let {push}=useRouter()
    const [userLoaded, setUserLoaded] = useState(false);
    const { data: basketList, isLoading: basketLoading } = useQuery("basket", GetBasket, {
        enabled: userLoaded
    });
    let basket_list = basketList?.data.result.data;
    const user = useSelector((state: RootState) => state.user);
    const queryClient = useQueryClient();
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
                console.error("Error deleting basket:", error);
                toast.error("Error deleting basket", {
                    autoClose: 1000,
                });
            },
        }
    );
    function handleClear(){
        const basketId: BasketPostDataType = {
            user_id: user.id,
            basket_id: basket_list?.id
        };
        mutationClear.mutate(basketId);
    }
    useEffect(() => {
        if (user.id) {
            setUserLoaded(true);
        }
    }, [user.id]);

    return (
        <>
            {basketLoading?
                <Loading/>:
                <div className={`${styles.user_cabinet_box} ${styles[size]}`}>
                    {basket_list?.items.length>0?
                        <>
                            <h2 className={styles.user_cabinet_title}>
                                Your Basket
                            </h2>
                            <div className="flex justify-between items-center mb-5">
                                <div className={styles.item_counts}>
                                    <BasketSvg/> <span>{basket_list?.items.length} items</span>
                                </div>
                                <button onClick={handleClear} className={`lightRed gap-2 flex items-center ${styles.clear_btn}`}><RemoveSvg/> Clear Basket</button>
                            </div>
                            <div className={styles.basket_list}>
                                {basket_list?.items?.map((product) => (
                                    <BasketItem  total_count={basket_list.total_count} basket_id={basket_list.id} total_amount={basket_list.total_amount}  key={product.id}  {...product} />
                                ))}
                            </div>
                            <button className={styles.checkout_btn} onClick={()=>push('/user/checkout')}>
                                <span>
                                    Checkout
                                </span>
                                <p>
                                    &#8380; {basket_list.total_amount}
                                </p>
                            </button>
                        </> :
                        <EmptyBasket/>
                    }
                </div>
            }

        </>
    )
}
