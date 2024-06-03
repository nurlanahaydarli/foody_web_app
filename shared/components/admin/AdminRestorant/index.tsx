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
import { EditRestaurant, PostRestaurant, getRestaurants, getCategories } from "../../../services";
import { instanceAxios } from "../../../helpers/instanceAxios";
import { CategoryPostDataType} from '../../../interfaces/index'
import Select from "../Form/Select";

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

 
  const { isOpen, onOpen, onClose } = useModalOpen();
  const [Img, setImg] = useState<any>('');
 

  const [editID, setEditID] = useState('');
  const [editImg, setEditImg] = useState<any>('');

  const [TitleValue, setTitleValue] = useState('');
  const [TitleStroge, setTitleStroge] = useState('');


  const [CuisineValue, setCuisineValue] = useState('');
  const [CuisineStroge, setCuisineStroge] = useState('');

  const [DeliveryPriceValue,setDeliveryPriceValue ] = useState('');
  const [DeliveryPriceStroge, setDeliveryPriceStroge] = useState('');

  const [DeliveryMinValue, setDeliveryMinValue] = useState('');
  const [DeliveryMinStroge, setDeliveryMinStroge] = useState('');

  const [AdressValue, setAdressValue] = useState('');
  const [AdressStroge, setAdressStroge] = useState('');

  let [categorys, setCategorys] = useState<CategoryPostDataType[]>([]);
  let [categorysID, setcategorysID] = useState();
  const [selectedCategoryName, setSelectedCategoryName] = useState('');


  const inpTitle = useRef<any>();
  const inpCategory = useRef<any>();
  const inpCuisine = useRef<any>();
  const inpDeliveryPrice = useRef<any>();
  const inpDeliveryMin = useRef<any>();
  const inpAdress = useRef<any>();



  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        let res = await getRestaurants();
        let categorysApi = await getCategories();

      
        
        let newData:any = res.data.result.data;
        dispatch({ type: 'SET_RESTAURANT_DATA', payload: newData });

        setCategorys(categorysApi?.data.result.data)

      } catch (err) {
        console.log(err);
      }
    };
    fetchRestaurants();
  }, [state.isDeleting, state.isAdd]);



  function getCategoryById(e: any) {
    const selectedCategory = categorys.find(category => category.id === e.currentTarget.value);
    if (selectedCategory) {
        setcategorysID(selectedCategory.id);
        setSelectedCategoryName(selectedCategory.name);
    }
}



  async function addRestaurant() {
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
  
    let Title = inpTitle?.current?.value;
    let Cuisine = inpCuisine?.current?.value;
    let DeliveryPrice = inpDeliveryPrice?.current?.value;
    let DeliveryMin = inpDeliveryMin?.current?.value;
    let Adress = inpAdress?.current?.value;
  
    if (Title.length <= 1 || Cuisine?.length <= 1 || Adress?.length <= 3 || DeliveryPrice?.length <= 0 || DeliveryMin?.length <= 0) {
      setTitleStroge('Title must be longer than 3 characters');
     
      setCuisineStroge('Cuisine must be longer than 3 characters');
      setDeliveryPriceStroge('should be the delivery price!');
      setDeliveryMinStroge('should be the delivery min!');
      setAdressStroge('Not the correct Address Format!');
      return;
    } else {
      setTitleStroge('');
 
      setCuisineStroge('');
        setDeliveryPriceStroge('');
      setDeliveryMinStroge('');
      setAdressStroge('');
    }
  
    if (!addressRegex.test(Adress)) {
      setAdressStroge('Not the correct Address Format!');
      return;
    }
  
    let newRestaurant:any = {
      name: Title,
      img_url: '',
      category_id: categorysID,
      cuisine: Cuisine,
      address: Adress,
      delivery_min: DeliveryMin,
      delivery_price: DeliveryPrice,
    };
  
    try {
      dispatch({ type: 'SET_IS_ADD', payload: true });
      let res = await uploadFile({
        file: Img,
        collectionId: "restuarants",
        documentId: "restuarants",
      });
      newRestaurant.img_url = res;
     
  
      let createdRestaurant = await PostRestaurant(newRestaurant);

  
      dispatch({
        type: 'SET_RESTAURANT_DATA',
        payload: [...state.restaurantData, { ...newRestaurant, id: Date.now() }],
      });
      toast.success("Restaurant successfully added", { position: "top-right" });
      inpTitle.current.value = '';
      onClose();
      setImg('');
    } catch (err) {
      toast.error("An error occurred while adding the restaurant", { position: "top-right" });
      console.log(err);
    } finally {
      dispatch({ type: 'SET_IS_ADD', payload: false });
    }
  }
  

  async function updateRestaurant() {
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;

    let Title = inpTitle.current?.value;
    let Category = inpCategory?.current?.value;
    let Cuisine = inpCuisine?.current?.value;
    let DeliveryPrice = inpDeliveryPrice?.current?.value;
    let DeliveryMin = inpDeliveryMin?.current?.value;
    let Adress = inpAdress?.current?.value;

   

    if (Title?.length <= 1 || Category?.length <=3 || Cuisine?.length <=1 || Adress?.length <= 3 || DeliveryPrice?.length <1 || DeliveryMin?.length <1 ){
      setTitleStroge('Title must be longer than 3 characters');
      
      setCuisineStroge('Cuisine must be longer than 3 characters');
      setDeliveryPriceStroge('should be the delivery price!');
      setDeliveryMinStroge('should be the delivery min!');
      setAdressStroge('Not the correct Address Format!')
      return;
    }else {
      setTitleStroge('');
   
      setCuisineStroge('');
      setDeliveryPriceStroge('');
      setDeliveryMinStroge('');
      setAdressStroge('');
    }



    if(!addressRegex.test(Adress)){
     setAdressStroge('Not the correct Address Format!');
      return;
    }


    if (!Img) {
      console.error('Image is required');
      return;
    }

    let updateRestaurant = {
      id: editID,
      name: Title,
      img_url: editImg,
      category_id: selectedCategoryName,
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

  function editRestaurant(name: string, category: string, image: string, id: string) {
    setTitleValue(name);
    setEditImg(image);
    setImg(image);
    setEditID(id);
    setSelectedCategoryName(category);
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


    return (
      <div className="absolute z-50 mt-60 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
        <ul className="py-1">
          <li
            className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
            onClick={handleAllCategoryClick}
          >
            All Categories
          </li>
          {categorys.map((category) => (
            <li
              className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}>

              {category.name}
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
          .map((restaurant: Restaurant, index: number) => {
            
            return(
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
                <button className="absolute top-2 right-2" onClick={() => editRestaurant(restaurant.name, restaurant.category_id, restaurant.img_url, restaurant.id)}>
                  <Image  src={TrashIcon} alt="Edit" width={20} height={0} />
                </button>
                <button className="absolute bottom-2 right-2" onClick={() => handleDeleteClick(restaurant.id)}>
                  <Image src={CardPencil} alt="Delete" width={25} height={0} />
                </button>
              </div>
            </div>
          )})}
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
        loading={false}
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

        
        <Input onChange={()=>console.log('onChange')} hasLabel={true} title={'Name'} type={'text'} input_name={'restaurant_title'} Ref={inpTitle} value={TitleValue} />
        <div className=" text-mainRed font-bold">{TitleStroge}</div>
     
        <Select value={selectedCategoryName} onChange={getCategoryById} title={"Categorys"} name={"cat_id"} options={categorys}  />

        <Input onChange={()=>console.log('onChange')} hasLabel={true} title={'Cuisine'} type={'text'} input_name={'restaurant_cuisine'} Ref={inpCuisine} value={CuisineValue} />
        <div className="text-mainRed font-bold">{CuisineStroge}</div>
        <Input onChange={()=>console.log('onChange')} hasLabel={true} title={'Delivery Price $'} type={'number'} input_name={'restaurant_delivery_price '} Ref={inpDeliveryPrice} value={DeliveryPriceValue} />
        <div className="text-mainRed font-bold">{DeliveryPriceStroge}</div>
        <Input onChange={()=>console.log('onChange')} hasLabel={true} title={'Delivery Min '} type={'number'} input_name={'restaurant_delivery_min'} Ref={inpDeliveryMin} value={DeliveryMinValue} />
        <div className="text-mainRed font-bold">{DeliveryMinStroge}</div>
        <Input onChange={()=>console.log('onChange')} hasLabel={true} title={'Delivery Adress '} type={'text'} input_name={'restaurant_adress'} Ref={inpAdress} value={AdressValue} />
        <div className="text-mainRed font-bold">{AdressStroge}</div>


      </Form>




    </div>
  );
}

export default AdminRestaurant;
