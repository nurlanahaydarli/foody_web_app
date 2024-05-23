

import Image from 'next/image';
import React, { useState } from 'react'




function Modal1(faq: { title: string, text: string, id: number }) {
    const [isContentVisible, setContentVisibility] = useState(false);

    const toggleContent = () => {
        setContentVisibility(!isContentVisible);
    };
    return (
        <>

            <div className=" p-6 w-3/4 mx-auto  bg-white shadow-md">
                <div className="flex justify-between mb-3">
                    <p className=" text-2xl font-medium">
                        {faq.title}
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
                        {faq.text}
                    </div>
                )}
            </div>

        </>
    )
}

export default Modal1