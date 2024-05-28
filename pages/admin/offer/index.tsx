import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import AdminTable from "../../../shared/components/admin/AdminTable";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Form from "../../../shared/components/admin/Form/Form";
import Input from "../../../shared/components/admin/Form/Input";
import { useModalOpen } from "../../../shared/hooks/UseModalOpen";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Offer() {
    const {isOpen, onOpen, onClose} = useModalOpen();
    const [offers, setOffers] = useState([]);
    const [Img, setImg] = useState<any>([]);
    const [editImg, setEditImg] = useState<any>('');
    const [editID, setEditID] = useState<any>('');

    const [TitleYup, setTitleYup] = useState('');
    const [Titlevalue, setTitlevalue] = useState('');
    const [DescYup, setDescYup] = useState('');
    const [DescValue, setDescValue] = useState('');

    const [ResetData, setResetData] = useState(true);
    const inpTitle = useRef<any>();
    const inpDesc = useRef<any>();

    useEffect(() => {
        (async () => {
            try {
                let res = await axios.get('http://localhost:3000/api/offer');
                let newData = await res.data.result.data;
                setOffers(newData);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [ResetData]);

    async function postOffer(offer: object) {
        try {
            axios.post('http://localhost:3000/api/offer', offer)
                .then(function (response) {
                    console.log(response);
                    setResetData(prev => !prev);
                    toast.success("Offer added successfully", {
                        position: "top-right",
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    }

    async function upOffer(offer: object, id: string) {
        console.log(id, offer);

        try {
            axios.put(`http://localhost:3000/api/offer/${id}`, offer)
                .then(function (response) {
                    console.log(response);
                    setResetData(prev => !prev);
                    toast.success("Offer updated successfully", {
                        position: "top-right",
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    }

    async function AddOffer() {
        let Title = inpTitle?.current?.value;
        let Desc = inpDesc?.current?.value;
        Title.length <= 3 ? setTitleYup('Title must be longer than 3 characters') : setTitleYup('');
        Desc.length <= 3 ? setDescYup('Description must be longer than 3 characters') : setDescYup('');
        if (Desc.length <= 3 || Title.length <= 3) {
            return;
        }
        let newOffer = {
            "name": Title,
            "description": Desc,
            "img_url": Img.length > 0 ? Img[0].data_url : ''
        };
        console.log('Adding offer:', newOffer); // Log the offer object
        try {
            await postOffer(newOffer);
            inpTitle.current.value = '';
            inpDesc.current.value = '';
            onClose();
        } catch (err) {
            console.log(err);
        }
    }

    async function updateOffer() {
        let Title = inpTitle?.current?.value;
        let Desc = inpDesc?.current?.value;
        Title.length <= 3 ? setTitleYup('Title must be longer than 3 characters') : setTitleYup('');
        Desc.length <= 3 ? setDescYup('Description must be longer than 3 characters') : setDescYup('');
        if (Desc.length <= 3 || Title.length <= 3) {
            return;
        }
        let newOffer = {
            "name": Title,
            "description": Desc,
            "img_url": Img.length > 0 ? Img[0] : ''
        };
        console.log('Updating offer:', newOffer); // Log the offer object
        try {
            await upOffer(newOffer, editID);
            inpTitle.current.value = '';
            inpDesc.current.value = '';
            onClose();
        } catch (err) {
            console.log(err);
        }
    }

    function editOffer(name: string, description: string, image: string, id: string) {
        setTitlevalue(name);
        setDescValue(description);
        setEditImg(image);
        setImg([image]);
        setEditID(id);
        onOpen();
    }

    function handleImageChange(e: any) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImg([{ data_url: reader.result }]);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <AdminLayout>
                <AdminHedetbuttom
                    typeButton={false}
                    addButton={true}
                    addTitle={"ADD OFFER"}
                    Title={"Offers"}
                    addButtonFun={onOpen} />
                <AdminTable
                    edit={editOffer}
                    data={offers}
                    reset={() => setResetData(prev => !prev)}
                />
            </AdminLayout>
            <Form
                isOpen={isOpen}
                title={editImg ? 'Edit Offer' : 'Add Offer'}
                subtitle={"Add your Offer Title and Description"}
                onClose={() => {
                    onClose();
                    setEditImg('');
                    setTitlevalue('');
                    setDescValue('');
                }}
                onAction={editImg ? updateOffer : AddOffer}
                btnTitle={editImg ? "Edit offer" : "Create offer"}
                IMG={editImg}
                setIMG={setImg}
            >
                <Input hasLabel={true} title={'Title'} type={'text'} input_name={'Offer_Title'} Ref={inpTitle} value={Titlevalue} onChange={(e) => setTitlevalue(e.target.value)} />
                <div className="text-red-600">{TitleYup}</div>
                <Input hasLabel={true} title={'Description'} type={'text'} input_name={'Offer_Description'} Ref={inpDesc} value={DescValue} onChange={(e) => setDescValue(e.target.value)} />
                <div className="text-red-600">{DescYup}</div>
                <input type="file" onChange={handleImageChange} />
            </Form>
            <ToastContainer />
        </>
    );
}
