import dynamic from "next/dynamic";
import AdminCard from "../../../shared/components/admin/adminCard";

const AdminLayout = dynamic(
  () => import("../../../shared/components/admin/Layout/AdminLayout"),
  {
    ssr: false,
  }
);

export default function Products() {
  return (
    <>
      <AdminLayout>
        <main className="flex">
          <section className="w-full">
            <div className="m-0 sm:m-5">
              {/* <AdminHedetbuttom
     
     
      visibleDropwdown={true}
    
    /> */}
            </div>

            <div className="w-full sm:w-auto m-5 flex flex-wrap gap-10 justify-center">
              <AdminCard />
            </div>
          </section>
        </main>
      </AdminLayout>
    </>
  );
}
//
// export default function Products(){
//
// }
