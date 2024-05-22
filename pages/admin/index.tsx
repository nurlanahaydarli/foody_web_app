import type {NextPage} from "next";
import dynamic from "next/dynamic";
import withAuth from "../../shared/HOC/withAuth";


const AdminLayout = dynamic(() => import("../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});
const DonutChart = dynamic(() => import("../../shared/components/admin/ChartCard/DonutChart"), {
    ssr: false,
});
const AreaChart = dynamic(() => import("../../shared/components/admin/ChartCard/AreaChart"), {
    ssr: false,
});
const BarChart = dynamic(() => import("../../shared/components/admin/ChartCard/BarChart"), {
    ssr: false,
});

const AdminDashboard: NextPage = () => {
    return (
        <AdminLayout>
            <div className="flex justify-between md:flex-row flex-wrap flex-col">
                <div className="md:w-2/5 ">
                    <DonutChart />
                </div>
                <div className="md:w-3/5">
                    <AreaChart />
                </div>
                <div className="md:w-3/5 ">
                    <BarChart />
                </div>
            </div>
        </AdminLayout>

    );
};

export default withAuth(AdminDashboard);
