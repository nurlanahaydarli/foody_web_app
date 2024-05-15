import Image from "next/image";
import React, { useState } from "react";
import Modal from "../Modal";
import { useModalOpen } from "../../../hooks/UseModalOpen";
import { ToastContainer } from "react-toastify";
import CustomButton from "../Button";
import Form from "../Form/Form";

import Input from "../Form/Input";

function AdminCard() {
  const { isOpen, onOpen, onClose } = useModalOpen();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ToastContainer />
      {/* //write here toastify!!! */}
      <div className=" rounded-lg w-52 h-72 bg-white">
        <div className="flex  flex-col items-center mt-3 py-2">
          <img
            className="h-40 object-cover"
            width="170"
            height="158"
            src=""
            alt=""
          />
        </div>
        <div className="m-1 mx-5">
          <p className=" text-lg font-medium">bbb</p>
          <p className=" text-[#8E8E93]">ccc</p>
        </div>
        <div className=" mx-5 flex justify-between">
          <p className="text-[#00B2A9;] font-medium">$10</p>

          <div className="flex mx-3 gap-3">
            <Image
              width="24"
              height="0"
              src="/EditButton.svg"
              alt=""
              className=" cursor-pointer"
              onClick={onOpen}
            />
            <Image
              width="24"
              height="0"
              src="/DeleteButton.svg"
              alt=""
              className=" cursor-pointer"
              onClick={handleButtonClick}
            />
          </div>
        </div>

        <Form
          isOpen={isOpen}
          title={"Edit Product"}
          subtitle={"Edit your Product description and necessary information"}
          onClose={onClose}
        >


         

          <Input title={"Name"} type={"text"} input_name={"product_name"} />
          <Input title={"Description"} type={"text"} input_name={"product_name"} />
          <Input title={"Price"} type={"number"} input_name={"product_price"} />

          {/* <CustomButton icon={false} title={'Update Product'} type='button' size={'lg'} color={'1'}
                                          onAction={''}/> */}
                                          
        </Form>

        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="flex justify-between items-center">
            <p className="mx-auto text-3xl font-medium">
              Are you sure it's deleted?
            </p>
          </div>

          <p className=" text-grayText1 w-2/3 mx-auto text-center my-5">
            Attention! If you delete this order, it will not come back...
          </p>

          <div
            onClick={handleModalClose}
            className="mx-auto flex items-center justify-center gap-9"
          >
            <CustomButton
              className=" border-grayText1 text-grayText1 py-1 px-8"
              innerText="Cancel"
            />
            <div onClick={handleModalClose}>
              <CustomButton
                className="bg-mainRed border-2 text-white py-1 px-8"
                innerText="Delete"
                color={"1"}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default AdminCard;
