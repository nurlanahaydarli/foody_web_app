// @ts-nocheck

import React, { useState } from "react";

import Image from "next/image";
import MainLayout from "../../shared/components/admin/Layout/MainLayout";


function Faq() {
  const [isContentVisible, setContentVisibility] = useState(false);

  const toggleContent = () => {
    setContentVisibility(!isContentVisible);
  };
  return (
    <MainLayout>
      <main className="my-[60px] flex flex-col items-center gap-5 ">
        <h1 className=" text-5xl font-medium pb-5">F.A.Q</h1>
          test
      </main>
    </MainLayout>
  );
}

export default Faq;
