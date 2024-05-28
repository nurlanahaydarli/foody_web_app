import React, { useEffect, useReducer, useRef, useState } from "react";
import CardPencil from '../../../../public/cardpensil.svg';
import TrashIcon from '../../../../public/trashicon.svg';
import Image from "next/image";
import BtnTypeIcon from '../../../../public/BtnTypeIcon.svg';
import axios from "axios";
import { toast } from "react-toastify";
import Form from "../../../../shared/components/admin/Form/Form"
import Input from "../../../../shared/components/admin/Form/Input"
import { useModalOpen } from "../../../../shared/hooks/UseModalOpen";
import uploadFile from "../../../../shared/utils/uploadFile";

interface Restaurant {
  category: string;
  img_url: string;
  name: string;
  resturant: string;
  id: string;
  category_id: string;
}

interface State {
  restaurantData: Restaurant[];
  showCategories: boolean;
  selectedCategory: string;
  isDeleting: boolean;
  showModal: boolean;
  deleteId: string | null;
}

type Action =
  | { type: 'SET_RESTAURANT_DATA'; payload: Restaurant[] }
  | { type: 'TOGGLE_SHOW_CATEGORIES' }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'DELETE_RESTAURANT'; payload: string }
  | { type: 'SET_IS_DELETING'; payload: boolean }
  | { type: 'SHOW_MODAL'; payload: string }
  | { type: 'HIDE_MODAL' };

const initialState: State = {
  restaurantData: [],
  showCategories: false,
  selectedCategory: '',
  isDeleting: false,
  showModal: false,
  deleteId: null
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RESTAURANT_DATA":
      return { ...state, restaurantData: action.payload }
    case "TOGGLE_SHOW_CATEGORIES":
      return { ...state, showCategories: !state.showCategories };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload, showCategories: false };
    case "DELETE_RESTAURANT":
      const updatedData = state.restaurantData.filter(restaurant => restaurant.id !== action.payload);
      return { ...state, restaurantData: updatedData }
    case "SET_IS_DELETING":
      return { ...state, isDeleting: action.payload };
    case "SHOW_MODAL":
      return { ...state, showModal: true, deleteId: action.payload };
    case "HIDE_MODAL":
      return { ...state, showModal: false, deleteId: null };
    default:
      return state;
  }
}

function AdminRestaurant() {

  const [state, dispatch] = useReducer(reducer, initialState);

  let [Img, setImg] = useState('')
  let [TitleStroge, setTitleStroge] = useState('')
  let [CategoryStroge, setCategoryStroge] = useState('')
  let [TitleValue, setTitleValue] = useState('')
  let [CategoryValue, setCategoryValue] = useState('')
  let [ResetData, setResetData] = useState(true)
  const inpTitle = useRef()
  const inpCategory = useRef()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get('http://localhost:3000/api/restuarants');
        let newData: Restaurant[] = res.data.result.data;
        dispatch({ type: 'SET_RESTAURANT_DATA', payload: newData });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [state.isDeleting]);

  async function RestaurantDelete(id: string) {
    try {
      dispatch({ type: 'SET_IS_DELETING', payload: true })
      await axios.delete(`http://localhost:3000/api/restuarants/${id}`);
      dispatch({ type: 'DELETE_RESTAURANT', payload: id });
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete restaurant", { position: "top-right" });
    } finally {
      dispatch({ type: "SET_IS_DELETING", payload: false })
    }
  }



  async function addRestaurant (){
    let Title = inpTitle?.current?.value
    let Category = inpCategory?.current?.value
    Title.length<=3?setTitleStroge('title have to be longer than 3'): setTitleStroge('')

    let newRestaurant={
      "name": Title,
      "Category": Category
      "img_url":""
    }
    try{
      let res = await uploadFile({
        file:Img,
        collectionId:"restaurant",
        documentId: "restaurant"
      })
      newRestaurant.img_url
    }

  }



  const handleDeleteClick = (id: string) => {
    dispatch({ type: 'SHOW_MODAL', payload: id });
  }

  const handleCancelClick = () => {
    dispatch({ type: 'HIDE_MODAL' });
  }

  const handleConfirmDelete = async () => {
    if (state.deleteId) {
      await RestaurantDelete(state.deleteId);
      dispatch({ type: 'HIDE_MODAL' });
    }
  }

  const handleAllCategoryClick = () => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: '' });
  }

  const handleCategoryClick = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
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
                <button className="absolute top-2 right-2" onClick={() => handleDeleteClick(restaurant.id)}>
                  <Image src={CardPencil} alt="Edit" width={25} height={0} />
                </button>
                <button className="absolute bottom-2 right-2">
                  <Image src={TrashIcon} alt="Delete" width={21} height={0} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {state.showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 h-48 bg-white rounded-md">
            <h1 className="flex justify-center mt-6 font-bold text-xl">Are you sure it’s deleted?</h1>
            <h1 className="flex justify-center items-center mt-2">Attention! If you delete this</h1>
            <h1 className="flex justify-center items-center">product, it will not come back...</h1>
            <div className="flex justify-center mt-5">
              <button
                className="border ml-5 border-x-8 border-y-8 bg-whiteLight1 border-black shadow-md text-gray-900 w-20 h-8"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="border ml-5 border-x-8 border-y-8  bg-mainRed border-black shadow-md text-gray-900 w-20 h-8"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Form>
        <Input />
      </Form>

    </div>
  );
}

export default AdminRestaurant;
