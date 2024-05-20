
import React, { useState } from "react";

import Image from "next/image";



function Modal2() {
    const [isContentVisible, setContentVisibility] = useState(false);
  
    const toggleContent = () => {
      setContentVisibility(!isContentVisible);
    };

    return (
       
  
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

        {isContentVisible && (
          <div className="text-grayText text-lg  font-medium">
            Our Customer Experience Team is available 7 days a week and we
            offer 2 ways to get in contact. Email and Chat. We try to reply
            quickly, so you need not to wait too long for a response!.
          </div>
        )}
      </div>
       
      );
    }
    
    export default  Modal2;