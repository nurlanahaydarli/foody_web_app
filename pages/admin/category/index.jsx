import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("../../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});

export default function Category() {
    return (
        <>
            <AdminLayout>
                <h1 style={{color:"white"}}>Category</h1>
            </AdminLayout>
        </>
    );
}