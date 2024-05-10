import React from 'react';
import AdminLayout from '../../../../shared/components/admin/Layout/AdminLayout';
import AdminHedetbuttom from '../../../../shared/components/admin/AdminHeaderButtom';
import OrdersTable from '../../../../shared/components/admin/OrdersTable';

function index() {
    return (
        <AdminLayout>
        <AdminHedetbuttom addButton={false} typeButton={false} Title={"History"}/>
        <OrdersTable/>
    </AdminLayout>
    );
}

export default index;