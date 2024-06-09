import dynamic from "next/dynamic";
import AdminCard from "../../../shared/components/admin/adminCard";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import React, { useEffect, useRef, useState } from "react";
import axios, {AxiosResponse} from "axios";
import { useModalOpen } from "../../../shared/hooks/UseModalOpen";
import Form from "../../../shared/components/admin/Form/Form";
import Input from "../../../shared/components/admin/Form/Input";
import CustomButton from "../../../shared/components/admin/Button";
import Modal from "../../../shared/components/admin/Modal";
import { DeleteProduct, EditProduct, PostProduct, GetProducts, getRestaurants } from "../../../shared/services";
import { toast } from "react-toastify";
import uploadFile from "../../../shared/utils/uploadFile";
import {PostDataType, ProductPostDataType, RestaurantPostDataType} from "../../../shared/interfaces";
import Select from "../../../shared/components/admin/Form/Select";
import withAuth from "../../../shared/HOC/withAuth";
import Loading from "../../../shared/components/Loading/Loading";
import { useToast } from "@chakra-ui/react";
import { sortDataByCreated } from "../../../shared/utils/sortData";
import ConfirmModal from '../../../shared/components/admin/confirmModal'

const AdminLayout = dynamic(
  () => import("../../../shared/components/admin/Layout/AdminLayout"),
  {
    ssr: false,
  }
);

interface  IProduct{
  id:string,
  name?:string,
  description?:string,
  price?:number,
  rest_id?:string | undefined,
  img_url?:AxiosResponse<string|null>
}


function Products() {
  const inpTitle = useRef<any>()
  const inpDesc = useRef<any>()
  const inpPrice = useRef<any>()
  const { isOpen, onOpen, onClose } = useModalOpen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const [products, setProducts] = useState<IProduct[]>([]);

// Type for setProducts
  type SetProductsType = React.Dispatch<React.SetStateAction<IProduct[]>>;

// You can now use SetProductsType wherever you need to refer to the type of setProducts
  const updateProducts: SetProductsType = (newProducts) => {
    setProducts(newProducts);
  };
  // let [products, setProducts] = useState<PostDataType[] >([]);
  let [Img, setImg] = useState<any>('')
  let [editImg, seteditImg] = useState<any>('')
  let [editID, seteditID] = useState<any>('')
  let [TitleYup, setTitleYup] = useState('')
  let [Titlevalue, setTitlevalue] = useState('')
 
  let [DescValue, setDescValue] = useState('');
  let [PriceYup, setPriceYup] = useState('');
  let [PriceValue, setPriceValue] = useState('');
  let [ResetData, setResetData] = useState(true)
  let [restaurants, setRestaurants] = useState<RestaurantPostDataType[]>([])
  let [restaurantID, setRestaurantId] = useState<string>()
  const [filteredProducts,setFilteredProducts]=useState<any>()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const toast = useToast()
  useEffect(() => {
    const fetchData = async () =>{
      try {
        let res = await GetProducts()
        let restaurants = await getRestaurants()
        let newData:any = await res?.data.result.data ;
         let sortData:any = sortDataByCreated(newData)
        setProducts(sortData)
        setFilteredProducts(sortData)
        let new_res = await restaurants?.data.result.data
        setRestaurants(new_res)
      } catch (err) {
        console.log(err);
      }
    }
    if (products.length === 0) {
      fetchData();
    }
  }, [])

  function getRestaurantById(e:any) {
    setRestaurantId(e.currentTarget.value)
  }
  const  getRestaurantFilter =(e:any)=> {
    let id = e.currentTarget.value
    let filtered_products = products?.filter((product:IProduct)=>{
      return product.rest_id === id
    })
    setFilteredProducts(filtered_products)

  }
  // async function addProduct() {
  //   let Title = inpTitle?.current?.value as string;
  //   let Desc = inpDesc?.current?.value as string;
  //   let Price = inpPrice?.current?.value as number;
  //
  //   Title?.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('')
  //   let newProduct:IProduct = {
  //     name: Title,
  //     description: Desc,
  //     price: Price,
  //     rest_id: restaurantID,
  //   }
  //   try {
  //     let res = await uploadFile({
  //       file: Img,
  //       collectionId: "products",
  //       documentId: "products"
  //     }) as AxiosResponse<string|null>;
  //     newProduct.img_url = res;
  //
  //     // setProducts(prevProducts => [...prevProducts, { ...newProduct, id: Date.now() }]);
  //     updateProducts(prevProducts => [...prevProducts, { ...newProduct}])
  //     let createdProduct = await PostProduct(newProduct);
  //
  //     toast.success("Product successfully added", {
  //       position: "top-right",
  //     });
  //     inpTitle?.current?.value == ''
  //     inpDesc?.current?.value == ''
  //     inpPrice?.current?.value == ''
  //
  //     onClose()
  //     setImg('')
  //   } catch (err) {
  //     toast.error("An error occurred while adding the product", {
  //       position: "top-right",
  //     });
  //     console.log(err);
  //   }
  //
  // }

  async function updateProduct() {
    let Title = inpTitle?.current?.value
    let Desc = inpDesc?.current?.value
    let Price = inpPrice?.current?.value

    Title?.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('')
   
    if (Title.length <= 3) {
      setTitleYup('title have to be longer than 3 ');
      return;
    } else {
      setTitleYup('');
    }
    if (!Img || Img.length === 0) {
      console.error('Image is required');
      return;
    }
    let updatedProduct:ProductPostDataType = {
      id: editID,
      name: Title,
      img_url: editImg,
      rest_id: restaurantID,
      price: Price,
      description: Desc,
    };
    try {
      if (Img instanceof File) {
        let res = await uploadFile({
          file: Img,
          collectionId: "products",
          documentId: "products"
        }) as AxiosResponse<string|null>;
        updatedProduct.img_url = res;
      }
      setProducts(prevProducts => prevProducts.map(product =>
        product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
      ));

      updateProducts(prevProducts => [...prevProducts, { ...updatedProduct,id: updatedProduct.id}])
      await EditProduct(updatedProduct)
      toast({
        title: `Product successfully edited`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top-right',
        variant:'subtle'
    })
      inpTitle.current.value = '';
      onClose();
    } catch (err) {
      toast({
        title: `An error occurred while editing the product: ${err}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:'top-right',
        variant:'subtle'
    })
      console.log(err);
    }

  }

  async function removeProduct(id: string | number) {
    try {
      await DeleteProduct(id)
      toast({
        title: `Product successfully deleted`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top-right',
        variant:'subtle'
    })
      setResetData(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  }


  function confirmDeleteProduct(id: string) {
    setProductToDelete(id);
    setIsConfirmModalOpen(true);
}
function handleConfirmDelete() {
    if (productToDelete) {
      removeProduct(productToDelete);
    }
    setIsConfirmModalOpen(false);
    setProductToDelete(null);
}
  function editProduct(name: string, description: string, image: string, price: string, rest_id: string | undefined, id: string) {
    setDescValue(description)
    setPriceValue(price)
    setTitlevalue(name)
    setRestaurantId(rest_id)
    seteditImg(image)
    setImg([image])
    seteditID(id)
    onOpen()
  }
  if(products==undefined){
    return(<Loading/>)
}

  return (
    <>
      <AdminLayout>
        <main className="flex">
          <section className="w-full">
            <div className="m-0 sm:m-5">
              <AdminHedetbuttom
                  haveSelect={true}
                  onSelect ={getRestaurantFilter}
                  selectOption={restaurants}
                Title={'Products '}
              />
            </div>

            <div className="w-full sm:w-auto lg:m-5 flex flex-wrap  lg:justify-start justify-center">

              {/* {data?.map((item:any,i:number)=>{ */}
              <AdminCard data={filteredProducts} edit={editProduct}
                removeDocument={confirmDeleteProduct}
                reset={() => setResetData(prev => !prev)}

              />
            </div>
          </section>
          <Form
            isOpen={isOpen}

            title={editImg ? 'Edit Product' : 'Add Product'}
            subtitle={`${editImg ? 'Edit' : 'Add'} 
          your Product description and necessary information `}
            onClose={() => {
              onClose()
              seteditImg('')
              setTitlevalue('')
            }}

            onAction={updateProduct}
            btnTitle={editImg ? "Edit product" : "Create product"}
            IMG={editImg}
            setIMG={setImg}
          >
            <Input hasLabel={true} title={"Name"} type={"text"} input_name={"name"} Ref={inpTitle}
              value={Titlevalue} />
            <div className="text-mainRed">{TitleYup}</div>
            <Input hasLabel={true} title={"Description"} type={"text"} input_name={"Description"} Ref={inpDesc}
              value={DescValue} />
           
            <Input hasLabel={true} title={"Price"} type={"number"} input_name={"Price"} Ref={inpPrice}
              value={PriceValue} />
            <div className="text-mainRed">{PriceYup}</div>
            <Select title={"Restaurants"} name={"rest_id"} options={restaurants} onChange={getRestaurantById} />
          </Form>
          <ConfirmModal

                    isOpen={isConfirmModalOpen}
                    onRequestClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
          {/* <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="flex justify-between items-center">
              <p className="mx-auto text-3xl font-medium">
                Are you sure it's deleted?
              </p>
            </div>
            <p className=" text-grayText w-2/3 mx-auto text-center my-5">
              Attention! If you delete this order, it will not come back...
            </p>

            <div
            
              className="mx-auto flex items-center justify-center gap-9"
            >
              <button
                className=" border-grayText text-grayText py-1 px-8"
                onClick={handleModalClose}
               >Cancel
                </button>
              <div>
                <button
                  type={'button'}
                  className="bg-mainRed border-2 text-white py-1 px-8"
                  onClick={handleButtonClick}
                 >Delete
                </button>

                
              </div> */}
            {/* </div>
          </Modal> */}
        </main>
      </AdminLayout>
    </>
  );
}
export default withAuth(Products)

//
// export default function Products(){
//
// }
