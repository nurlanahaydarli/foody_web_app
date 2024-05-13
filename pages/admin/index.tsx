import type {NextPage} from "next";
import dynamic from "next/dynamic";
import ChartCard from "../../shared/components/admin/ChartCard/ChartCard";


const AdminLayout = dynamic(() => import("../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});


const AdminDashboard: NextPage = () => {
    return (
        <AdminLayout>

        </AdminLayout>

    );
};

export default AdminDashboard;
