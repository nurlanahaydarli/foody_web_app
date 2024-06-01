import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import editicon from '../../../../public/editPen.svg'
import deliteicon from '../../../../public/delete.svg'
import pizza from '../../../../public/pizza.svg'
import styles from '../AdminTable/Admin.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import {sortDataByCreated} from "../../../utils/sortData";
interface PROPS {
    data? : any,
    reset :Function,
    edit :any,
    removeDocument?:any
}
function AdminTable(props:PROPS) {
let {data,reset,edit,removeDocument} =props


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
                        <div className={ styles.theadTitleID  }>id</div>
                        </th>
                    <th className='w-1/4 h-16 items-center '>
                        <div className={styles.theadTitleImg }>Image</div>
                        </th>
                        <th className='w-1/4 h-16 items-center '>
                        <div className={styles.theadTitleName}>Name</div>
                        </th>
                        <th className='w-1/4 h-16 items-center '>
                        <div className={styles.theadTitleSlug}>Slug</div>
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
                    <td className={styles.tablename}>{item.name}</td>
                    <td >
                        <div className={styles.tableSlug}>
                        <p>{item.description}</p>
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
