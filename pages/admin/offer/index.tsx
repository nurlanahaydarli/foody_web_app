import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import AdminTable from "../../../shared/components/admin/AdminTable";
import {cache, useEffect, useRef, useState} from "react";
import axios, {AxiosResponse} from "axios";
import Form from "../../../shared/components/admin/Form/Form";
import Input from "../../../shared/components/admin/Form/Input";
import {useModalOpen} from "../../../shared/hooks/UseModalOpen";
import { useToast } from '@chakra-ui/react'
import uploadFile from "../../../shared/utils/uploadFile";

import withAuth from "../../../shared/HOC/withAuth";
import { PostOffer, PutOffer } from "../../../shared/services";
 function Offer() {
    const {isOpen, onOpen, onClose} = useModalOpen()
    let [offers, setoffers] = useState([])
    let [Img, setImg] = useState<any>('')
    let [editImg, seteditImg] = useState<any>('')
    let [editID, seteditID] = useState<any>('')

    let [TitleYup, setTitleYup] = useState('')
    let [loading, setloading] = useState(false)
    let [Titlevalue, setTitlevalue] = useState('')
    let [DescYup, setDescYup] = useState('')
    let [DescValue, setDescValue] = useState('')

    let [ResetData, setResetData] = useState(true)
     const toast = useToast()
    

    const inpTitle = useRef<any>()
    const inpDesc = useRef<any>()
    useEffect(() => {
        (async () => {
            try {
                let res = await axios.get('http://localhost:3000/api/offer')
                let newData = await res.data.result.data
                setoffers(newData)


            } catch (err) {
                console.log(err);
            }
        })()
    }, [ResetData])

    async function postOffer(offer: object) {
        try {
           
            PostOffer(offer)
                .then(function (response) {
                   
                    setResetData(prev => !prev)
                    // toast.success("Offer added sucsesfuly", {
                    //     position: "top-right",
                    // });
                    toast({
                        title: `Offer added successfully`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position:'top-right',
                        variant:'subtle'
                    })
                    
                })
                .catch(function (error) {
                    console.log(error);
                   

                   
                });
        } catch (err) {
            console.log(err);
           
        }
    }

    async function upOffer(offer: object, id: string) {
        console.log(loading);
        
        console.log(offer);
        

        try {
            
            setloading(true)

            PutOffer(offer,id)
                .then(function (response) {
                   
                    console.log(response);
                    setResetData(prev => !prev)
                    // toast.success("Offer update sucsesfuly", {
                    //     position: "top-right",
                    // });
                    toast({
                        title: `Offer update successfully`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position:'top-right',
                        variant:'subtle'
                    })
                })
                .catch(function (error) {
                    console.log(error);
                   

                });
        } catch (err) {
            console.log(err);
        }
    }

    async function AddOffer() {
        let Title = inpTitle?.current?.value as string;
        let Desc = inpDesc?.current?.value as string;
        Title.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('')
        Desc.length <= 3 ? setDescYup('description have to be longer than 3 ') : setDescYup('')
        if (Desc.length <= 3 || Title.length <= 3) {
            return
        }
        let newOffer:{name:string,description:string,img_url?:AxiosResponse<string|null>} = {
            "name": Title,
            "description": Desc
        }
        setloading(true)
        try {
            let res = await uploadFile({
                file: Img,
                collectionId: "offer",
                documentId: "offer"
            }) as AxiosResponse<string|null>;
            newOffer.img_url = res;
           
            await postOffer(newOffer).then(()=>setloading(false))

            inpTitle?.current?.value == ''
            inpDesc?.current?.value == ''
            onClose()
        } catch (err) {
            console.log(err);
            setloading(false)
        }

    }

    async function updateOffer() {
        let Title = inpTitle?.current?.value
        let Desc = inpDesc?.current?.value
        Title.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('')
        Desc.length <= 3 ? setDescYup('description have to be longer than 3 ') : setDescYup('')
        if (Desc.length <= 3 || Title.length <= 3) {
            return
        }

        let newOffer = {
            id: editID,
            "name": Title,
            "description": Desc,
            "img_url": editImg
        }
        setloading(true)
        try {
            if(Img){
                
                    let res = await uploadFile({
                        file: Img,
                        collectionId: "offer",
                        documentId: "offer"
                    }) as AxiosResponse<string|null>;
                    newOffer.img_url = res;
                }
            
            
            // newOffer.img_url = res;
            setloading(true)
            await upOffer(newOffer, editID).finally(()=>setloading(false))

            inpTitle?.current?.value == ''
            inpDesc?.current?.value == ''
            
            onClose()
        } catch (err) {
            console.log(err);
            setloading(false)
        }

    }

    async function deleteOffer(id: string) {
        try {
            axios.delete(`http://localhost:3000/api/offer/${id}`)
                .then(response => {
                    console.log(`deleted `);
                    setResetData(prev => !prev)
                    // toast.success("Offer deleted sucsesfuly", {
                    //     position: "top-right",
                    // });
                    toast({
                        title: `Offer deleted successfully`,
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                        position:'top-right',
                        variant:'subtle'
                    })
                })
                .catch(error => {
                    console.error(error);
                });

        } catch (err) {
            console.log(err);
        }

    }

    function editOffer(name: string, description: string, image: string, id: string) {
        setTitlevalue(name)
        setDescValue(description)
        seteditImg(image)
        
        seteditID(id)
        onOpen()
    }
    // if(offers.length===0){
    //     return(<Loading/>)
    // }
    
    return (
        <>
            <AdminLayout>
                <AdminHedetbuttom
                    typeButton={false}

                    addButton={true}
                    addTitle={"ADD OFFER"}
                    Title={"Offers"}
                    addButtonFun={onOpen}/>
                <AdminTable
                    edit={editOffer}
                    data={offers}
                    removeDocument={deleteOffer}
                    reset={() => setResetData(prev => !prev)}
                />
            </AdminLayout>
            <Form
            loading={loading}
                isOpen={isOpen}
                title={editImg ? 'Edit Offer' : 'Add Offer'}
                subtitle={"Add your Offer Title and Description "}
                onClose={() => {
                    onClose()
                    seteditImg('')
                    setTitlevalue('')
                    setDescValue('')
                }}
                onAction={editImg ? updateOffer : AddOffer}
                btnTitle={editImg ? "Edit offer" : "Create offer"}
                IMG={editImg}
                setIMG={setImg}
            >
                <Input hasLabel={true} title={'Title'} type={'text'} input_name={'Offer_Title'} Ref={inpTitle}
                       value={Titlevalue}/>
                <div className=" text-red-600">{TitleYup}</div>
                <Input hasLabel={true} title={'Name'} type={'text'} input_name={'product_name'} Ref={inpDesc}
                       value={DescValue}/>
                <div className="  text-red-600 ">{DescYup}</div>
            </Form>
        </>
    );
}

export default withAuth(Offer)
