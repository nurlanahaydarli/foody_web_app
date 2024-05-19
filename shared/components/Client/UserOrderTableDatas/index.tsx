import Image from "next/image";
import { useState } from "react";
import Modal from "../../admin/Modal";
import CustomButton from "../../admin/Button";
import { UserOrdersDetail } from "../UserOrdersDetail";

export function UserOrderTableDatas() {

    const [showPopup, setShowPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

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
                <td className="py-2 px-4 border-b ">aaaaaaaaaaaaaaaa</td>
                <td className="py-2 px-4 border-b ">12:00 PM</td>
                <td className="py-2 px-0 sm:px-4 border-b  max-w-60 text-center sm:text-start w-60">
                    Baku Bakikhanov, street Yaver Aliyev 25/95
                </td>
                <td className="py-2 px-4 border-b">$5</td>
                <td className="py-2 px-4 border-b ">Pay Cash</td>
                <td className="py-2 px-4 border-b ">+994505555555</td>
                <td className="py-2 px-4 border-b ">
                    <div className="realtive z-50 m-auto">
                        <Image
                            className="cursor-pointer absolute sm:left-0 sm:relative"
                            width={5}
                            height={0}
                            src={"/fullstop.svg"}
                            alt="3dots"
                            onClick={togglePopup}
                        />
                        {showPopup && (
                            <div className="fixed right-16 w-max border-whiteLight3 shadow-md rounded-md p-2 flex flex-col items-center justify-center gap-1">
                                <CustomButton
                                    className="text-[#14ae5c] cursor-pointer bg-green hover:text-[#109850]"
                                    innerText="Show"

                                    onAction={handleButtonClick2}
                                />
                                <hr className="w-full text-grayText1" />
                                <CustomButton
                                    className="text-lightRed cursor-pointer bg-mainRed hover:text-mainRed"
                                    innerText="Delete"
                                    onAction={handleButtonClick}

                                />
                            </div>
                        )}
                    </div>
                </td>
            </tr>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <div className="flex justify-center items-center">
                    <p className="mx-auto text-2xl sm:text-3xl font-medium">
                        Are you sure it’s deleted?
                    </p>
                    <CustomButton
                        className="text-mainRed text-lg mr-1 sm:mr-0"
                        onAction={handleModalClose}
                    />
                </div>
                <p className=" text-grayText1 w-2/3 mx-auto text-center my-5">
                    Attention! If you delete this order, it will not come back...
                </p>
                <div className="mx-auto flex items-center justify-center gap-9">
                    <CustomButton
                        className="border-solid border-b-2  border-grayText1 text-mainRed py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
                        innerText="Cancel"
                        onAction={handleModalClose}
                    />
                    <CustomButton
                        onAction={handleModalClose}
                        className="bg-mainRed border-solid border-b-2 text-white py-1 px-8 rounded-md border-mainRed shadow-md hover:scale-95 transition-all duration-500"
                        innerText="Delete"
                    />
                </div>
            </Modal>
            <Modal isOpen={isModalOpen2} onClose={handleModalClose2}>
                <UserOrdersDetail />
                <CustomButton
                    className="mt-4 border-solid border-b-2 border-grayText1 text-grayText1 py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
                    innerText="Close"
                    onAction={handleModalClose2}
                    color={"1"}
                />
            </Modal>
        </>
    );
};