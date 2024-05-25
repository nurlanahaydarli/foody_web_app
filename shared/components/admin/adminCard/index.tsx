import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../Modal";
import { useModalOpen } from "../../../hooks/UseModalOpen";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "../Button";
import Form from "../Form/Form";

import Input from "../Form/Input";
import axios from "axios";
import Loading from "../../Loading/Loading";

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



  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let res = await axios.get('http://localhost:3000/api/products')
  //       let newData = await res.data.result.data
  //       setProducts(newData)
      
      

  //     } catch (err) { console.log(err); }
  //   })()
  // }, [ResetData])
console.log("datdatadatadataa",data);





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
        {data?.map((data:any)=>(
            <div key={data.id} className=" rounded-lg w-52 h-72 bg-white">

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
                            onClick={() => {
                                edit(data.name, data.description, data.img_url, data.price, data.rest_id, data.id)
                            }}

                        />
                        <Image
                            width="24"
                            height="0"
                            src="/DeleteButton.svg"
                            alt=""
                            className=" cursor-pointer"
                            onClick={() => {

                                deleteProduct(data.id)
                            }}
                        />
                    </div>
                </div>


            </div>
        ))}
    </>
  );
}

export default AdminCard;
