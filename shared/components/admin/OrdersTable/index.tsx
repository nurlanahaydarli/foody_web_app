import React, { useEffect, useState } from 'react';
import style from '../OrdersTable/Table.module.css'
import ayeIcon from '../../../../public/aye.svg'
import deleteIcon from '../../../../public/delete.svg'
import Image from 'next/image';
import { AccessGet, Get } from '../../../../server/helper/reguests';formatDate
import firebaseIdToNumber from '../../../../server/helper/firebaseIdToNumber'
import formatDate from '../../../../server/helper/convertDateToDAy'
import { useTranslation } from 'next-i18next';
interface Props{
    data?:any
    ShowOrder?:any
    Ondelete?:any
    cantdelet?:boolean
}
function OrdersTable(props:Props) {
    let {data,ShowOrder,Ondelete,cantdelet}=props
    const {t}=useTranslation("common")
    


 
    return (
            <div className={style.DIV}>
 <table className={style.table} >
                    <thead  >
                            <tr className={style.thead}>
                                <th className={style.theadId}>ID</th>
                                <th className={style.theadCID}>{t("Customer Id")}</th>
                                <th className={style.theadTime}>{t("Time")}</th>
                                <th className={style.theadAd}>{t("Delivery Address")}</th>
                                <th className={style.theadAm}>{t("Amount")}</th>
                                <th className={style.theadPay}>{t("Payment Method")}</th>
                                <th className={style.theadCon}>{t("Contact")}</th>

                            </tr>
                    </thead> 
                    <tbody className={style.Tablebody}>
                        {data?.map((item:any,i:number)=>{
                                let custemerid= firebaseIdToNumber(item.customer_id)
                                
                                
                            return(
                            <tr className={style.thbody}>
                            <th className={style.theadId }>
                                <div className={style.iddiv+' '+ style.thbodyText}>{i+1}</div>
                            </th>
                            <th className={style.theadCID}>
                                <div className={style.iddiv +' '+ style.thbodyText}>{custemerid}</div>
                            </th>
                            <th className={style.theadTime +' '+ style.thbodyText}>{formatDate(item.created)}</th>
                            <th className={style.theadAd+' '+ style.thbodyText}>{item.delivery_address} </th>
                            <th  className={style.theadAm+' '+ style.thbodyText}>{item.amount}</th>
                            <th className={style.theadPay+' '+ style.thbodyText}>{item.payment_method==0?"Cash": "Delivery"}</th>
                            <th className={style.theadCon+' '+ style.thbodyText +' '+ style.thnum}>
                                {item.contact}
                                <div className={style.iconDiv}>
                                    <Image
                                    src={ayeIcon}
                                    className={'cursor-pointer'}
                                    alt='ayeIcon'
                                    width={24}
                                    height={24}
                                    onClick={()=>{
                                        ShowOrder(item)
                                    }}
                                    />
                                    <Image
                                    style={!cantdelet?{display:"block"}:{display:"none"}}
                                    src={deleteIcon}
                                    className={'cursor-pointer'}
                                    alt='deleteIcon'
                                    width={14}
                                    height={17}
                                    onClick={()=>Ondelete(item.id)}
                                    />
                                </div>
                                </th>
                            </tr>
                        )})}
                        {/*

                        <tr className={style.thbody}>
                            <th className={style.theadId }>
                                <div className={style.iddiv+' '+ style.thbodyText}>9177</div>
                            </th>
                            <th className={style.theadCID}>
                                <div className={style.iddiv +' '+ style.thbodyText}>917700</div>
                            </th>
                            <th className={style.theadTime +' '+ style.thbodyText}>25 Dec 2021</th>
                            <th className={style.theadAd+' '+ style.thbodyText}>29 Eve Street, 543 Evenue Road, Ny 87876 </th>
                            <th  className={style.theadAm+' '+ style.thbodyText}>$249.7</th>
                            <th className={style.theadPay+' '+ style.thbodyText}>Cash On Delivery</th>
                            <th className={style.theadCon+' '+ style.thbodyText +' '+ style.thnum}>
                                {show?'994-51-410-3130' :'***-**-***-****'}
                                <div className={style.iconDiv}>
                                    <Image
                                    src={ayeIcon}
                                    alt='ayeIcon'
                                    width={24}
                                    height={24}
                                    onClick={()=>setshow(prev=>!prev)}
                                    />
                                    <Image
                                    src={deleteIcon}
                                    alt='deleteIcon'
                                    width={14}
                                    height={17}
                                    />
                                </div>
                                 </th>
                        </tr> */}

                    </tbody>
                    </table>
                    
            </div>
           
        
        
    );
}

export default OrdersTable;