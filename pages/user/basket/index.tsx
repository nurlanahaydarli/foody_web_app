import React, {useState} from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";
import BasketContainer from "../../../shared/components/Client/BasketItem/BasketContainer";
import withClientAuth from '../../../shared/HOC/withClienAuth';


function Basket() {
    return (
        <>
            <MainLayout>
                <div className='px-8'>
                    <div className='flex flex-row'>
                        <div className="w-1/4">
                            <Navbar active={2}/>
                        </div>
                        <div className="w-3/4 p-[16px] pe-[0px]">
                            <BasketContainer size={'xl'}/>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default withClientAuth(Basket);
