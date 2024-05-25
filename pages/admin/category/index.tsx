import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import dynamic from "next/dynamic";

import AdminHedetbuttom from '../../../shared/components/admin/AdminHeaderButtom'
import AdminTable from '../../../shared/components/admin/AdminTable'
import { useEffect, useRef, useState } from "react";
import { useModalOpen } from "../../../shared/hooks/UseModalOpen";
import Input from "../../../shared/components/admin/Form/Input";
import Form from "../../../shared/components/admin/Form/Form";
import axios, {AxiosResponse} from "axios";
import {DeleteCategory, EditCategory, getCategories, PostCategory} from "../../../shared/services";
import uploadFile from "../../../shared/utils/uploadFile";

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
                let res= await getCategories()
                let newData= await res.data.result.data
                setCategories(newData)
            }catch(err){console.log(err);}
        })()
    },[ResetData])

    async function addCategory(){
        let Title=inpTitle?.current?.value
        Title.length<=3?setTitleYup('title have to be longer than 3 '):setTitleYup('')

        let newCategory={
            "name": Title,
            "img_url":""
        }


        try{
            let res= await uploadFile({
                file:Img[0].file,
                collectionId:"category",
                documentId:"lsad"
            }) as  string
            newCategory.img_url = res;
            let addedCategory =  await PostCategory(newCategory);

            console.log("addd",addedCategory)

            console.log("res",res);
            inpTitle?.current?.value==''
            onClose()
        }catch(err){console.log(err);
        }

    }
    async function updateCategory(){
        let Title=inpTitle?.current?.value
        if (Title.length <= 3) {
            setTitleYup('title have to be longer than 3');
            return;
        } else {
            setTitleYup('');
        }

        if (!Img || Img.length === 0) {
            console.error('Image is required');
            return;
        }

        let updatedCategory = {
            id: editID,
            name: Title,
            img_url: ""
        };
        try{
            let res= await uploadFile({
                file:Img[0].file,
                collectionId:"category",
                documentId:"lsad"
            }) as  string
            updatedCategory.img_url = res;
            await EditCategory(updatedCategory)
            inpTitle.current.value = '';
            onClose();
        }catch(err){
            console.log(err);
        }

    }
    async function removeCategory(id: string | number){
        console.log(id,'editID')
        try{
            await DeleteCategory(id)
            setResetData(prev => !prev);
        }catch(err){
            console.log(err);
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
                    <AdminTable edit={editCategory} removeDocument={removeCategory}
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
