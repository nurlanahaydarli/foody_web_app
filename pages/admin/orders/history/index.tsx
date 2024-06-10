import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../shared/components/admin/Layout/AdminLayout';
import AdminHedetbuttom from '../../../../shared/components/admin/AdminHeaderButtom';
import OrdersTable from '../../../../shared/components/admin/OrdersTable';
import { useQuery } from 'react-query';
import { GetOrderHistory } from '../../../../shared/services';
import { Get } from '../../../../server/helper/reguests';
import Loading from '../../../../shared/components/Loading/Loading';
import style from "../order.module.css"
import Image from 'next/image';
import CloseIcon from "../../../../public/Close.svg" 
import formatDate from '../../../../server/helper/convertDateToDAy';
import withAuth from "../../../../shared/HOC/withAuth";



function index() {
   let [data,setdata]=useState()
   let [display ,setdisplay]=useState(false)
   let [Order ,setOrder]=useState<any>()
   function ShowOrder(Order:object){
       
    setdisplay(true)
    setOrder(Order)
}

    useEffect(()=>{
        (async()=>{
            try{

                let res = await GetOrderHistory()
                setdata(res.data.result.data)
            }catch(err){

                console.log(err);
                
            }
            
            
        })()
    },[])
    
    if(data){
    return (
        <>
                <AdminLayout>
        <AdminHedetbuttom addButton={false} typeButton={false} Title={"History"}/>
        <OrdersTable data={data} cantdelet={true} ShowOrder={ShowOrder}/>
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
                                {Order?.products?.map((item:any)=>(
                                    <div className='m-[20px]'>
                                    <div  className=" rounded-lg w-52 h-72 bg-white">

                                        <div className="flex  flex-col items-center py-2">
                                            <img
                                                className="h-40 object-cover"
                                                width={170}
                                                height={158}
                                                src={item.img_url}
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
        </>

    )}
    return(<Loading/>)
}

export default withAuth(index);