import styles from './card.module.css'
import Image from "next/image";
import {shortText} from '../../../utils/shortText'
import {RestaurantPostDataType} from "../../../interfaces";
import {isNewFunction} from "../../../utils/isNewCreated";
import {useTranslation} from "next-i18next";

export interface RestaurantCardProps extends RestaurantPostDataType {
    onReadMore: () => void;
    created: number
}

export default function RestaurantCard(restaurant: RestaurantCardProps) {
    let onReadMore = restaurant.onReadMore;
    let created_at = restaurant.created
    let isNew = isNewFunction(created_at)
    const {t} =  useTranslation("common");
    return (
        <>
            <div className={styles.restaurant_card} onClick={onReadMore}>
                <div className={styles.card_top}>
                    <img src={restaurant?.img_url ?? '/imgs/no-photo.avif'} alt={restaurant.name}
                         className='w-[175px] h-[175px]'/>
                    {isNew && <span className={styles.new_restaurant}>{t("New")} </span>}
                </div>
                <div className={styles.card_body}>
                    <h4>{shortText(restaurant.name, 12)}</h4>
                    <p>{shortText(restaurant.cuisine, 20)}</p>
                    <div className={styles.restaurant_bottom}>
                        <span>{shortText(`${restaurant.delivery_price}₼  ${t("Delivery")}`,10)}</span>
                        <p>{restaurant.delivery_min} {t("Min")}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
