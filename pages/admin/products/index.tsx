
import dynamic from "next/dynamic";
import AdminCard from "../../../shared/components/admin/adminCard";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useModalOpen } from "../../../shared/hooks/UseModalOpen";
import Form from "../../../shared/components/admin/Form/Form";
import Input from "../../../shared/components/admin/Form/Input";
import CustomButton from "../../../shared/components/admin/Button";
import Modal from "../../../shared/components/admin/Modal";
import { toast } from "react-toastify";
import { AccessPut } from "../../../server/helper/requests";

const AdminLayout = dynamic(
  () => import("../../../shared/components/admin/Layout/AdminLayout"),
  {
    ssr: false,
  }
);

export default function Products() {
  const { isOpen, onOpen, onClose } = useModalOpen();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [Img, setImg] = useState<any>('');
  const [editImg, seteditImg] = useState<any>('');
  const [editID, seteditID] = useState<any>('');
  const [TitleYup, setTitleYup] = useState('');
  const [Titlevalue, setTitlevalue] = useState('');
  const [DescYup, setDescYup] = useState('');
  const [DescValue, setDescValue] = useState('');
  const [PriceYup, setPriceYup] = useState('');
  const [PriceValue, setPriceValue] = useState('');
  const [RestYup, setRestYup] = useState('');
  const [RestValue, setRestValue] = useState('');
  const [ResetData, setResetData] = useState(true);

  const inpTitle = useRef<any>();
  const inpDesc = useRef<any>();
  const inpPrice = useRef<any>();
  const inpRest = useRef<any>();

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  async function postProduct(product: object) {
    try {
      let data = await AccessPut("products", product);
      console.log("data", data);
      setResetData(prev => !prev);
      toast.success("Added successfully", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function addProduct() {
    let Title = inpTitle?.current?.value;
    let Desc = inpDesc?.current?.value;
    let Price = inpPrice?.current?.value;
    let Rest = inpRest?.current?.value;

    Title?.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('');
    Desc?.length <= 3 ? setDescYup('description have to be longer than 3 ') : setDescYup('');
    Rest?.length <= 3 ? setRestYup('restaurant have to be longer than 3 ') : setRestYup('');

    if (Desc?.length <= 3 || Title?.length <= 3) {
      return;
    }

    let new_product = {
      "name": Title,
      "description": Desc,
      "price": Price,
      "rest_id": Rest,
      "img_url": Img[0].data_url
    };

    try {
      await postProduct(new_product);
      inpTitle.current.value = '';
      inpDesc.current.value = '';
      inpPrice.current.value = '';
      inpRest.current.value = '';
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  async function updateProduct() {
    let Title = inpTitle?.current?.value;
    let Desc = inpDesc?.current?.value;
    let Price = inpPrice?.current?.value;
    let Rest = inpRest?.current?.value;

    Title?.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('');
    Desc?.length <= 3 ? setDescYup('description have to be longer than 3 ') : setDescYup('');
    Rest?.length <= 3 ? setRestYup('restaurant have to be longer than 3 ') : setRestYup('');

    if (Desc?.length <= 3 || Title?.length <= 3) {
      return;
    }

    let new_product = {
      "name": Title,
      "description": Desc,
      "price": Price,
      "rest_id": Rest,
      "img_url": Img[0]
    };

    try {
      await postProduct(new_product);
      inpTitle.current.value = '';
      inpDesc.current.value = '';
      inpPrice.current.value = '';
      inpRest.current.value = '';
      onClose();
    } catch (err) {
      console.log(err);
    }
  }

  function editProduct(name: string, description: string, price: string, restaurant: string, image: string, id: string) {
    setRestValue(restaurant);
    setPriceValue(price);
    setDescValue(description);
    setTitlevalue(name);
    seteditImg(image);
    setImg([image]);
    seteditID(id);
    onOpen();
  }

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get('http://localhost:3000/api/products');
        let newData = await res.data.result.data;
        setProducts(newData);
        console.log("newData", newData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [ResetData]);

  return (
    <>
      <AdminLayout>
        <main className="flex">
          <section className="w-full">
            <div className="m-0 sm:m-5">
              <AdminHedetbuttom Title={'Products '} />
            </div>
            <div className="w-full sm:w-auto m-5 flex flex-wrap justify-start">
              <AdminCard data={products} edit={editProduct} reset={() => setResetData(prev => !prev)} />
            </div>
          </section>
          <Form
            isOpen={isOpen}
            title={editImg ? 'Edit Product' : 'Add Product'}
            subtitle={`${editImg ? 'Edit' : 'Add'} your Product description and necessary information `}
            onClose={() => {
              onClose();
              seteditImg('');
              setTitlevalue('');
              setDescValue('');
              setPriceValue('');
              setRestValue('');
            }}
            onAction={editImg ? updateProduct : addProduct}
            btnTitle={editImg ? "Update product" : "Create product"}
            IMG={editImg}
            setIMG={setImg}
          >
            <Input hasLabel={true} title={"Name"} type={"text"} input_name={"product_name"} Ref={inpTitle} value={Titlevalue} />
            <div className="text-red-600">{TitleYup}</div>
            <Input hasLabel={true} title={"Description"} type={"text"} input_name={"product_desc"} Ref={inpDesc} value={DescValue} />
            <div className="text-red-600">{DescYup}</div>
            <Input hasLabel={true} title={"Price"} type={"number"} input_name={"product_price"} Ref={inpPrice} value={PriceValue} />
            <div className="text-red-600">{PriceYup}</div>
            <Input hasLabel={true} title={"Restaurants"} type={"text"} input_name={"product_rest"} Ref={inpRest} value={RestValue} />
            <div className="text-red-600">{RestYup}</div>
          </Form>
          <Modal isOpen={isModalOpen} onClose={handleModalClose}>
            <div className="flex justify-between items-center">
              <p className="mx-auto text-3xl font-medium">Are you sure it's deleted?</p>
            </div>
            <p className="text-grayText w-2/3 mx-auto text-center my-5">Attention! If you delete this order, it will not come back...</p>
            <div onClick={handleModalClose} className="mx-auto flex items-center justify-center gap-9">
              <CustomButton className="border-grayText text-grayText py-1 px-8" innerText="Cancel" />
              <div onClick={handleModalClose}>
                <CustomButton type={'button'} className="bg-mainRed border-2 text-white py-1 px-8" innerText="Delete" color={"1"} />
              </div>
            </div>
          </Modal>
        </main>
      </AdminLayout>
    </>
  );
}
