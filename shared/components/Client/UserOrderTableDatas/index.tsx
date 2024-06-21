import Image from "next/image";
import { useState } from "react";
import Modal from "../../admin/Modal";
import CustomButton from "../../admin/Button";
import { UserOrdersDetail } from "../UserOrdersDetail";
import {DeleteOrder, deleteOrder} from "../../../services";
import {useTranslation} from "next-i18next";

interface TableDataProps {
    
    customer_id:number | string;
    id: number | string;
    time: number | string;
    adress: string;
    amount: number;
    payment: string;
    fetchOrder:any;
    contact: number;
}
export const UserOrderTableDatas: React.FC<TableDataProps> = ({
    customer_id,
    id,
    time,
    adress,
    amount,
    payment,
    contact, fetchOrder
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [orderData, setOrderData] = useState([]);
    const { t } = useTranslation("common");
    async function inDeleteOrder() {
        const response = await DeleteOrder(id);
        if (response?.status == 204) {
            let newdata = orderData.filter((item: any) => item.id !== id);
            console.log('new',newdata);
            setOrderData(newdata);
            fetchOrder()
            handleModalClose();
        }
    }
    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };


    const handleButtonClick2 = () => {
        setIsModalOpen2(true);
    };

    const handleModalClose2 = () => {
        setIsModalOpen2(false);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <>
            <tr className=" border-solid border-b-2 border-whiteLight3" >
                <td className="py-2 px-4 border-b ">
{customer_id}
</td>
                <td className="py-2 px-4 border-b ">{time} </td>
                <td className="py-2 px-0 sm:px-4 border-b  max-w-60 text-center sm:text-start w-60">
                    {adress}
                </td>
                <td className="py-2 px-4 border-b">${amount}</td>
                <td className="py-2 px-4 border-b ">{payment}</td>
                <td className="py-2 px-4 border-b ">{contact}</td>
                <td className="py-2 px-4 border-b ">
                    <div className="realtive z-50 m-auto">
                        <Image
                            className="cursor-pointer  sm:left-0 sm:relative min-w-1"
                            width={5}
                            height={0}
                            src={"/fullstop.svg"}
                            alt="3dots"
                            onClick={togglePopup}
                        />
                        {showPopup && (
                            <div className="absolute right-16 w-max border-whiteLight3 shadow-md rounded-md p-2 flex flex-col items-center justify-center gap-1 bg_white">
                               <button
                                    className="text-[#14ae5c] cursor-pointer  hover:text-[#109850]"
                                   

                                    onClick={handleButtonClick2}>
                                    {t("Show")}
                                    </button>
                                <hr className="w-full text-grayText" />
                                <button
                                    className="text-lightRed cursor-pointer  hover:text-mainRed"
                                   
                                    onClick={handleButtonClick}>
                                     {t("Delete")}
                                    </button>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <div className="flex justify-center items-center">
                    <p className="mx-auto text-2xl sm:text-3xl font-medium">
                    {t("Are you sure it's deleted ?")}
                    </p>
                    <CustomButton
                        className="text-mainRed text-lg mr-1 sm:mr-0"
                        onAction={handleModalClose}
                    />
                </div>
                <p className=" text-grayText w-2/3 mx-auto text-center my-5">
                {t("Attention! If you delete this product, it will not come back...")}
                </p>
                <div className="mx-auto flex items-center flex-col sm:flex-row justify-center gap-9">
                <button
                        className="border-solid border-b-2  border-grayText text-grayText py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
                        onClick={handleModalClose}>
                       {t("Cancel")}
                        </button>
                   <button
                        onClick={inDeleteOrder}
                        className="bg-mainRed border-solid border-b-2 text-white py-1 px-8 rounded-md border-mainRed shadow-md hover:scale-95 transition-all duration-500">
                       {t("Delete")}
                        </button>
                </div>
            </Modal>
            <Modal isOpen={isModalOpen2} onClose={handleModalClose2}>
                <UserOrdersDetail id={id} />
                <button
                    className="mt-4 border-solid border-b-2 border-grayText text-grayText py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"

                    onClick={handleModalClose2}>
                   {t("Close")}
                    </button>
            </Modal>
        </>
    );
};