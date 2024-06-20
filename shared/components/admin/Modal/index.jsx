import React from "react";

function Modal({ isOpen, onClose, children }) {
  return (
    <div
      className={`fixed w-full h-full top-0 left-0 z-50 overflow-auto  z-[100] ${
        isOpen ? "block" : "hidden"
      } bg-black bg-opacity-30`}
    >
      <div className="flex items-center justify-center position_fixed">
        <div className="bg-white px-1 py-4 sm:p-8 mx-2 sm:mx-0">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
