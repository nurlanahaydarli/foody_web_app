import Sidebar from "../../../shared/components/admin/Sidebar/Sidebar";
import AdminLayout from "../../../shared/components/admin/Layout/AdminLayout";
import Adminresturant from "../../../shared/components/admin/AdminRestorant"
import withAuth from "../../../shared/HOC/withAuth";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { useTranslation } from "next-i18next";

 function Restaurants() {
    const { t } = useTranslation("common");

    return (
        <>
            <AdminLayout>
                
                <Adminresturant />
                
            </AdminLayout>
        </>
    );
}
export default withAuth(Restaurants)


export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
  });
  