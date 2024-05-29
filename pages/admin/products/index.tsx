


import dynamic from "next/dynamic";
import AdminCard from "../../../shared/components/admin/adminCard";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useModalOpen} from "../../../shared/hooks/UseModalOpen";
import Form from "../../../shared/components/admin/Form/Form";
import Input from "../../../shared/components/admin/Form/Input";
import CustomButton from "../../../shared/components/admin/Button";
import Modal from "../../../shared/components/admin/Modal";
import { DeleteProduct, EditProduct, PostProduct, getProducts } from "../../../shared/services";
import { toast } from "react-toastify";
import uploadFile from "../../../shared/utils/uploadFile";
import { ProductPostDataType } from "../../../shared/interfaces";


const AdminLayout = dynamic(
  () => import("../../../shared/components/admin/Layout/AdminLayout"),
  {
    ssr: false,
  }
);



export default function Products() {
  const inpTitle = useRef<any>()
  const { isOpen, onOpen, onClose } = useModalOpen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  let [products, setProducts] = useState<ProductPostDataType[]>([]);
  let [Img, setImg] = useState<any>('')
  let [editImg, seteditImg] = useState<any>('')
  let [editID, seteditID] = useState<any>('')
  let [TitleYup, setTitleYup] = useState('')
  let [Titlevalue, setTitlevalue] = useState('')
  let [ResetData, setResetData] = useState(true)
  


    useEffect(()=>{
      (async()=>{
          try{
              let res= await getProducts()
              let newData= await res.data.result.data
              setProducts(newData)
          }catch(err){console.log(err);}
      })()
  },[ResetData])

  async function addProduct() {
    let Title = inpTitle?.current?.value
    

    Title?.length<=3?setTitleYup('title have to be longer than 3 '):setTitleYup('')
 
    let newProduct = {
      "name": Title,
      "img_url": ''
    }
    try {
      let res= await uploadFile({
        file:Img,
        collectionId:"products",
        documentId:"products"
    }) as  string
    newProduct.img_url = res;
    setProducts(prevProducts => [...prevProducts, { ...newProduct, id: Date.now() }]);
    let createdProduct = await PostProduct(newProduct);
    setProducts(prevCategories => prevCategories.map(product =>
                product.name === newProduct.name ? createdProduct.data : product
            ));
            toast.success("Product successfully added", {
                position: "top-right",
            });
            inpTitle?.current?.value==''
            onClose()
            setImg('')
        }catch(err){
            toast.error("An error occurred while adding the product", {
                position: "top-right",
            });
            console.log(err);
        }

    }
    
  async function updateProduct() {
    let Title = inpTitle?.current?.value
    if( Title.length<=3){
setTitleYup('title have to be longer than 3 ');
      return;
    } else {
      setTitleYup('');
  }
  if (!Img || Img.length === 0) {
    console.error('Image is required');
    return;
}
let updatedProduct = {
  id: editID,
  name: Title,
  img_url: editImg
};
try{
  if (Img instanceof File) {
      let res = await uploadFile({
          file: Img,
          collectionId: "products",
          documentId: "products"
      }) as string;
      updatedProduct.img_url = res;
  }
  setProducts(prevProducts => prevProducts.map(product =>
    product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
));
await EditProduct(updatedProduct)
toast.success("Product successfully edited", {
    position: "top-right",
});
inpTitle.current.value = '';
onClose();
}catch(err){
toast.error("An error occurred while adding the product", {
    position: "top-right",
});
console.log(err);
}

}
 

  async function removeProduct(id: string | number){
    try{
        await DeleteProduct(id)
        toast.success("Product successfully deleted", {
            position: "top-right",
        });
        setResetData(prev => !prev);
    }catch(err){
        console.log(err);
    }
}

  function editProduct(name: string, description: string, image: string, id: string) {
  
    setTitlevalue(name)
    seteditImg(image)
    setImg([image])
    seteditID(id)

    onOpen()
  }

  return (
    <>
      <AdminLayout>
        <main className="flex">
          <section className="w-full">
            <div className="m-0 sm:m-5">
              <AdminHedetbuttom
                Title={'Products '}
              />
            </div>

            <div className="w-full sm:w-auto m-5 flex flex-wrap  justify-start">

            {/* {data?.map((item:any,i:number)=>{ */}
                <AdminCard data={products} edit={editProduct}
                 removeDocument={removeProduct}
                reset={()=>setResetData(prev=>!prev)}

                 />
           
              

            </div>
             
          </section>
          <Form
              isOpen={isOpen}

              title={editImg ? 'Edit Product' : 'Add Product'}
              subtitle={`${editImg? 'Edit' : 'Add'} 
          your Product description and necessary information `}
              onClose={()=>{
                onClose()
                seteditImg('')
                setTitlevalue('')
              }}

              onAction={editImg? updateProduct: addProduct}
              btnTitle={editImg ? "Edit product" : "Create product"}
              IMG={editImg}
              setIMG={setImg}

          >
            <Input hasLabel={true} title={"Name"} type={"text"} input_name={"name"} Ref={inpTitle} value={Titlevalue} />
            <div className=" text-red-600">{TitleYup}</div>
         


          </Form>

          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="flex justify-between items-center">
              <p className="mx-auto text-3xl font-medium">
                Are you sure it's deleted?
              </p>
            </div>

            <p className=" text-grayText w-2/3 mx-auto text-center my-5">
              Attention! If you delete this order, it will not come back...
            </p>

            <div
                onClick={handleModalClose}
                className="mx-auto flex items-center justify-center gap-9"
            >
              <CustomButton
                  className=" border-grayText text-grayText py-1 px-8"
                  innerText="Cancel"
              />
              <div onClick={handleModalClose}>
                <CustomButton
                    type={'button'}
                    className="bg-mainRed border-2 text-white py-1 px-8"
                    innerText="Delete"
                    color={"1"}
                />
              </div>
            </div>
          </Modal>
        </main>
      </AdminLayout>
    </>
  );
}
//
// export default function Products(){
//
// }
