import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import React, { useEffect, useState } from "react";
import styles from './restaurants.module.css';
import { useRouter } from "next/router";
import RestaurantCard from "../../shared/components/Client/restaurantCard/Restaurant";
import { getCategories, getRestaurants } from "../../shared/services";
import FilterSvg from '../../shared/components/Client/svg/FilterSvg';
import { useTranslation } from "next-i18next";
import CloseSvg from "../../shared/components/admin/svg/CloseSvg";
import { useModalOpen } from "../../shared/hooks/UseModalOpen";
import { useResize } from "../../shared/hooks/useResize";
import Loading from "../../shared/components/Loading/Loading";
import { sortDataByCreated } from "../../shared/utils/sortData";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


 function Restaurants() {
    const [categories, setCategories] = useState<any[] | undefined>([]);
    const [restaurants, setRestaurants] = useState<any[] | undefined>([]);
    const [chooseCategory, setChooseCategory] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const router = useRouter();
    const { t } = useTranslation("common");
    let { isOpen, onClose, onOpen } = useModalOpen();
    let { isMobile } = useResize();
    // console.log(restaurants,'restaurants')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryData, restaurantData] = await Promise.all([
                    getCategories(),
                    getRestaurants()
                ]);

                if (categoryData?.data?.result?.data) {
                    setCategories(sortDataByCreated(categoryData.data.result.data));
                }
                if (restaurantData?.data?.result?.data) {
                    setRestaurants(sortDataByCreated(restaurantData.data.result.data));
                }
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredRestaurants = restaurants?.filter((restaurant: any) => {
        const category_id = restaurant.category_id;
        return (
            !chooseCategory || (typeof category_id === "string" && category_id.includes(chooseCategory))
        );
    });

    const handleCategory = (categoryName: string | null) => {
        setChooseCategory(categoryName);
    };

    function onDetail(id: number) {
        router.push('restaurants/' + id);
    }

    return (
        <MainLayout>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error loading data...</div>
            ) : (
                <div className='px-8 pt-8 pb-[100px]'>
                    <div className='flex flex-row lg:flex-nowrap flex-wrap'>
                        <div className="lg:w-1/5 w-full">
                            <div className={styles.category_list}>
                                {isMobile && (
                                    <button className={styles.mobile_filter} onClick={onOpen}>
                                        <FilterSvg />
                                        <span>Filters</span>
                                    </button>
                                )}
                                <div className={`${styles.category_list_box} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`}>
                                    {isMobile && (
                                        <div className={styles.close_category}>
                                            <button onClick={onClose}><CloseSvg /></button>
                                        </div>
                                    )}
                                    <ul>
                                        <li onClick={() => { handleCategory(null); onClose(); }}>
                                            <p className="font-bold text-xl capitalize">
                                                {t("all categories")}
                                            </p>
                                        </li>
                                        {categories?.map((category: any) => (
                                            <li className={`capitalize ${chooseCategory === category.id && styles.active}`} key={category.id} onClick={() => { handleCategory(category.id); onClose(); }}>
                                                <img src={category?.img_url || undefined} alt={category.name} className="w-[25px] h-[25px]" />
                                                <span>{category.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div onClick={onClose} className={`${styles.shadow} ${isMobile ? (isOpen ? styles.show : styles.hide) : styles.show}`} />
                            </div>
                        </div>

                        <div className="lg:w-4/5 w-full">
                            <div className="flex flex-row flex-wrap">
                                {filteredRestaurants?.map((restaurant: any) => (
                                    <div className="xl:w-1/4 w-full lg:w-1/3 md:w-1/2" key={restaurant.id}>
                                        <RestaurantCard {...restaurant} onReadMore={() => onDetail(restaurant.id)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

export default Restaurants


export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
});
