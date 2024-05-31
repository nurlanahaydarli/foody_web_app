import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import Adminresturant from "../../../shared/components/admin/AdminRestorant"

export default function Restaurants() {
    return (
        <>
            <AdminLayout>
                
                <Adminresturant />
                
            </AdminLayout>
        </>
    );
}