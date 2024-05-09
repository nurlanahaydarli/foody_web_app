import Image from 'next/image';
import React from 'react';
import editicon from '../../../../public/editPen.svg'
import deliteicon from '../../../../public/delete.svg'
import pizza from '../../../../public/pizza.svg'
import styles from '../AdminTable/Admin.module.css'

function AdminTable() {
    return (
        <div className={styles.table}>
            <table className={styles.tablebg}  >
                <thead>
                    <tr className={styles.tabletr}>
                    <th className='w-1/4 h-16 items-center '>
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
                <tr className={styles.tabletr+'h-12 '}>
                    <td className=' items-center justify-center'>
                        <div className={styles.tableid}>1</div>
                        </td>
                    <td>
                    <div className='w-12 h-10'>
                    <Image 
                    className={styles.tableImg}
                    src={pizza}
                    width={40}
                    height={40}
                    alt='pizza'
                    />
                    </div>
                    
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
                    <tr className={styles.tabletr+'h-12 '}>
                    <td className=' items-center justify-center'>
                        <div className={styles.tableid}>1</div>
                        </td>
                    <td>
                    <div className='w-12 h-10'>
                    <Image 
                    className={styles.tableImg}
                    src={pizza}
                    width={40}
                    height={40}
                    alt='pizza'
                    />
                    </div>
                    
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