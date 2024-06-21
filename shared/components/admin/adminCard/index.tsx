import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { getRestaurants } from "../../../services";
import { RestaurantPostDataType } from "../../../interfaces";
import { shortText } from "../../../utils/shortText";

interface PROPS {
  data? : any,
  reset :Function,
  edit :any,
  removeDocument:any
}



function AdminCard(props:PROPS) {
  let {data,reset,edit,removeDocument} =props
  const [restaurants,setRestaurants] = useState<RestaurantPostDataType[]>([])
let [mobile,setmobile]=useState(false)

useEffect(() =>{
(async () =>{
try {

    let restaurants = await getRestaurants()
    let new_res = await restaurants?.data.result.data  
    setRestaurants (new_res)

} catch (err) {
    console.log(err);
}
  })()
},[])

useEffect(()=>{
    if(window.innerWidth<800){
        setmobile(true)
    }else{
        setmobile(false)
    }
  
    
    
},[])
  return (
    <>
      {/* //write here toastify!!! */}
        {data?.map((data:any)=>(
            <div className='m-[20px]'>
                <div key={data.id} className=" rounded-lg w-52 h-72 bg-white">

                    <div className="flex  flex-col items-center py-2">
                        <img
                            className="h-40 object-cover"
                            width={170}
                            height={158}
                            src={data.img_url}
                            alt=""
                        />
                         {/* {isNewFunction(data.created) && ( )} */}
                    </div>
                    <div className="m-1 mx-5">
                        <p className=" text-lg font-medium">{shortText (data.name, 15)}</p>
                        <p className=" text-[#8E8E93]">
                            {restaurants.find((restaurant) => restaurant.id === data.rest_id)?.name}
                        </p>
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
                                    edit(data.name, data.description, data.img_url, data.price, data.rest_id,data.id)
                                    // edit(data.name, data.description, data.img_url, data.price, data.rest_id, data.id)
                                }}

                            />
                            <Image
                                width="24"
                                height="0"
                                src="/DeleteButton.svg"
                                alt=""
                                className=" cursor-pointer"
                                onClick={() => {

                                  removeDocument(data.id)
                                }}
                            />
                        </div>
                    </div>


                </div>
            </div>
        ))}
    </>
  );
}

export default AdminCard;
