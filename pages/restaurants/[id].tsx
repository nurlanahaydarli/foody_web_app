import {useRouter} from "next/router";
import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import React from "react";

export default function RestaurantDetail() {
    let {query} = useRouter()
    console.log(query,'router')
    return (
        <>
            <MainLayout>
                <div className='px-8 pt-1 pb-[100px]'>

                </div>
            </MainLayout>
        </>
    )
}