import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import React, {useEffect, useState} from "react";
import styles from './restaurants.module.css'
import {useRouter} from "next/router";
import Image from "next/image";
import RestaurantCard from "../../shared/components/Client/restaurantCard/Restaurant";
import {getCategories, getRestaurants} from "../../shared/services";
import {useQuery} from "react-query";
import {
    CategoryPostDataType,
    RestaurantPostDataType, RestaurantSingleApiResponse,
} from "../../shared/interfaces";
import {useTranslation} from "next-i18next";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Restaurants() {
    const {data} = useQuery("category", getCategories);
    const [chooseCategory, setChooseCategory] = useState<string | null>(null);
    const router = useRouter()
    const {t} = useTranslation("common");

    const {
        data: restaurants,
        isLoading,
        isError,
    } = useQuery("restuarants", getRestaurants);


    const filteredRestaurants = (restaurants?.data.result.data || []).filter((restaurant: RestaurantSingleApiResponse) => {
        const category_id = restaurant.category_id;
        return (
            !chooseCategory || (typeof category_id === "string" && category_id.includes(chooseCategory))
        );
    })
    const handleCategory = (categoryName: string | null) => {
        setChooseCategory(categoryName);
    };
    //  router.push({
    //         pathname: router.pathname,
    //         query: {category_id: id},
    //     });

    function onDetail(id: number) {
        router.push('restaurants/' + id)
    }
    let categories= data?.data?.result?.data
    console.log(categories,'categories')
    return (
        <>
            <MainLayout>
                <div className='px-8 pt-8 pb-[100px]'>
                    <div className='flex flex-row'>
                        <div className="w-1/5">
                            <div className={styles.category_list}>
                                <ul>
                                    <li onClick={() => handleCategory(null)}>
                                        <p className="font-bold text-xl capitalize">
                                            {t("all categories")}
                                        </p>
                                    </li>
                                    {
                                    categories?.map((category: CategoryPostDataType) => (
                                        <li className='capitalize' key={category.id} onClick={() => handleCategory(category.id)}>
                                            <img src={category?.img_url} alt={category.name} className="w-[25px] h-[25px]" />
                                            <span>{category.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="w-4/5">
                            <div className="flex flex-row flex-wrap">
                                {filteredRestaurants.map((restaurant) => (
                                    <div className="w-1/4" key={restaurant.id}>
                                        <RestaurantCard {...restaurant} onReadMore={()=>onDetail(restaurant.id)}/>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>

            </MainLayout>

        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
});