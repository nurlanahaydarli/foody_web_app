import React, { useState } from 'react';
import style from '../OrdersTable/Table.module.css'
import ayeIcon from '../../../../public/aye.svg'
import deleteIcon from '../../../../public/delete.svg'
import Image from 'next/image';
// interface Props{
//     data:any
// }
function OrdersTable() {
    const [ show,setshow]=useState(false)
    return (
        
            <table className={style.table} >
                    <thead  >
                            <tr className={style.thead}>
                                <th className={style.theadId}>ID</th>
                                <th className={style.theadCID}>Customer ID</th>
                                <th className={style.theadTime}>Time</th>
                                <th className={style.theadAd}>Delivery Address</th>
                                <th className={style.theadAm}>Amount</th>
                                <th className={style.theadPay}>Payment Method</th>
                                <th className={style.theadCon}>Contact</th>

                            </tr>
                    </thead> 
                    <tbody className={style.Tablebody}>
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
                        </tr>

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
                        </tr>

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
                        </tr>

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
                        </tr>

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
                        </tr>

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
                        </tr>

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
                        </tr>

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
                        </tr>
                    </tbody>
                    </table>
        
        
    );
}

export default OrdersTable;