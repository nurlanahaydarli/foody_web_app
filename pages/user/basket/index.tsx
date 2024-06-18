import React, {useState} from 'react';
import Navbar from '../../../shared/components/Client/user-NAV';
import MainLayout from "../../../shared/components/admin/Layout/MainLayout";
import BasketContainer from "../../../shared/components/Client/BasketItem/BasketContainer";
import withClientAuth from '../../../shared/HOC/withClienAuth';
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useResize} from "../../../shared/hooks/useResize";


function Basket() {
    let { isMobile } = useResize();
    return (
        <>
            <MainLayout>
                <div className='px-8'>
                    <div className='flex flex-row'>
                        {!isMobile &&
                            <div className="w-1/4">
                                <Navbar active={2}/>
                            </div>
                        }
                        <div className="lg:w-3/4 w-full  lg:p-[16px] pe-[0px]">
                            <BasketContainer size={'xl'}/>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default withClientAuth(Basket);


export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
});
