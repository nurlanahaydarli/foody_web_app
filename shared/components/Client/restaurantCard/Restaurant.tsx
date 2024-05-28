import styles from './card.module.css'
import Image from "next/image";
import {shortText} from '../../../utils/shortText'
import {RestaurantSingleApiResponse} from "../../../interfaces";
import {isNewFunction} from "../../../utils/isNewCreated";


export default function RestaurantCard(restaurant:RestaurantSingleApiResponse) {
    let onReadMore = restaurant.onReadMore;
    let created_at = restaurant.created
    let isNew =isNewFunction(created_at)
    console.log(isNew,'isNew')
    return (
        <>
            <div className={styles.restaurant_card} onClick={onReadMore} >
                <div className={styles.card_top}>
                    <img src={restaurant?.img_url} alt={restaurant.title} className='w-[175px] h-[175px]'/>
                    {isNew && <span className={styles.new_restaurant}>New</span>}
                </div>
                <div className={styles.card_body}>
                    <h4>{restaurant.name}</h4>
                    <p>{shortText(restaurant.cuisine,44)}</p>
                    <div className={styles.restaurant_bottom}>
                        <span>{restaurant.delivery_price} &#8380; Delivery</span>
                        <p>{restaurant.delivery_min} min</p>
                    </div>
                </div>
            </div>
        </>
    )
}