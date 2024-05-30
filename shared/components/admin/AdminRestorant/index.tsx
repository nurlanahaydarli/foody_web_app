import React, { useEffect, useReducer, useRef, useState } from "react";
import CardPencil from '../../../../public/cardpensil.svg';
import TrashIcon from '../../../../public/trashicon.svg';
import Image from "next/image";
import BtnTypeIcon from '../../../../public/BtnTypeIcon.svg';
import axios from "axios";
import { toast } from "react-toastify";
import Form from "../../../../shared/components/admin/Form/Form";
import Input from "../../../../shared/components/admin/Form/Input";
import { useModalOpen } from "../../../../shared/hooks/UseModalOpen";
import uploadFile from "../../../../shared/utils/uploadFile";
import { EditRestaurant, PostRestaurant, getRestaurants } from "../../../services";
import { instanceAxios } from "../../../helpers/instanceAxios";

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
  isAdd: boolean;
}

type Action =
  | { type: 'SET_RESTAURANT_DATA'; payload: Restaurant[] }
  | { type: 'TOGGLE_SHOW_CATEGORIES' }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'DELETE_RESTAURANT'; payload: string }
  | { type: 'SET_IS_DELETING'; payload: boolean }
  | { type: 'SET_IS_ADD'; payload: boolean}
  | { type: 'SHOW_MODAL'; payload: string }
  | { type: 'HIDE_MODAL' };

const initialState: State = {
  restaurantData: [],
  showCategories: false,
  selectedCategory: '',
  isDeleting: false,
  showModal: false,
  deleteId: null,
  isAdd: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RESTAURANT_DATA":
      return { ...state, restaurantData: action.payload };
    case "TOGGLE_SHOW_CATEGORIES":
      return { ...state, showCategories: !state.showCategories };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload, showCategories: false };
    case "DELETE_RESTAURANT":
      const updatedData = state.restaurantData.filter(restaurant => restaurant.id !== action.payload);
      return { ...state, restaurantData: updatedData };
    case "SET_IS_DELETING":
      return { ...state, isDeleting: action.payload };
    case "SHOW_MODAL":
      return { ...state, showModal: true, deleteId: action.payload };
    case "HIDE_MODAL":
      return { ...state, showModal: false, deleteId: null };
    case "SET_IS_ADD":
      return {...state, isAdd: action.payload}
    default:
      return state;
  }
}

function AdminRestaurant() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [Img, setImg] = useState<string | File>('');
  const { isOpen, onOpen, onClose } = useModalOpen();
 

  const [editID, setEditID] = useState('');
  const [editImg, setEditImg] = useState('');

  const [TitleValue, setTitleValue] = useState('');
  const [TitleStroge, setTitleStroge] = useState('');

  const [CategoryValue, setCategoryValue] = useState('');
  const [CategoryStroge, setCategoryStroge] = useState('');

  const [CuisineValue, setCuisineValue] = useState('');
  const [CuisineStroge, setCuisineStroge] = useState('');

  const [DeliveryPriceValue, setDeliveryPriceValue] = useState('');
  const [DeliveryPriceStroge, setDeliveryPriceStroge] = useState('');

  const [DeliveryMinValue, setDeliveryMinValue] = useState('');
  const [DeliveryMinStroge, setDeliveryMinStroge] = useState('');

  const [AdressValue, setAdressValue] = useState('');
  const [AdressStroge, setAdressStroge] = useState('');

  const inpTitle = useRef();
  const inpCategory = useRef();
  const inpCuisine = useRef()
  const inpDeliveryPrice = useRef();
  const inpDeliveryMin = useRef();
  const inpAdress = useRef();


  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        let res = await getRestaurants();
        let newData: Restaurant[] = res.data.result.data;
        dispatch({ type: 'SET_RESTAURANT_DATA', payload: newData });
      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurants();
  }, [state.isDeleting, state.isAdd]);

  

  async function addRestaurant() {
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    let Title = inpTitle?.current?.value;
    let Category = inpCategory?.current?.value;
    let Cuisine = inpCuisine?.current?.value;
    let DeliveryPrice = inpDeliveryPrice?.current?.value;
    let DeliveryMin = inpDeliveryMin?.current?.value;
    let Adress = inpAdress?.current?.value;


    

    if (Title.length <= 1 || Category?.length<=3 || Cuisine?.length <=3 || Adress?.length <= 3)
      {
      setTitleStroge('Title must be longer than 3 characters');
      setCategoryStroge('Cuisine must be longer than 3 characters');
      setCuisineStroge('Cuisine must be longer than 3 characters');
      setAdressStroge('Not the correct Address Format!');
      return;
    }else {
      setTitleStroge('');
      setCategoryStroge('');
      setCuisineStroge('');
      setDeliveryPriceStroge('');
      setDeliveryMinStroge('');
      setAdressStroge('');
    }

   
    if(!addressRegex.test(Adress)){
      setAdressStroge('Not the correct Address Format!');
      return;
    }
  

    let newRestaurant = {
      name: Title,
      img_url: '',
      category_id: Category,
      cuisine: Cuisine,
      address: Adress,
      delivery_min: DeliveryMin,
      delivery_price: DeliveryPrice
    };

    try {
      dispatch({ type: 'SET_IS_ADD', payload: true });
      let res = await uploadFile({
        file: Img,
        collectionId: "restuarants",
        documentId: "restuarants",
      });
      
      newRestaurant.img_url = res;
      console.log("newRestaurant", newRestaurant);
      
      dispatch({ type: 'SET_RESTAURANT_DATA', payload: [...state.restaurantData, { ...newRestaurant, id: Date.now() }] });

      let createdRestaurant = await PostRestaurant(newRestaurant);
      console.log("createdRestaurant", createdRestaurant);
      
      dispatch({
        type: 'SET_RESTAURANT_DATA',
        payload: state.restaurantData.map(restaurant => (restaurant.id === newRestaurant.id ? createdRestaurant.data : restaurant)),
      });
      toast.success("Restaurant successfully added", { position: "top-right" });
      inpTitle.current.value = '';
      onClose();
      setImg('');
    } catch (err) {
      toast.error("An error occurred while adding the restaurant", { position: "top-right" });
      console.log(err);
    }finally{
      dispatch({ type: 'SET_IS_ADD', payload: false });
    }
  }

  async function updateRestaurant() {
    let Title = inpTitle?.current?.value;
    let Category = inpCategory?.current?.value;
    let Cuisine = inpCuisine?.current?.value;
    let DeliveryPrice = inpDeliveryPrice?.current?.value;
    let DeliveryMin = inpDeliveryMin?.current?.value;
    let Adress = inpAdress?.current?.value;


   

    if (Title.length <= 1 || Category?.length<=3 || Cuisine?.length <=3 || DeliveryPrice?.length <=3 || DeliveryMin?.length <= 3 || Adress?.length <= 3 ){
      setTitleStroge('Title must be longer than 3 characters');
      setCategoryStroge('Cuisine must be longer than 3 characters');
      setCuisineStroge('Cuisine must be longer than 3 characters');
      setDeliveryPriceStroge('DeliveryPrice must be longer than 3 characters');
      setDeliveryMinStroge('DeliveryMin must be longer than 3 characters');
      setAdressStroge('Adress must be longer than 3 characters');
      return;
    }else {
      setTitleStroge('');
      setCategoryStroge('');
      setCuisineStroge('');
      setDeliveryPriceStroge('');
      setDeliveryMinStroge('');
      setAdressStroge('');
    }


    if (!Img) {
      console.error('Image is required');
      return;
    }

    let updateRestaurant = {
      id: editID,
      name: Title,
      img_url: editImg,
      category_id: Category,
      cuisine: Cuisine,
      address: "ksdhlhelf",
      delivery_min: 3,
      delivery_price: 2
    };

    try {
      dispatch({ type: 'SET_IS_ADD', payload: true });

      if (Img instanceof File) {
        let res = await uploadFile({
          file: Img,
          collectionId: "restuarants",
          documentId: "restuarants",
        });
        updateRestaurant.img_url = res;
      }

      dispatch({
        type: 'SET_RESTAURANT_DATA',
        payload: state.restaurantData.map(restaurant =>
          restaurant.id === updateRestaurant.id ? { ...restaurant, ...updateRestaurant } : restaurant
        ),
      });
      await EditRestaurant(updateRestaurant);
      toast.success("Restaurant successfully edited", { position: "top-right" });
      inpTitle.current.value = '';
      onClose();
    } catch (err) {
      toast.error("An error occurred while editing the restaurant", { position: "top-right" });
      console.log(err);
    }finally{
      dispatch({ type: 'SET_IS_ADD', payload: false });
    }
  }

  function editRestaurant(name: string, category: string, image: string, id: string, cuisine: string, deliveryPrice: number, deliveryMin: number, adress: string) {
    setTitleValue(name);
    setEditImg(image);
    setImg(image);
    setEditID(id);
    setCategoryValue(category);
    setCuisineValue(cuisine);
    setDeliveryPriceValue(deliveryPrice);
    setDeliveryMinValue(deliveryMin);
    setAdressValue(adress);
    onOpen();
  }

  async function RestaurantDelete(id: string) {
    try {
      dispatch({ type: 'SET_IS_DELETING', payload: true });
      await instanceAxios.delete(`/restuarants/${id}`);
      dispatch({ type: 'DELETE_RESTAURANT', payload: id });
      toast.success("Restaurant successfully deleted", { position: "top-right" });
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while deleting the restaurant", { position: "top-right" });
    } finally {
      dispatch({ type: 'SET_IS_DELETING', payload: false });
    }
  }


  const handleDeleteClick = (id: string) => {
    dispatch({ type: 'SHOW_MODAL', payload: id });
  };

  const handleCancelClick = () => {
    dispatch({ type: 'HIDE_MODAL' });
  };

  const handleConfirmDelete = async () => {
    if (state.deleteId) {
      await RestaurantDelete(state.deleteId);
      dispatch({ type: 'HIDE_MODAL' });
    }
  };

  const handleAllCategoryClick = () => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: '' });
  };

  const handleCategoryClick = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };


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
  };

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

          <button className="bg-custompurple text-white py-2 px-4 rounded-xl" onClick={onOpen}>
            + ADD RESTAURANT
          </button>
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
                <button className="absolute top-2 right-2" onClick={() => editRestaurant(restaurant.name, restaurant.category, restaurant.img_url, restaurant.id)}>
                  <Image  src={TrashIcon} alt="Edit" width={20} height={0} />
                </button>
                <button className="absolute bottom-2 right-2" onClick={() => handleDeleteClick(restaurant.id)}>
                  <Image src={CardPencil} alt="Delete" width={25} height={0} />
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
                className="border ml-5 border-x-8 border-y-8 bg-mainRed border-black shadow-md text-gray-900 w-20 h-8"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}




      <Form
        isOpen={isOpen}
        title={editImg ? 'Edit Restaurant' : 'Add Restaurant'}
        subtitle={`${editImg ? 'Edit' : 'Add'} your Restaurant Name`}
        onClose={() => {
          onClose();
          setEditImg('');
          setTitleValue('');
        }}
        
        onAction={editImg ? updateRestaurant : addRestaurant}
        btnTitle={editImg ? "Edit Restaurant" : "Create Restaurant"}
        IMG={editImg}
        setIMG={setImg}
      >

        
        <Input hasLabel={true} title={'Name'} type={'text'} input_name={'restaurant_title'} Ref={inpTitle} value={TitleValue} />
        <div className=" text-mainRed font-bold">{TitleStroge}</div>
        <Input hasLabel={true} title={'Category'} type={'text'} input_name={'restaurant_category'} Ref={inpCategory} value={CategoryValue} />
        <div className="text-mainRed font-bold">{CategoryStroge}</div>
        <Input hasLabel={true} title={'Cuisine'} type={'text'} input_name={'restaurant_cuisine'} Ref={inpCuisine} value={CuisineValue} />
        <div className="text-mainRed font-bold">{CuisineStroge}</div>
        <Input hasLabel={true} title={'Delivery Price $'} type={'number'} input_name={'restaurant_delivery_price '} Ref={inpDeliveryPrice} value={DeliveryPriceValue} />
        <div className="text-mainRed font-bold">{DeliveryPriceStroge}</div>
        <Input hasLabel={true} title={'Delivery Min '} type={'number'} input_name={'restaurant_delivery_min'} Ref={inpDeliveryMin} value={DeliveryMinValue} />
        <div className="text-mainRed font-bold">{DeliveryMinStroge}</div>
        <Input hasLabel={true} title={'Delivery Adress '} type={'text'} input_name={'restaurant_adress'} Ref={inpAdress} value={AdressValue} />
        <div className="text-mainRed font-bold">{AdressStroge}</div>
        


      </Form>




    </div>
  );
}

export default AdminRestaurant;
