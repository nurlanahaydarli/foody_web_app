import React from 'react';
import AdminHedetbuttom from '../../../companents/AdminHeaderButtom';

function AdminCategory() {
    return (
        <div className='adminBg w-full h-full'>
            <header className=' w-full h-16  adminHeaderbg'> header</header>
            <div className='flex flex-row '>
            <aside className='w-1/5 adminAsidebg  h-96 '> aside</aside>
            <AdminHedetbuttom typeButton={false} addButton={true} addButtonFun={()=>console.log("add")} addTitle='ADD CATEGORY '/>
            </div>
            
        </div>
    );
}

export default AdminCategory;