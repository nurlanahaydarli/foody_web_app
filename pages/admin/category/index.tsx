import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import dynamic from "next/dynamic";

import AdminHedetbuttom from '../../../shared/components/admin/AdminHeaderButtom'
import AdminTable from '../../../shared/components/admin/AdminTable'
import { useEffect, useRef, useState } from "react";
import { useModalOpen } from "../../../shared/hooks/UseModalOpen";
import Input from "../../../shared/components/admin/Form/Input";
import Form from "../../../shared/components/admin/Form/Form";
import axios from "axios";
import { toast } from "react-toastify";

const AdminLayout = dynamic(() => import("../../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});

export default function Category() {
    const inpTitle=useRef<any>()
    const {isOpen,onOpen,onClose} = useModalOpen()
    let [categories ,setCategories]=useState([])

    let [Img ,setImg]=useState<any>('')
    let [editImg ,seteditImg]=useState<any>('') 
    let [editID ,seteditID]=useState<any>('')
    let [TitleYup ,setTitleYup]=useState('')
    let [Titlevalue ,setTitlevalue]=useState('')
    let [ResetData,setResetData]=useState(true)
   

    useEffect(()=>{
        (async()=>{
            try{
                let res= await axios.get('http://localhost:3000/api/category')
                let newData= await res.data.result.data
                setCategories(newData)
                
                
            }catch(err){console.log(err);}
        })()
        },[ResetData])

        async function postCategory(category:object){
            try{
                axios.post('http://localhost:3000/api/category',category )
                  .then(function (response) {
                    console.log(response);
                    setResetData(prev=>!prev)
                    toast.success("Offer added sucsesfuly", {
                        position:"top-right",
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }catch(err){console.log(err);
            }
        }
        async function upCategory(category:object,id:string){
            console.log(id,category);
            
            try{
                axios.put(`http://localhost:3000/api/category/${id}`,category )
                  .then(function (response) {
                    console.log(response);
                    setResetData(prev=>!prev)
                    toast.success("Offer update sucsesfuly", {
                        position:"top-right",
                      });
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }catch(err){console.log(err);
            }
        }
    async function addCategory(){
        let Title=inpTitle?.current?.value 
        Title.length<=3?setTitleYup('title have to be longer than 3 '):setTitleYup('')
        let new_category={  
            "name": Title,
            "img_url": Img[0].data_url
        }
        try{
           await postCategory(new_category)
           
           inpTitle?.current?.value==''
           onClose()
        }catch(err){console.log(err);
        }
        
    }
    async function updateCategory(){
        let Title=inpTitle?.current?.value
        Title.length<=3?setTitleYup('title have to be longer than 3 '):setTitleYup('')
    
        
        let new_category={
            "name": Title,
            "img_url": Img[0]
        }
        try{
           await upCategory(new_category,editID)
           
           inpTitle?.current?.value==''
           onClose()
        }catch(err){console.log(err);
        }
        
    }
    function editCategory(name:string,description:string,image:string,id:string){
        setTitlevalue(name)
        seteditImg(image)
        setImg([image])
        seteditID(id)

    onOpen()
}
    return (
        <>
            <AdminLayout>
                <div >
                    <AdminHedetbuttom typeButton={false}  addButton={true} addButtonFun={onOpen} addTitle={'ADD CATEGORY '} Title={'CATEGORY '}/>
                    <AdminTable edit={editCategory}
                                    data={categories}
                                    reset={()=>setResetData(prev=>!prev)} />
                    <Form 
                            isOpen={isOpen}
                            title={editImg ? 'Edit Category' : 'Add Category'} 
                            subtitle={`${editImg? 'Edit' : 'Add'} your Category Name `} 
                            onClose={()=>{
                                onClose()
                                seteditImg('')
                                setTitlevalue('')
                            }}
                            onAction={editImg?updateCategory: addCategory} 
                            btnTitle={editImg ? "Edit category" : "Create category"}
                            IMG={editImg}
                            setIMG={setImg}
                            >
                        <Input hasLabel={true} title={'Name'} type={'text'} input_name={'category_title'} Ref={inpTitle} value={Titlevalue} />
                        <div className=" text-red-600">{TitleYup}</div>
                    </Form>
                </div>
            </AdminLayout>
        </>
    );
}
