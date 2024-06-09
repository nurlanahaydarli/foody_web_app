import styles from './search.module.css'
import RightIcon from "../svg/RightIcon";
import {useEffect, useState} from "react";
import {getRestaurants} from "../../../services";
import { RestaurantPostDataType} from "../../../interfaces";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

export default function Search(){
    let {push}=useRouter()
    const [query, setQuery] = useState('');
    const [restaurants, setRestaurants] = useState<RestaurantPostDataType[]>();
    const [loading, setLoading] = useState(false);
    const [focus,setFocus]=useState(false)
    const {t} =useTranslation("common");
    useEffect(() => {
        if (query.trim() === '') {
            setRestaurants([]);
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getRestaurants();
                let restaurants =   response?.data?.result?.data.filter((restaurant)=>{
                    return restaurant.name?.toLowerCase()?.includes(query)
                })
                setRestaurants(restaurants)
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(fetchData, 500);
        return () => clearTimeout(debounceFetch);
    }, [query]);
    return(
        <>
            <div className={styles.search_container}>
                <input
                    type="text"
                    placeholder={t("Search")}
                    value={query}
                    onFocus={()=>setFocus(true)}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {focus &&
                <div className={styles.search_result}>
                        <ul>
                            {loading ? <li>Loading...</li> :
                                <>{restaurants?.map((restaurant) => (
                                    <li key={restaurant.id} onClick={()=>{push('/restaurants/'+ restaurant.id);setFocus(false)}}>
                                        <img src={restaurant?.img_url ?? '/imgs/no-photo.avif'} alt={restaurant.name}/>
                                        <div>
                                            <p>{restaurant.name}</p>
                                            <span>{restaurant.address}</span>
                                        </div>
                                    </li>
                                ))}</>
                            }
                        </ul>

                        <div className={styles.more_btn}>
                            <button onClick={() => {push('/restaurants');setFocus(false)}}>
                                <span>{t("Show More")}</span> <RightIcon/>
                            </button>
                        </div>
                    </div>
                }
                {focus && <div className={styles.shadow_search} onClick={()=>setFocus(false)}/>}
            </div>
        </>
    )
}