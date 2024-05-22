import React, { useState } from "react";
import Icons from '../../../../public/PapaJohns.svg';
import BurgerIcons from '../../../../public/BurgerKing.svg';
import CardPencil from '../../../../public/cardpensil.svg';
import TrashIcon from '../../../../public/trashicon.svg';
import Image from "next/image";
import BtnTypeIcon from '../../../../public/BtnTypeIcon.svg';

const restaurants = [
    { name: 'Papa John’s', category: 'Pizza', icon: Icons, iconpen: CardPencil, icontrash: TrashIcon},
    { name: 'Burger King', category: 'Fast Food', icon: BurgerIcons, iconpen: CardPencil, icontrash: TrashIcon}
];

const categories = [
    'All',
    'Pizza',
    'Fast Food',
    'Chinese',
    'Mexican',
    'Indian',
    'Italian',
    'Sushi',
    'Dessert'
];

function Adminresturant() {
  
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredRestaurants = selectedCategory === 'All'
        ? restaurants
        : restaurants.filter(restaurant => restaurant.category === selectedCategory);

    return (
        <div className="p-6">

<header className="flex h-20 rounded-lg p-8 adminHeaderbg justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-customgray">Restaurants</h1>
    <div className="flex items-center space-x-4">
      
        <button 
            className="bg-custompurple text-white py-2 px-4 rounded-xl flex items-center justify-between bg-categorycolor w-40"
            onClick={() => setShowCategories(!showCategories)}>

            <span>Category type</span>
            <Image src={BtnTypeIcon} className="w-6 h-6" />

        </button>

        {showCategories && (
            <div className="absolute z-50 mt-60 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-1">
                    {categories.map((category, index) => (
                        <li 
                            key={index} 
                            className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                setSelectedCategory(category);
                                setShowCategories(false);
                            }}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        <button className="bg-custompurple text-white py-2 px-4  rounded-xl">+ ADD RESTAURANT</button>
    </div>
</header>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRestaurants.map((restaurant, index) => (
                    <React.Fragment key={index}>
                        {[...Array(8)].map((_, i) => (

                            <div key={i} className="bg-gray-800 rounded-lg p-2 flex flex-col items-center mb-2">
                                <div className="relative flex items-center space-x-4 bg-white rounded-lg mb-2 p-3 h-13">
                                    <Image className="w-24 h-24 left-0" src={restaurant.icon} alt={restaurant.name} />
                                    <div>
                                        <h2 className="text-xl font-semibold text-black">{restaurant.name}</h2>
                                        <span className="inline-block bg-gray-200 text-gray-800 text-sm rounded-full">
                                            {restaurant.category}
                                        </span>
                                    </div>
                                    <button className="absolute top-2 right-2"><Image src={restaurant.iconpen} /></button>
                                    <button className="absolute bottom-2 right-2"><Image src={restaurant.icontrash}/></button>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Adminresturant;
