import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import Adminresturant from "../../../shared/components/admin/AdminRestorant"
import withAuth from "../../../shared/HOC/withAuth";

 function Restaurants() {
    return (
        <>
            <AdminLayout>
                
                <Adminresturant />
                
            </AdminLayout>
        </>
    );
}
export default withAuth(Restaurants)