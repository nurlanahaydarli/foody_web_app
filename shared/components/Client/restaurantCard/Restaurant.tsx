import styles from './card.module.css'
import Image from "next/image";
import {shortText} from '../../../utils/shortText'
import {RestaurantSingleApiResponse} from "../../../interfaces";


export default function RestaurantCard(restaurant:RestaurantSingleApiResponse) {
    let onReadMore = restaurant.onReadMore
    return (
        <>
            <div className={styles.restaurant_card} onClick={onReadMore} >
                <div className={styles.card_top}>
                    {/*<Image src={restaurant?.img_url} alt={restaurant.title} width={175} height={165}/>*/}
                    {restaurant.isNew && <span className={styles.new_restaurant}>New</span>}
                </div>
                <div className={styles.card_body}>
                    <h4>{restaurant.name}</h4>
                    <p>{shortText(restaurant.cuisine,44)}</p>
                    <div className={styles.restaurant_bottom}>
                        <span>{restaurant.delivery_price} AZN Delivery</span>
                        <p>{restaurant.delivery_min} min</p>
                    </div>
                </div>
            </div>
        </>
    )
}