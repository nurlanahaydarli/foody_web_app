// @ts-nocheck

import React, { useState } from "react";

import Image from "next/image";
import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import Modal1 from "../../shared/components/Client/FaqsModal1/index";
import Modal2 from "../../shared/components/Client/FaqsModal2/index";
import Modal3 from "../../shared/components/Client/FaqsModal3/index";
import Modal4 from "../../shared/components/Client/FaqsModal4/index";

function Faq() {
  const [isContentVisible, setContentVisibility] = useState(false);

  const toggleContent = () => {
    setContentVisibility(!isContentVisible);
  };
  return (
    <MainLayout>
      <main className="my-[60px] flex flex-col items-center gap-5 ">
        <h1 className=" text-5xl font-medium pb-5">F.A.Q</h1>
        <Modal1 />
        <Modal2 />
        <Modal3 />
        <Modal4 />
      </main>
    </MainLayout>
  );
}

export default Faq;
