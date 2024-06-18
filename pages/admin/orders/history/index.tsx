import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../shared/components/admin/Layout/AdminLayout';
import AdminHedetbuttom from '../../../../shared/components/admin/AdminHeaderButtom';
import OrdersTable from '../../../../shared/components/admin/OrdersTable';
import { useQuery } from 'react-query';
import { GetOrderHistory } from '../../../../shared/services';
import { Get } from '../../../../server/helper/reguests';
import Loading from '../../../../shared/components/Loading/Loading';
import style from "../order.module.css"
import Image from 'next/image';
import CloseIcon from "../../../../public/Close.svg";
import formatDate from '../../../../server/helper/convertDateToDAy';
import withAuth from "../../../../shared/HOC/withAuth";
// import InfoBox from "../../../shared/components/admin/Modal";
import InfoBox from "../../../../shared/components/admin/Modal";
import { UserOrdersDetail } from '../../../../shared/components/Client/UserOrdersDetail';
import INFoBox from '../../../../shared/components/Client/InfoBox';
import { UserOrderDetailDatas } from '../../../../shared/components/Client/UserOrderDetailDatas';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';



function index() {
   let [data,setdata]=useState()
   let [display ,setdisplay]=useState(false)
   let [Order ,setOrder]=useState<any>()
   let [ID ,setID]=useState<any>()
   const { t } = useTranslation("common");

   function ShowOrder(Order:object){
       
    setdisplay(true)
    setOrder(Order)
}

    useEffect(()=>{
        (async()=>{
            try{

                let res = await GetOrderHistory()
                setdata(res.data.result.data)
            }catch(err){

                console.log(err);
                
            }
            
            
        })()
    },[])
    
    if(data){
    return (
        <>
                <AdminLayout>
        <AdminHedetbuttom addButton={false} typeButton={false} Title={"History"}/>
        <OrdersTable data={data} cantdelet={true} ShowOrder={ShowOrder}/>
    </AdminLayout>
<InfoBox isOpen={display} onClose={()=>setdisplay(false)}>
<table className="min-w-full text-center">
      <thead>
        <tr className="border-solid border-b-2 border-whiteLight3">
          <th className="py-2 px-4 border-b-2"> {t("Image")}</th>
          <th className="py-2 px-4 border-b">{t("Name")}</th>
          <th className="py-2 px-4 border-b">{t("Price")} $</th>
          <th className="py-2 px-4 border-b">{t("Count")}</th>
          <th className="py-2 px-4 border-b">{t("Amount")}</th>
        </tr>
      </thead>
      <tbody>
        {Order?.products?.map((item: any, index: number) => (
          <UserOrderDetailDatas
            key={index}
            image={item.img_url}
            name={item.name}
            price={item.price}
            count={item.count}
            amount={item.amount}
          />
        ))}
      </tbody>
    </table>
            
                <button
                    className="mt-4 border-solid border-b-2 border-grayText text-grayText py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
                   
                    onClick={()=>{setdisplay(false)}}>
                   {t("Close")}
                   
                    </button>
            </InfoBox>
        </>

    )}
    return(<Loading/>)
}

export default withAuth(index);
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
});
