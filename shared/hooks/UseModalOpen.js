import {useState} from "react";

export  function useModalOpen(){
    const [isOpen,setIsOpen]=useState(false)
    function onOpen(){
        setIsOpen(true)
    }
    function onClose(){
        setIsOpen(false)
    }
    function onToggle(){
        setIsOpen(!isOpen)
    }
    return {onOpen,onClose,isOpen,onToggle}
}