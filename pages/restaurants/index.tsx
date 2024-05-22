import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import React, {useState} from "react";
import styles from './restaurants.module.css'
import {useRouter} from "next/router";
import Image from "next/image";
import RestaurantCard from "../../shared/components/Client/restaurantCard/Restaurant";


let categoryList = [
    {
        "id": 1,
        "name": "Item 1",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 2,
        "name": "Item 2",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 3,
        "name": "Item 3",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 4,
        "name": "Item 4",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 5,
        "name": "Item 5",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 6,
        "name": "Item 6",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 7,
        "name": "Item 7",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 8,
        "name": "Item 8",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 9,
        "name": "Item 9",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 10,
        "name": "Item 10",
        "images": "/imgs/basket1.png"
    },
    {
        "id": 11,
        "name": "Item 11",
        "images": "/imgs/basket1.png"
    }
]
let restaurantList = [
    {
        "id": 1,
        "image": "/imgs/basket2.png",
        "title": "Product 1",
        "description": "This is a description of Product 1. It is a high-quality item that meets your needs.",
        "delivery_price": 4.99,
        "delivery_time": "3-5 hours",
        "isNew": true,
        "categoryId": 1
    },
    {
        "id": 2,
        "image": "/imgs/basket2.png",
        "title": "Product 2",
        "description": "This is a description of Product 2. A reliable choice for your everyday requirements.",
        "delivery_price": 5.99,
        "delivery_time": "2-4 hours",
        "isNew": false,
        "categoryId": 2
    },
    {
        "id": 3,
        "image": "/imgs/basket2.png",
        "title": "Product 3",
        "description": "This is a description of Product 3. Known for its durability and excellent performance.",
        "delivery_price": 6.99,
        "delivery_time": "1-3 hours",
        "isNew": true,
        "categoryId": 1
    },
    {
        "id": 4,
        "image": "/imgs/basket2.png",
        "title": "Product 4",
        "description": "This is a description of Product 4. Designed with user satisfaction in mind.",
        "delivery_price": 3.99,
        "delivery_time": "4-6 hours",
        "isNew": false,
        "categoryId": 3
    },
    {
        "id": 5,
        "image": "/imgs/basket2.png",
        "title": "Product 5",
        "description": "This is a description of Product 5. A top-rated item in its category.",
        "delivery_price": 2.99,
        "delivery_time": "5-7 hours",
        "isNew": true,
        "categoryId": 2
    },
    {
        "id": 6,
        "image": "/imgs/basket2.png",
        "title": "Product 6",
        "description": "This is a description of Product 6. Offers great value for money.",
        "delivery_price": 4.49,
        "delivery_time": "3-5 hours",
        "isNew": false,
        "categoryId": 3
    },
    {
        "id": 7,
        "image": "/imgs/basket2.png",
        "title": "Product 7",
        "description": "This is a description of Product 7. A popular choice among customers.",
        "delivery_price": 5.49,
        "delivery_time": "2-4 hours",
        "isNew": true,
        "categoryId": 1
    },
    {
        "id": 8,
        "image": "/imgs/basket2.png",
        "title": "Product 8",
        "description": "This is a description of Product 8. Known for its exceptional quality.",
        "delivery_price": 6.49,
        "delivery_time": "1-3 hours",
        "isNew": false,
        "categoryId": 2
    },
    {
        "id": 9,
        "image": "/imgs/basket2.png",
        "title": "Product 9",
        "description": "This is a description of Product 9. Highly recommended for its features.",
        "delivery_price": 3.49,
        "delivery_time": "4-6 hours",
        "isNew": true,
        "categoryId": 3
    },
    {
        "id": 10,
        "image": "/imgs/basket2.png",
        "title": "Product 10",
        "description": "This is a description of Product 10. A versatile and practical item.",
        "delivery_price": 2.49,
        "delivery_time": "5-7 hours",
        "isNew": false,
        "categoryId": 1
    }
]

type restaurantState={
    restaurant_list: [];
    category_list: []
}
export default function Restaurants(props:restaurantState) {
    let {restaurant_list = restaurantList,category_list=categoryList} = props

    const [filteredCategory, setFilteredCategory] = useState(restaurant_list)
    const router = useRouter()

    const filterCategory = (id: number) => {
        router.push({
            pathname: router.pathname,
            query: {category_id: id},
        });
        let filtered_data = restaurant_list.filter((restaurant) => {
            return id == restaurant.id
        })

        setFilteredCategory(filtered_data)

    }
    function onDetail(id:number){
        router.push('restaurants/'+id)
    }
    return (
        <>
            <MainLayout>
                <div className='px-8 pt-8 pb-[100px]'>
                    <div className='flex flex-row'>
                        <div className="w-1/5">
                            <div className={styles.category_list}>
                                <ul>
                                    {category_list?.map((category) => (
                                        <li key={category.id} onClick={() => {
                                            filterCategory(category.id)
                                        }}>
                                            <Image src={category.images} alt={category.name} width={25} height={28}/>
                                            <span>{category.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-4/5">
                            <div className="flex flex-row flex-wrap">
                                {filteredCategory?.map((restaurant) => (
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