import dynamic from "next/dynamic";
import AdminCard from "../../../shared/components/admin/adminCard";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useModalOpen } from "../../../shared/hooks/UseModalOpen";
import Form from "../../../shared/components/admin/Form/Form";
import Input from "../../../shared/components/admin/Form/Input";
import {GetProducts, getRestaurants } from "../../../shared/services";
import uploadFile from "../../../shared/utils/uploadFile";
import {ProductPostDataType, RestaurantPostDataType } from "../../../shared/interfaces";
import Select from "../../../shared/components/admin/Form/Select";
import withAuth from "../../../shared/HOC/withAuth";
import Loading from "../../../shared/components/Loading/Loading";
import { useToast } from "@chakra-ui/react";
import { sortDataByCreated } from "../../../shared/utils/sortData";
import ConfirmModal from '../../../shared/components/admin/confirmModal'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import {useTranslation} from "next-i18next";

import {
  useDeleteProductMutation, useEditProductMutation,
  useGetProductsQuery
} from "../../../shared/redux/api/products/productsApi";

const AdminLayout = dynamic(
  () => import("../../../shared/components/admin/Layout/AdminLayout"),
  {
    ssr: false,
  }
);

interface IProduct {
  id: string,
  name?: string,
  description?: string,
  price?: number,
  rest_id?: string | undefined,
  img_url?: AxiosResponse<string | null>
}


function Products() {
  const inpTitle = useRef<any>()
  const inpDesc = useRef<any>()
  const inpPrice = useRef<any>()
  const { isOpen, onOpen, onClose } = useModalOpen();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading2, setIsLoading] = useState(false);
  let [Img, setImg] = useState<any>('')
  let [editImg, seteditImg] = useState<any>('')
  let [editID, seteditID] = useState<any>('')
  let [TitleYup, setTitleYup] = useState('')
  let [Titlevalue, setTitlevalue] = useState('')
  const {t} = useTranslation("common")
  let [DescValue, setDescValue] = useState('');
  let [PriceYup, setPriceYup] = useState('');
  let [PriceValue, setPriceValue] = useState('');
  let [ResetData, setResetData] = useState(true)
  let [restaurants, setRestaurants] = useState<RestaurantPostDataType[]>([])
  let [restaurantID, setRestaurantId] = useState<string>()
  const [filteredProducts, setFilteredProducts] = useState<any>()
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const toast = useToast()


  const {data,isLoading,isError} = useGetProductsQuery({},{
  });

  useEffect(()=>{
    setFilteredProducts(sortDataByCreated<ProductPostDataType>(data));
  },[data])

  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductApi] = useEditProductMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await GetProducts()
        let restaurants = await getRestaurants()
        let newData: any = await res?.data.result.data;
        let sortData: any = sortDataByCreated(newData)
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

  function getRestaurantById(e: any) {
    setRestaurantId(e.currentTarget.value)
  }
  const getRestaurantFilter = (e: any) => {
    let id = e.currentTarget.value
    let filtered_products = products;
    if(id) {
      filtered_products = products?.filter((product: IProduct) => {
        return product.rest_id === id
      })
    }
    setFilteredProducts(filtered_products)
  }
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
    setIsLoading(true);
    let updatedProduct: ProductPostDataType = {
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
        }) as string | null;
        updatedProduct.img_url = res;
      }
      // setProducts(prevProducts => prevProducts.map(product =>
      //   product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
      // ));

      // await EditProduct(updatedProduct)
      await updateProductApi(updatedProduct)
      toast({
        title: `Product successfully edited`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle'
      })
      inpTitle.current.value = '';
      onClose();
    } catch (err) {
      toast({
        title: `An error occurred while editing the product: ${err}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle'
      })
      console.log(err);
    } finally {
      setIsLoading(false);
    }

  }

  async function removeProduct(id: string | number) {
    try {
      // await DeleteProduct(id)
      await deleteProduct(id)
      toast({
        title: `Product successfully deleted`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        variant: 'subtle'
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
  if (products == undefined) {
    return (<Loading />)
  }

  return (
    <>
      <AdminLayout>
        <main className="flex">
          <section className="w-full">
            <div>
              <AdminHedetbuttom
                haveSelect={true}
                onSelect={getRestaurantFilter}
                selectOption={restaurants}
                Title={t("Products")}
              />
            </div>

            <div className="w-full sm:w-auto lg:m-5 flex flex-wrap  justify-center ">

              {/* {data?.map((item:any,i:number)=>{ */}
              <AdminCard data={filteredProducts} edit={editProduct}
                removeDocument={confirmDeleteProduct}
                reset={() => setResetData(prev => !prev)}

              />
            </div>
          </section>
          <Form
            isOpen={isOpen}
            loading={isLoading}
            title={editImg ? `${t("Edit Product")}` : `${t('Add Product')}`}
            subtitle={`${t( "Edit your Product description and necessary information")}`}
            onClose={() => {
              onClose()
              seteditImg('')
              setTitlevalue('')
            }}

            onAction={updateProduct}
            btnTitle={editImg ? `${t("Edit Product")}` : `${t("create product")}`}
            IMG={editImg}
            setIMG={setImg}
          >
            <Input hasLabel={true} title={t("Name")} type={"text"} input_name={"name"} Ref={inpTitle}
              value={Titlevalue} />
            <div className="text-mainRed">{TitleYup}</div>
            <Input hasLabel={true} title={t("Description")} type={"text"} input_name={"Description"} Ref={inpDesc}
              value={DescValue} />

            <Input hasLabel={true} title={t("Price")} type={"number"} input_name={"Price"} Ref={inpPrice}
              value={PriceValue} />
            <div className="text-mainRed">{PriceYup}</div>
            <Select title={t("Restaurants")} name={"rest_id"} options={restaurants} onChange={getRestaurantById} />
          </Form>
          <ConfirmModal

            isOpen={isConfirmModalOpen}
            onRequestClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
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
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});