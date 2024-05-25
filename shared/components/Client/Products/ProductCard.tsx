import styles from './products.module.css'
import Image from "next/image";
import PlusSvg from "../svg/PlusSvg";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {AddBasket, getBasket} from "../../../services";
import {toast} from "react-toastify";
import {BasketPostDataType} from "../../../interfaces";

type ProductState = {
    id: string;
    description: string;
    img_url: string;
    name: string;
    price: number;
}
export default function ProductsCard(product: ProductState) {
    let {id, description, img_url, name, price} = product;
    const queryClient = useQueryClient();
    const [active, setActive] = useState(false);
    const user = useSelector((state: RootState) => state.user);

    // const {data: basketData} =useQuery(getBasket)
    function onActive() {
        setActive(!active)
    }

    const handleAddToBasket = () => {
        let basketProduct: BasketPostDataType | string
        setActive(!active);
        // mutation.mutate(basketProduct);
        if (active) {
            console.log(active,'active true' )
            basketProduct = {
                user_id: user?.id,
                product_id: product.id,
            };
        } else {
            console.log(active,'active false')
            basketProduct = ''
            setActive(true);
        }
        console.log(basketProduct,'basketProduct')
    };
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
                        <p>{description}</p>
                    </div>
                </div>
                <div className={`flex justify-end items-center md:gap-[30px] gap-2 ${styles.product_right}`}>
                    <p>
                        From <span>{price} AZN</span>
                    </p>
                    <button onClick={handleAddToBasket} className={active ? styles.active : ''}><PlusSvg/></button>
                </div>
            </div>
        </>
    )
}