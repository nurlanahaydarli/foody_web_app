import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import OrdersTable from "../../../shared/components/admin/OrdersTable";
import style from "../orders/order.module.css"
import editicon from "../../../public/EditButton.svg"
import LeftSvg from '../../../shared/components/admin/svg/LeftSvg'
import CloseIcon from "../../../public/Close.svg" 
import Image from "next/image";
import { useEffect, useState } from "react";
import { AccessGet, Delete } from "../../../server/helper/reguests";
import formatDate from "../../../server/helper/convertDateToDAy";
import Modal from "../../../shared/components/admin/Modal";
import CustomButton from "../../../shared/components/admin/Button";
import { DeleteOrder } from "../../../shared/services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../../shared/components/Loading/Loading";
export default function Orders() {
    let [display ,setdisplay]=useState(false)
    let [displayModal ,setdisplayModal]=useState(false)
    let [data ,setdata]=useState()
    let [id ,setid]=useState<string>()
    let [Order ,setOrder]=useState<any>()

    
    useEffect(()=>{
        (async()=>{
            try{
                let res= await AccessGet("order")
                let newdata= await res.result.data
                setdata(newdata)
            }catch(err){console.log(err);
            }
            
        })()
        
    },[])
    function ShowOrder(Order:object){
       
        setdisplay(true)
        setOrder(Order)
    }
    function handleModalClose(){
       setdisplayModal(false)
        
    }
    function Ondelete(id:string){
        setdisplayModal(true)

         setid(id)
         
     }
    function Delete(){
        if(id){
            DeleteOrder(id)
            toast.success("Order deleted sucsesfuly", {
                position:"top-right",
              });
        }else{
            alert("some thing wrong with id")
        }
        
    }
    if(data==undefined){
        return(<Loading/>)
    }
    return (
        <>
            <AdminLayout>
                <AdminHedetbuttom addButton={false} typeButton={false} Title={"Orders"}/>
                <OrdersTable data={data} ShowOrder={ShowOrder} Ondelete={Ondelete}/>
            </AdminLayout>
            <div className={style.infoBox} style={!display?{display:"none"}:{display:"flex"}}>
                <div className=" bg-whiteLight1 w-2/3 h-2/3 flex flex-col relative">
                    <div className=" text-center">
                        <h2 className="text-4xl font-semibold">Order</h2>
                        <p>{Order?.id}</p>
                    </div>
                    <div className="flex flex-row  overflow-hidden">
                        <div className="flex flex-row w-3/4">
                            <div className="flex flex-col ">
                                 <div className="flex flex-row  items-center m-4 gap-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900 w-1/2 text-center">Price:</label>
                                    <div className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center">{Order?.amount}$</div>
                                </div>
                                <div className="flex flex-row items-center m-4 gap-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900 w-1/2 text-center">Address:</label>
                                    <div className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center">{Order?.delivery_address}</div>
                                </div>
                                <div className="flex flex-row items-center m-4 gap-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900 w-1/2 text-center">Time:</label>
                                    <div className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center">{formatDate( Order?.created)  }</div>
                                </div>
                                <div className="flex flex-row  items-center m-4 gap-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900 w-1/2 text-center">Contact:</label>
                                    <div className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"> +{Order?.contact}</div>
                                </div>
                                <div className="flex flex-row items-center m-4 gap-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900 w-1/2 text-center">Payment Method:</label>
                                    <div className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center">{Order?.payment_method==0?"Cash":"Card"}</div>
                                </div>
                            </div>
                               
                            <div className="flex flex-col justify-center items-center w-1/2 ">
                                <Image
                                className="  rounded-full"
                                 width="250"
                                 height="250"
                                 alt=""
                                 src='data:image/jpeg;base64,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'
                                />
                                 <div className="flex flex-row  items-center m-4 gap-4 w-full">
                                    <label className="block text-sm font-medium leading-6 text-gray-900 w-1/2 text-center">Custemer Id:</label>
                                    <div className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center">{Order?.customer_id   }</div>
                                </div>

                            </div>
                            

                        </div>
                        <div className="flex flex-col w-1/4 h-full overflow-auto">
                            <div >
                                {Order?.products.map((item:any)=>(
                                    <div className='m-[20px]'>
                                    <div  className=" rounded-lg w-52 h-72 bg-white">

                                        <div className="flex  flex-col items-center py-2">
                                            <img
                                                className="h-40 object-cover"
                                                width={170}
                                                height={158}
                                                src={"data:image/png;base64,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"}
                                                alt=""
                                            />
                                        </div>
                                        <div className="m-1 mx-5">
                                            <p className=" text-lg font-medium">{item.name}</p>
                                            <p className=" text-[#8E8E93]">{item.name}</p>
                                        </div>
                                        <div className=" mx-5 flex justify-between">
                                            <p className="text-[#00B2A9;] font-medium">{item.amount}$</p>


                                        </div>


                                    </div>
                                </div>
                                ))}
                                
                                
                            </div>

                        </div>
                    </div>
                    <Image
                    width={30}
                    height={30}
                    src={CloseIcon}
                    alt="CloseSvg"
                    className=" absolute -top-4 -right-4"
                    onClick={()=>setdisplay(false)}
                    />
                </div>

            </div>
            <Modal isOpen={displayModal} onClose={handleModalClose}>
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
              <div onClick={Delete}>
                <CustomButton
                    type={'button'}
                    className="bg-mainRed border-2 text-white py-1 px-8"
                    innerText="Delete"
                    color={"1"}
                />
              </div>
            </div>
          </Modal>
          <ToastContainer/>
        </>
    );
}