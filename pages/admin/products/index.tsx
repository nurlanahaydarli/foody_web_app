


import dynamic from "next/dynamic";
import AdminCard from "../../../shared/components/admin/adminCard";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import { useEffect, useState } from "react";
import axios from "axios";


const AdminLayout = dynamic(
  () => import("../../../shared/components/admin/Layout/AdminLayout"),
  {
    ssr: false,
  }
);


interface PROPS {
  data? : any,
  reset? :Function,
  edit? :any,
}

export default function Products(props:PROPS) {

let {data,reset,edit} =props
let [products, setProducts] = useState([])
let [ResetData, setResetData] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get('http://localhost:3000/api/products')
        let newData = await res.data.result.data
        setProducts(newData)

console.log("newData",newData);

      } catch (err) { console.log(err); }
    })()
  }, [ResetData])

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

            <div className="w-full sm:w-auto m-5 flex flex-wrap gap-10 justify-center">

            {/* {data?.map((item:any,i:number)=>{ */}
                {products?.map((item:any,i:number)=><AdminCard data={item}  edit={updateProduct}

                reset={()=>setResetData(prev=>!prev)}

                 />
               

                )}
           
              

            </div>
             
          </section>
        </main>
      </AdminLayout>
    </>
  );
}
//
// export default function Products(){
//
// }
