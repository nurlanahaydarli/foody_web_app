import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("../../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});

export default function Products() {
    return (
        <>
            <AdminLayout>
                <h1 style={{color:"blue"}}>Products</h1>
            </AdminLayout>
        </>
    );
}
//
// export default function Products(){
//
// }