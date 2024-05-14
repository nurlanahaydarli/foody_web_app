import type { NextPage } from "next";
import dynamic from "next/dynamic";
import {useTranslation} from "next-i18next";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const MainLayout = dynamic(() => import("../shared/components/admin/Layout/MainLayout"), {
    ssr: true,
});

const Home: NextPage = () => {
    const { t } = useTranslation('common')
  return (
    <>
     <MainLayout>
        <h1>{t("sign_in")}</h1>
        <h1>{t("test")}</h1>
     </MainLayout>
    </>
  );
};

export default Home;
type Props={

}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'az', [
            'common'
        ])),
    },
})
