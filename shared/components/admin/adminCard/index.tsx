import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { useModalOpen } from "../../../hooks/UseModalOpen";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "../Button";
import Form from "../Form/Form";

import Input from "../Form/Input";
import axios from "axios";

interface PROPS {
  data? : any,
  reset? :Function,
  edit? :any,

  // id: string;
  // description: string;
  // price: number;
  // rest_id: number;
  // img_url: string;
  // name: string;
}



function AdminCard(props:PROPS) {
  let {data,reset,edit} =props
  const { isOpen, onOpen, onClose } = useModalOpen();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


 
  let [products, setProducts] = useState([])

  let [Img, setImg] = useState<any>('')
  
  let [editImg, seteditImg] = useState<any>('')
  let [editID, seteditID] = useState<any>('')

  let [TitleYup, setTitleYup] = useState('')
  let [Titlevalue, setTitlevalue] = useState('')

let [DescYup ,setDescYup]=useState('')
let [DescValue ,setDescValue]=useState('')

let [PriceYup ,setPriceYup]=useState('')
let [PriceValue ,setPriceValue]=useState('')

let [RestYup ,setRestYup]=useState('')
let [RestValue ,setRestValue]=useState('')

  let [ResetData, setResetData] = useState(true)

  const inpTitle = useRef<any>()
  const inpDesc = useRef<any>()
  const inpPrice = useRef<any>()
  const inpRest = useRef<any>()

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let res = await axios.get('http://localhost:3000/api/products')
  //       let newData = await res.data.result.data
  //       setProducts(newData)
      
      

  //     } catch (err) { console.log(err); }
  //   })()
  // }, [ResetData])
console.log("data",data);

  async function postProduct(product: object) {
    try {
      axios.post('http://localhost:3000/api/products', product)
        .then(function (response) {
          console.log(response);
          setResetData(prev => !prev)
          // toast.success("Offer added sucsesfuly", {
          //     position:"top-right",
          //   });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }
  async function upProduct(product: object, id: string) {
    console.log(id, product);

    try {
      axios.put(`http://localhost:3000/api/products/${id}`, product)
        .then(function (response) {
          console.log(response);
          setResetData(prev => !prev)
          // toast.success("Offer update sucsesfuly", {
          //     position:"top-right",
          //   });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  }
  async function addProduct() {
    let Title = inpTitle?.current?.value
    let Desc=inpDesc?.current?.value
    let Price=inpPrice?.current?.value
    let Rest=inpRest?.current?.value

    Title.length<=3?setTitleYup('title have to be longer than 3 '):setTitleYup('')
    Desc.length<=3?setDescYup('description have to be longer than 3 '):setDescYup('')
    Rest.length<=3?setRestYup('restauran have to be longer than 3 '):setRestYup('')
    if(Desc.length<=3 || Title.length<=3){
        return
    }
    let new_product = {
      "name": Title,
      "description": Desc,
      "price": Price,  
      "rest_id": Rest,
      "img_url": Img[0].data_url
    }
    try {
      await postProduct(new_product)

      inpTitle?.current?.value == ''
      inpDesc?.current?.value == ''
      inpPrice?.current?.value == ''
      inpRest?.current?.value == ''

      onClose()
    } catch (err) {
      console.log(err);
    }

  }
  async function updateProduct() {
    let Title = inpTitle?.current?.value
    let Desc=inpDesc?.current?.value
    let Price=inpPrice?.current?.value
    let Rest=inpRest?.current?.value

    Title.length <= 3 ?setTitleYup('title have to be longer than 3 ') : setTitleYup('')
    Desc.length<=3?setDescYup('description have to be longer than 3 '):setDescYup('')
    Rest.length<=3?setRestYup('restauran have to be longer than 3 '):setRestYup('')
    if(Desc.length<=3 || Title.length<=3){
      return
  }
  console.log( Img[0]);

    let new_product = {
      "name": Title,
      "description": Desc,
       "price": Price,  
       "rest_id": Rest,
      "img_url": Img[0]
    }
    try {
      await upProduct(new_product, editID)

      inpTitle?.current?.value == ''
      inpDesc?.current?.value == ''
      inpPrice?.current?.value == ''
      inpRest?.current?.value == ''
     

      onClose()
    } catch (err) {
      console.log(err);
    }

  }
  function editProduct(name: string, description: string,price: string, restaurant: string, image: string, id: string) {
    setRestValue(restaurant)
    setPriceValue(price)
    setDescValue(description)
    setTitlevalue(name)
    seteditImg(image)
    setImg([image])
    seteditID(id)

    onOpen()
  }



  async function deleteProduct(id:string){
    try{
        axios.delete(`http://localhost:3000/api/products/${id}`)
        .then(response => {
          console.log(`deleted `);
          // reset()
          toast.success("Offer deleted sucsesfuly", {
            position:"top-right",
          });
        })
        .catch(error => {
          console.error(error);
        });

    }catch(err){console.log(err);
    }
   
}

let [mobile,setmobile]=useState(false)
useEffect(()=>{
    if(window.innerWidth<800){
        setmobile(true)
    }else{
        setmobile(false)
    }
  
    
    
},[])
  return (
    <>
      <ToastContainer />
      {/* //write here toastify!!! */}
      <div className=" rounded-lg w-52 h-72 bg-white">

        <div className="flex  flex-col items-center mt-3 py-2">
          <img
            className="h-40 object-cover"
            width={170}
            height={158}
            src={data.img_url}
            alt=""
          />
        </div>
        <div className="m-1 mx-5">
          <p className=" text-lg font-medium">{data.description}</p>
          <p className=" text-[#8E8E93]">{data.name}</p>
        </div>
        <div className=" mx-5 flex justify-between">
          <p className="text-[#00B2A9;] font-medium">${data.price}</p>

          <div className="flex mx-3 gap-3">
            <Image
              width="24"
              height="0"
              src="/EditButton.svg"
              alt=""
              className=" cursor-pointer"
              onClick={()=>{
                edit(data.name,data.description,data.img_url,data.price,data.rest_id,data.id)
              }}

            />
            <Image
              width="24"
              height="0"
              src="/DeleteButton.svg"
              alt=""
              className=" cursor-pointer"
              onClick={()=>{
                            
                deleteProduct(data.id)
            }}
            />
          </div>
        </div>

        <Form
          isOpen={isOpen}

          title={editImg ? 'Edit Product' : 'Edit Product'} 
          subtitle={`${editImg? 'Edit' : 'Edit'} 
          your Product description and necessary information `} 
          onClose={()=>{
            onClose()
            seteditImg('')
            setTitlevalue('')
            setDescValue('')
            setPriceValue('')
            setRestValue('')
        }}

        onAction={editImg?updateProduct: addProduct} 
        btnTitle={editImg ? "Edit product" : "Update product"}
        IMG={editImg}
        setIMG={setImg}


        >
          <Input hasLabel={true} title={"Name"} type={"text"} input_name={"product_name"} Ref={inpTitle} value={Titlevalue} />
          <div className=" text-red-600">{TitleYup}</div>
          <Input hasLabel={true} title={"Description"} type={"text"} input_name={"product_desc"} Ref={inpDesc} value={DescValue} />
          <div className="  text-red-600 ">{DescYup}</div>
          <Input hasLabel={true} title={"Price"} type={"number"} input_name={"product_price"} Ref={inpPrice} value={PriceValue} />
          <div className="  text-red-600 ">{PriceYup}</div>
          <Input hasLabel={true} title={"Restaurants"} type={"text"} input_name={"product_rest"} Ref={inpRest} value={RestValue} />
          <div className="  text-red-600 ">{RestYup}</div>
       
                                          
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
      </div>
    </>
  );
}

export default AdminCard;
