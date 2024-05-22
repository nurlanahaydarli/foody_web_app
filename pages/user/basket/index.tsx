import React, {useState} from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";
import BasketContainer from "../../../shared/components/Client/BasketItem/BasketContainer";



function Basket() {
    return (
        <>
            <MainLayout>
                <div className='px-8'>
                    <div className='flex flex-row'>
                        <Navbar active={2}/>
                        <BasketContainer size={'xl'}/>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default Basket;
