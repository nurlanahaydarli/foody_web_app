import React, { useEffect, useReducer, useState } from "react";
import CardPencil from '../../../../public/cardpensil.svg';
import TrashIcon from '../../../../public/trashicon.svg';
import Image from "next/image";
import BtnTypeIcon from '../../../../public/BtnTypeIcon.svg';
import axios from "axios";

interface Restaurant {
  category: string;
  img_url: string;
  name: string;
  resturant: string;
  index: number;
  category_id: string;
}

interface State {
    restaurantData: Restaurant[];
    showCategories: boolean;
    selectedCategory: string;
  }

type Action =
  | { type: 'SET_RESTAURANT_DATA'; payload: Restaurant[] }
  | { type: 'TOGGLE_SHOW_CATEGORIES' }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string };


const initialState: State = {
    restaurantData: [],
    showCategories: false,
    selectedCategory: '',
  };


  function reducer (state: State, action: Action): State {
    
    switch (action.type) {
        case "SET_RESTAURANT_DATA":
            return {...state, restaurantData: action.payload}
        case "TOGGLE_SHOW_CATEGORIES":
            return {...state, showCategories: !state.showCategories };
        case "SET_SELECTED_CATEGORY":
            return {...state, selectedCategory: action.payload, showCategories: false};
    
     default:
        return state;
    }
   
  }

function AdminRestaurant() {

    const [state, dispatch] = useReducer(reducer, initialState);

//   const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get('http://localhost:3000/api/restuarants');
        

        let newData: Restaurant[] = res.data.result.data;

        // let categories: string[] = newData.map((restaurant: Restaurant) => restaurant.category_id);
        // let allCategory: string[] = Array.from(new Set(categories));

        dispatch({type:'SET_RESTAURANT_DATA', payload: newData});

        // dispatch({type:'SET_SELECTED_CATEGORY', payload:''});
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleAllCategoryClick = () => {
    dispatch({type:'SET_SELECTED_CATEGORY', payload:''});
    // dispatch({type:'SET_SHOW_CATEGORIES', payload:false});
  }

  const handleCategoryClick = (category: string) => {
    dispatch({type:'SET_SELECTED_CATEGORY', payload: category});
    // dispatch({type:'SET_SHOW_CATEGORIES', payload:false});
  }

  const renderCategories = () => {
    const uniqueCategories: string[] = Array.from(new Set(state.restaurantData.map((restaurant: Restaurant) => restaurant.category_id)));

    return (
      <div className="absolute z-50 mt-60 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
        <ul className="py-1">
          <li 
            className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
            onClick={handleAllCategoryClick}
          >
            All Categories
          </li>
          {uniqueCategories.map((category, index) => (
            <li 
              key={index}
              className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex h-20 rounded-lg p-8 adminHeaderbg justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-customgray">Restaurants</h1>
        <div className="flex items-center space-x-4">
          <button 
            className="bg-CategoryBtnColor text-white py-2 px-4 rounded-xl flex items-center justify-between bg-categorycolor w-40"
            onClick={() => dispatch({ type: 'TOGGLE_SHOW_CATEGORIES' })}
          >
            <span>Category type</span>
            <Image src={BtnTypeIcon} className="w-6 h-6" alt="Category Type Icon" />
          </button>
          {state.showCategories && renderCategories()}

          <button className="bg-custompurple text-white py-2 px-4 rounded-xl">+ ADD RESTAURANT</button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {state.restaurantData
          .filter((restaurant: Restaurant) => state.selectedCategory === '' || restaurant.category_id === state.selectedCategory)
          .map((restaurant: Restaurant, index: number) => (
            <div key={index} className="bg-gray-800 shadow-black rounded-lg p-4 flex flex-col items-center mb-4">
              <div className="relative flex shadow-black items-center space-x-4 bg-white rounded-lg p-4 w-full">
                <img 
                  src={restaurant.img_url} 
                  alt={restaurant.name}
                  className="w-24 h-24 object-cover rounded-full flex-shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <h2 className="text-xl font-semibold text-black">{restaurant.name}</h2>
                  <span className="inline-block bg-gray-200 text-gray-800 text-sm rounded-full mt-2 px-2 py-1">
                    {restaurant.category_id}
                  </span>
                </div>
                <button className="absolute top-2 right-2"><Image src={CardPencil} alt="Edit" width={25} height={0} /></button>
                <button className="absolute bottom-2 right-2"><Image src={TrashIcon} alt="Delete" width={21} height={0} /></button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminRestaurant;
