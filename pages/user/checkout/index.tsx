import React from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";

function Checkout() {
    return (
        <>
            <MainLayout>
                <div className='px-8 pt-1 pb-[100px]'>
                    <div className='flex flex-row'>
                        <div className="w-1/4">
                            <Navbar active={4}/>
                        </div>
                        <div className="w-3/4 p-[16px] pe-[0px]">

                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Checkout;
