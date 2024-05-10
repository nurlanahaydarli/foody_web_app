import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import AdminHedetbuttom from "../../../shared/components/admin/AdminHeaderButtom";
import AdminTable from "../../../shared/components/admin/AdminTable";

export default function Offer() {
    return (
        <>
            <AdminLayout>
            <AdminHedetbuttom 
            typeButton={false}
            
            addButton={true}
            addTitle={"ADD OFFER"}
            Title={"Offers"}
            addButtonFun={()=>console.log("ADD OFFER")}/>
            <AdminTable/>
            </AdminLayout>
        </>
    );
}