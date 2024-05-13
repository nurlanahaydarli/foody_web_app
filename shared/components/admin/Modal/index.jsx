import React from "react";

function Modal({ isOpen, onClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 overflow-auto ${
        isOpen ? "block" : "hidden"
      } bg-black bg-opacity-30`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white px-1 py-4 sm:p-8 mx-2 sm:mx-0">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
