import {useState} from 'react';
import Modal from "../Modal";
import CustomButton from "../Button";

const ConfirmModal = ({isOpen, onRequestClose, onConfirm}) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="flex justify-between items-center">
                <p className="mx-auto text-3xl font-medium">
                    Are you sure it's deleted?
                </p>
            </div>

            <p className=" text-grayText w-2/3 mx-auto text-center my-5">
                Attention! If you delete this category, it will not come back...
            </p>

            <div
                className="mx-auto flex items-center justify-center gap-9 flex-col sm:flex-row"
            >
                <button className=" border-grayText text-grayText py-1 px-8 bg_gray" onClick={onRequestClose}>Cancel</button>
                <div onClick={onConfirm}>
                    <CustomButton
                        type={'button'}
                        className="bg-mainRed border-2 text-white py-1 px-8"
                        innerText="Delete"
                        color={"1"}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;