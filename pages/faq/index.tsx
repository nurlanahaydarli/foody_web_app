// @ts-nocheck

import React, { useState } from "react";

import Image from "next/image";
import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import Modal1 from "../../shared/components/Client/FaqsModal1";
import Modal2 from "../../shared/components/Client/FaqsModal2";
import Modal3 from "../../shared/components/Client/FaqsModal3";
import Modal4 from "../../shared/components/Client/FaqsModal4";

function Faq() {
  const [isContentVisible, setContentVisibility] = useState(false);

  const toggleContent = () => {
    setContentVisibility(!isContentVisible);
  };
  return (
    <MainLayout>
      <main className=" flex flex-col items-center gap-5 ">
        <p className=" text-5xl font-medium pb-5">F.A.Q</p>

        <div className=" p-6 w-3/4  bg-white shadow-md">
          <div className="flex justify-between mb-3">
            {/* // modal 1 */}
            <p className=" text-2xl font-medium">
              How to contact with Customer Service?
            </p>
            <button onClick={toggleContent}>
              <Image
                width={25}
                height={0}
                src={isContentVisible ? "/plus.svg" : "/minus.svg"}
                alt={isContentVisible ? "plus" : "minus"}
              />
            </button>
          </div>

          {isContentVisible && (
            <div className="text-grayText text-lg leading-7 font-medium">
              Our Customer Experience Team is available 7 days a week and we
              offer 2 ways to get in contact. Email and Chat. We try to reply
              quickly, so you need not to wait too long for a response!.
            </div>
          )}
        </div>

        <div className=" p-6 w-3/4 mx-auto  bg-white shadow-md">
          <div className="flex justify-between mb-3">
            <p className=" text-2xl font-medium">
              App installation failed, how to update system information?
            </p>
            <button onClick={toggleContent}>
              <Image
                width={25}
                height={0}
                src={isContentVisible ? "/plus.svg" : "/minus.svg"}
                alt={isContentVisible ? "plus" : "minus"}
              />
            </button>
          </div>

        <Modal2 />
        </div>
        <div className=" p-6 w-3/4 mx-auto  bg-white shadow-md">
          <div className="flex justify-between mb-3">
            <p className=" text-2xl font-medium">
              Website reponse taking time, how to improve?
            </p>
            <button onClick={toggleContent}>
              <Image
                width={25}
                height={0}
                src={isContentVisible ? "/plus.svg" : "/minus.svg"}
                alt={isContentVisible ? "plus" : "minus"}
              />
            </button>
          </div>

        {/* modal 3 */}
        </div>

        <div className=" p-6 w-3/4   bg-white shadow-md">
          <div className="flex justify-between mb-3">
            <p className=" text-2xl font-medium"> How do I create a account?</p>
            <button onClick={toggleContent}>  
              <Image
                width={25}
                height={0}
                src={isContentVisible ? "/plus.svg" : "/minus.svg"}
                alt={isContentVisible ? "plus" : "minus"}
              />
            </button>
          </div>

          {isContentVisible && (
            <div className="text-grayText text-lg  font-medium">
              Our Customer Experience Team is available 7 days a week and we
              offer 2 ways to get in contact. Email and Chat. We try to reply
              quickly, so you need not to wait too long for a response!.
            </div>
          )}
        </div>

        <div className=" p-6 w-3/4   bg-white shadow-md">
          <div className="flex justify-between mb-3">
            <p className=" text-2xl font-medium">
              Website reponse taking time, how to improve?
            </p>
            <button onClick={toggleContent}>
              <Image
                width={25}
                height={0}
                src={isContentVisible ? "/plus.svg" : "/minus.svg"}
                alt={isContentVisible ? "plus" : "minus"}
              />
            </button>
          </div>

          {isContentVisible && (
            <div className="text-grayText text-lg  font-medium">
              Our Customer Experience Team is available 7 days a week and we
              offer 2 ways to get in contact. Email and Chat. We try to reply
              quickly, so you need not to wait too long for a response!.
            </div>
          )}
        </div>

      </main>
    </MainLayout>
  );
}

export default Faq;
