import React from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";

function Orders() {
    return (
        <>
            <MainLayout>
                <div className='px-8 pt-1 pb-[100px]'>
                    <div className='flex flex-row'>
                        <Navbar active={3}/>

                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Orders;
