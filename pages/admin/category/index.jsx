import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import dynamic from "next/dynamic";
import AdminHedetbuttom from '../../../shared/components/admin/AdminHeaderButtom'
import AdminTable from '../../../shared/components/admin/AdminTable'
const AdminLayout = dynamic(() => import("../../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});

export default function Category() {
    return (
        <>
            <AdminLayout>
                <div >
                    <AdminHedetbuttom typeButton={false}  addButton={true} addButtonFun={()=>console.log("add")} addTitle='ADD CATEGORY ' Title={'CATEGORY '}/>
                    <AdminTable/>
                </div>
            </AdminLayout>
        </>
    );
}