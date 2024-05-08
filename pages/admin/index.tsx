import type {NextPage} from "next";
import dynamic from "next/dynamic";


const AdminLayout = dynamic(() => import("../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});


const AdminDashboard: NextPage = () => {
    return (
        <AdminLayout>
            <h1 style={{color:"white"}}>Restaurants</h1>
        </AdminLayout>

    );
};

export default AdminDashboard;
