import React, {useState} from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";
<<<<<<< HEAD
import BasketContainer from "../../../shared/components/Client/BasketItem/BasketContainer";

=======
import styles from './basket.module.css'
import Image from "next/image";
import BasketSvg from '../../../shared/components/Client/svg/BasketSvg'
import RemoveSvg from '../../../shared/components/Client/svg/RemoveSvg'
import BasketItem from "../../../shared/components/Client/BasketItem";
import EmptyBasket from "../../../shared/components/Client/EmptyBasket";
import withClientAuth from '../../../shared/HOC/withClienAuth';
>>>>>>> c981ee38ef84f604e039d7c1a9525fc2cd1b81a9


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
