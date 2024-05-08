import React from 'react';
import AdminHedetbuttom from '../../../companents/AdminHeaderButtom';
import Image from 'next/image';
import AdminTable from '../../../companents/AdminTable';
function AdminCategory() {
    return (
        <div className='adminBg w-full h-full'>
            <header className=' w-full h-16  adminHeaderbg'> header</header>
            <div className='flex flex-row '>
            <aside className='w-1/5 adminAsidebg  h-96 '> aside</aside>
            <div className='w-4/5'>
            <AdminHedetbuttom typeButton={false} addButton={true} addButtonFun={()=>console.log("add")} addTitle='ADD CATEGORY '/>
            <AdminTable/>
            </div>
        
            </div>
            
        </div>
    );
}

export default AdminCategory;