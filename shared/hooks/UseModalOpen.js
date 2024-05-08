import {useState} from "react";

export  function useModalOpen(){
    const [isOpen,setIsOpen]=useState()
    function onOpen(){
        setIsOpen(true)
    }
    function onClose(){
        setIsOpen(false)
    }
    return {onOpen,onClose,isOpen}
}