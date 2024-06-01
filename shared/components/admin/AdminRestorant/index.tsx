import React, { useEffect, useReducer, useRef, useState } from "react";
import CardPencil from '../../../../public/cardpensil.svg';
import TrashIcon from '../../../../public/trashicon.svg';
import Image from "next/image";
import BtnTypeIcon from '../../../../public/BtnTypeIcon.svg';
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
  editID: string;
  editImg: string;
  titleValue: string;
  titleStroge: string;
  categoryValue: string;
  categoryStroge: string;
  cuisineValue: string;
  cuisineStroge: string;
  deliveryPriceValue: string;
  deliveryPriceStroge: string;
  deliveryMinValue: string;
  deliveryMinStroge: string;
  adressValue: string;
  adressStroge: string;
}

type Action =
  | { type: 'SET_RESTAURANT_DATA'; payload: Restaurant[] }
  | { type: 'TOGGLE_SHOW_CATEGORIES' }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'DELETE_RESTAURANT'; payload: string }
  | { type: 'SET_IS_DELETING'; payload: boolean }
  | { type: 'SET_IS_ADD'; payload: boolean}
  | { type: 'SHOW_MODAL'; payload: string }
  | { type: 'SET_EDIT_ID'; payload: string }
  | { type: 'SET_EDIT_IMG'; payload: string }
  | { type: 'SET_TITLE_VALUE'; payload: string }
  | { type: 'SET_TITLE_STROGE'; payload: string }
  | { type: 'SET_CATEGORY_VALUE'; payload: string }
  | { type: 'SET_CATEGORY_STROGE'; payload: string }
  | { type: 'SET_CUISINE_VALUE'; payload: string }
  | { type: 'SET_CUISINE_STROGE'; payload: string }
  | { type: 'SET_DELIVERY_PRICE_VALUE'; payload: string }
  | { type: 'SET_DELIVERY_PRICE_STROGE'; payload: string }
  | { type: 'SET_DELIVERY_MIN_VALUE'; payload: string }
  | { type: 'SET_DELIVERY_MIN_STROGE'; payload: string }
  | { type: 'SET_ADRESS_VALUE'; payload: string }
  | { type: 'SET_ADRESS_STROGE'; payload: string }
  | { type: 'HIDE_MODAL' };


const initialState: State = {
  restaurantData: [],
  showCategories: false,
  selectedCategory: '',
  isDeleting: false,
  showModal: false,
  deleteId: null,
  isAdd: false,
  editID:'',
  editImg:'',
  titleValue:'',
  titleStroge:'',
  categoryValue:'',
  categoryStroge: '',
  cuisineValue:'',
  cuisineStroge: '',
  deliveryPriceValue: '',
  deliveryPriceStroge:'',
  deliveryMinValue:'',
  deliveryMinStroge:'',
  adressValue:'',
  adressStroge:'',
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
    case "SET_EDIT_ID":
        return { ...state, editID: action.payload };
    case "SET_EDIT_IMG":
        return { ...state, editImg: action.payload };
    case "SET_TITLE_VALUE":
        return { ...state, titleValue: action.payload };
    case "SET_TITLE_STROGE":
        return { ...state, titleStroge: action.payload };
    case "SET_CATEGORY_VALUE":
        return { ...state, categoryValue: action.payload };
    case "SET_CATEGORY_STROGE":
          return { ...state, categoryStroge: action.payload };
    case "SET_CUISINE_VALUE":
            return { ...state, cuisineValue: action.payload };
    case "SET_CUISINE_STROGE":
        return { ...state, cuisineStroge: action.payload };
    case "SET_DELIVERY_PRICE_VALUE":
        return { ...state, deliveryPriceValue: action.payload };
    case "SET_DELIVERY_PRICE_STROGE":
        return { ...state, deliveryPriceStroge: action.payload };
        case "SET_DELIVERY_MIN_VALUE":
      return { ...state, deliveryMinValue: action.payload };
      case "SET_DELIVERY_MIN_STROGE":
      return { ...state, deliveryMinStroge: action.payload };
      case "SET_ADRESS_VALUE":
        return { ...state, adressValue: action.payload };
        case "SET_ADRESS_STROGE":
      return { ...state, adressStroge: action.payload };
    default:
      return state;
  }
}

function AdminRestaurant() {
  const [state, dispatch] = useReducer(reducer, initialState);


  const { isOpen, onOpen, onClose } = useModalOpen();
  const [Img, setImg] = useState<string | File>('');


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
        console.log(newData);
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
      dispatch({ type: 'SET_TITLE_STROGE', payload: 'Title must be longer than 3 characters' });
      dispatch({ type: 'SET_CATEGORY_STROGE', payload: 'Cuisine must be longer than 3 characters' });
      dispatch({ type: 'SET_CUISINE_STROGE', payload: 'Cuisine must be longer than 3 characters' });
      dispatch({ type: 'SET_ADRESS_STROGE', payload: 'Not the correct Address Format!' });
      return;
    }else {
      dispatch({ type: 'SET_TITLE_STROGE', payload: '' });
      dispatch({ type: 'SET_CATEGORY_STROGE', payload: '' });
      dispatch({ type: 'SET_CUISINE_STROGE', payload: '' });
      dispatch({ type: 'SET_DELIVERY_PRICE_STROGE', payload: '' });
      dispatch({ type: 'SET_DELIVERY_MIN_STROGE', payload: '' });
      dispatch({ type: 'SET_ADRESS_STROGE', payload: '' });
    }

   
    if(!addressRegex.test(Adress)){
      dispatch({ type: 'SET_ADRESS_STROGE', payload: 'Not the correct Address Format!' });
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
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    let Title = inpTitle?.current?.value;
    let Category = inpCategory?.current?.value;
    let Cuisine = inpCuisine?.current?.value;
    let DeliveryPrice = inpDeliveryPrice?.current?.value;
    let DeliveryMin = inpDeliveryMin?.current?.value;
    let Adress = inpAdress?.current?.value;


   

    if (Title.length <= 1 || Category?.length<=3 || Cuisine?.length <=3 || Adress?.length <= 3)
      {
      dispatch({ type: 'SET_TITLE_STROGE', payload: 'Title must be longer than 3 characters' });
      dispatch({ type: 'SET_CATEGORY_STROGE', payload: 'Cuisine must be longer than 3 characters' });
      dispatch({ type: 'SET_CUISINE_STROGE', payload: 'Cuisine must be longer than 3 characters' });
      dispatch({ type: 'SET_ADRESS_STROGE', payload: 'Not the correct Address Format!' });
      return;
    }else {
      dispatch({ type: 'SET_TITLE_STROGE', payload: '' });
      dispatch({ type: 'SET_CATEGORY_STROGE', payload: '' });
      dispatch({ type: 'SET_CUISINE_STROGE', payload: '' });
      dispatch({ type: 'SET_DELIVERY_PRICE_STROGE', payload: '' });
      dispatch({ type: 'SET_DELIVERY_MIN_STROGE', payload: '' });
      dispatch({ type: 'SET_ADRESS_STROGE', payload: '' });
    }

  
    if(!addressRegex.test(Adress)){
      dispatch({ type: 'SET_ADRESS_STROGE', payload: 'Not the correct Address Format!' });
      return;
    }
  
    if (!Img) {
      console.error('Image is required');
      return;
    }

    let updateRestaurant = {
      id: state.editID,
      name: Title,
      img_url: state.editImg,
      category_id: Category,
      cuisine: Cuisine,
      address: Adress,
      delivery_min: DeliveryMin,
      delivery_price: DeliveryPrice
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
    dispatch({ type: 'SET_TITLE_VALUE', payload: name });
    dispatch({ type: 'SET_EDIT_IMG', payload: image });
    setImg(image);
   dispatch({ type: 'SET_EDIT_ID', payload: id });
    dispatch({ type: 'SET_CATEGORY_VALUE', payload: category });
    dispatch({ type: 'SET_CUISINE_VALUE', payload: cuisine });
    dispatch({ type: 'SET_DELIVERY_PRICE_VALUE', payload: deliveryPrice});
    dispatch({ type: 'SET_DELIVERY_MIN_VALUE', payload: deliveryMin });
    dispatch({ type: 'SET_ADRESS_VALUE', payload: adress });
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
        title={state.editImg ? 'Edit Restaurant' : 'Add Restaurant'}
        subtitle={`${state.editImg ? 'Edit' : 'Add'} your Restaurant Name`}
        onClose={() => {
          onClose();
          dispatch({ type: 'SET_EDIT_IMG', payload: '' });
          dispatch({ type: 'SET_TITLE_VALUE', payload: '' });
        }}
        
        onAction={state.editImg ? updateRestaurant : addRestaurant}
        btnTitle={state.editImg ? "Edit Restaurant" : "Create Restaurant"}
        IMG={state.editImg}
        setIMG={setImg}
      >

        
        <Input hasLabel={true} title={'Name'} type={'text'} input_name={'restaurant_title'} Ref={inpTitle} value={state.titleValue} />
        <div className=" text-mainRed font-bold">{state.titleStroge}</div>
        <Input hasLabel={true} title={'Category'} type={'text'} input_name={'restaurant_category'} Ref={inpCategory} value={state.categoryValue} />
        <div className="text-mainRed font-bold">{state.categoryStroge}</div>
        <Input hasLabel={true} title={'Cuisine'} type={'text'} input_name={'restaurant_cuisine'} Ref={inpCuisine} value={state.cuisineValue} />
        <div className="text-mainRed font-bold">{state.cuisineStroge}</div>
        <Input hasLabel={true} title={'Delivery Price $'} type={'number'} input_name={'restaurant_delivery_price '} Ref={inpDeliveryPrice} value={state.deliveryPriceValue} />
        <div className="text-mainRed font-bold">{state.deliveryPriceStroge}</div>
        <Input hasLabel={true} title={'Delivery Min '} type={'number'} input_name={'restaurant_delivery_min'} Ref={inpDeliveryMin} value={state.deliveryMinValue} />
        <div className="text-mainRed font-bold">{state.deliveryMinStroge}</div>
        <Input hasLabel={true} title={'Delivery Adress '} type={'text'} input_name={'restaurant_adress'} Ref={inpAdress} value={state.adressValue} />
        <div className="text-mainRed font-bold">{state.adressStroge}</div>
        


      </Form>




    </div>
  );
}

export default AdminRestaurant;
