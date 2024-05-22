import styles from './card.module.css'
import Image from "next/image";
import {shortText} from '../../../utils/shortText'

type RestaurantState={
    description:string,
    title:string,
    delivery_price:number,
    delivery_time:string,
    isNew:boolean,
    onReadMore: any
}

export default function RestaurantCard(props:RestaurantState) {
    let  restaurant = props
    let onReadMore = restaurant.onReadMore
    return (
        <>
            <div className={styles.restaurant_card} onClick={onReadMore} >
                <div className={styles.card_top}>
                    <Image src={restaurant.image} alt={restaurant.title} width={175} height={165}/>
                    {restaurant.isNew && <span className={styles.new_restaurant}>New</span>}
                </div>
                <div className={styles.card_body}>
                    <h4>{restaurant.title}</h4>
                    <p>{shortText(restaurant.description,44)}</p>
                    <div className={styles.restaurant_bottom}>
                        <span>{restaurant.delivery_price}</span>
                        <p>{restaurant.delivery_time}</p>
                    </div>
                </div>
            </div>
        </>
    )
}