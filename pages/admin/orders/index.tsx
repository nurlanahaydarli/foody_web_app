import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import OrdersTable from "../../../shared/components/admin/OrdersTable";

export default function Orders() {
    return (
        <>
            <AdminLayout>
                <AdminHedetbuttom addButton={false} typeButton={false} Title={"Orders"}/>
                <OrdersTable/>
            </AdminLayout>
        </>
    );
}