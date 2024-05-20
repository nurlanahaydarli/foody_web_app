import type {NextPage} from "next";
import dynamic from "next/dynamic";
import ChartCard from "../../shared/components/admin/ChartCard/ChartCard";


const AdminLayout = dynamic(() => import("../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
}); 

const AdminDashboard: NextPage = () => {
    return (
        <AdminLayout>
            <div className="flex gap-5 md:flex-row flex-col">
                <div className="md:basis-2/5  basis-1">
                    {/* <ChartCard  /> */}
                </div>
                <div className="md:basis-3/5 basis-1">
                  
                </div>
            
            </div>
        </AdminLayout>

    );
};

export default AdminDashboard;
