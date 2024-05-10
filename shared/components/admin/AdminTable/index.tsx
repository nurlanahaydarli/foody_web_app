import Image from 'next/image';
import React from 'react';
import editicon from '../../../../public/editPen.svg'
import deliteicon from '../../../../public/delete.svg'
import pizza from '../../../../public/pizza.svg'
import styles from '../AdminTable/Admin.module.css'
interface PROPS {
    data? : any,
}
function AdminTable(props:PROPS) {
// let {data} =props
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
                <tr className={styles.tabletr}>
                    <td className={styles.tdid}>
                        <div className={styles.tableid}>1</div>
                        </td>
                    <td className='flex items-center'>
                    
                    <Image 
                    className={styles.tableImg}
                    src={pizza}
                    width={60}
                    height={60}
                    alt='pizza'
                    />
                    
                    
                    </td>
                    <td className={styles.tablename}>Pizza</td>
                    <td >
                        <div className={styles.tableSlug}>
                        <p>yummy-pizza</p>
                        <div className={styles.icons}>
                        <Image
                        src={editicon}
                        className={styles.mr}
                        width={24}
                        height={24}
                        alt='editicon'
                        />
                        <Image
                        src={deliteicon}
                        className={styles.mr}
                        width={14}
                        height={18}
                        alt='editicon'
                        />
                        </div>
                        
                        </div>
                        
                    </td>
                    </tr>
                    
                    
                    
                </tbody>
                </table>
        </div>
              
        
    );
}

export default AdminTable;