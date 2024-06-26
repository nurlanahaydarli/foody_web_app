import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import editicon from '../../../../public/editPen.svg'
import deliteicon from '../../../../public/delete.svg'
import styles from '../AdminTable/Admin.module.css'
import {sortDataByCreated} from "../../../utils/sortData";
import {shortText} from "../../../utils/shortText";
import { useTranslation } from "next-i18next";
interface PROPS {
    data? : any,
    reset :Function,
    edit :any,
    removeDocument?:any
}
function AdminTable(props:PROPS) {
let {data,reset,edit,removeDocument} =props
const {t} = useTranslation("common")

let [mobile,setmobile]=useState(false)
useEffect(()=>{
    if(window.innerWidth<800){
        setmobile(true)
    }else{
        setmobile(false)
    }
  
    
    
},[])
    const sortedData = sortDataByCreated(data || []);
    return (
        <div className={styles.table}>
            <table className={styles.tablebg}  >
                <thead>
                    <tr  >
                    <th className={styles.thhead}>
                        <div className={ styles.theadTitleID  }>Id</div>
                        </th>
                    <th className='w-1/4 h-16 items-center '>
                        <div className={styles.theadTitleImg }>{t("Image")}</div>
                        </th>
                        <th className='w-1/4 h-16 items-center '>
                        <div className={styles.theadTitleName}>{t("Name")}</div>
                        </th>
                        <th className='w-1/4 h-16 items-center '>
                        <div className={styles.theadTitleSlug}>{t("Slug")}</div>
                        </th>
                   
                    </tr>
                </thead>
                <tbody>
                    {sortedData?.map((item:any,i:number)=>{
                        
                        
                       return(
                       <tr key={item.id} className={styles.tabletr}>
                    <td className={styles.tdid}>
                        <div className={styles.tableid}>{i+1}</div>
                        </td>
                    <td  className=' align-middle'>
                        <div className='h-full'>
                        <img src={item.img_url} alt="" className={`${styles.tableImg} object-contain`} />

                        </div>

                        
                    


                    
                    </td>
                    <td className={styles.tablename}>{shortText(item.name,20)}</td>
                    <td >
                        <div className={styles.tableSlug}>
                        <p>{shortText(item.description,20)}</p>
                        <div className={styles.icons}>
                        <Image
                        src={editicon}
                        className={`${styles.mr} cursor-pointer`}
                        width={24}
                        height={24}
                        alt='editicon'
                        onClick={()=>{
                            edit(item.name,item.description,item.img_url,item.id)
                        }}
                        />
                        <Image
                        src={deliteicon}
                        className={`${styles.mr} cursor-pointer`}
                        width={14}
                        height={18}
                        alt='editicon'
                        onClick={()=>{
                            removeDocument(item.id)
                        }}
                        />
                        </div>
                        
                        </div>
                        
                    </td>
                    </tr>)
                        
                    })}
              
                    
                    
                </tbody>
                </table>
        </div>
              
        
    );
}

export default AdminTable;
