import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("../../../shared/components/admin/Layout/AdminLayout"), {
    ssr: false,
});

export default function Products() {
    return (
        <>
            <AdminLayout>
            <h1 className="text-3xl font-bold underline text-white">
                Hello world!
                </h1>
            </AdminLayout>
        </>
    );
}
//
// export default function Products(){
//
// }