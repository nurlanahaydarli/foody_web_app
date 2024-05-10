import type { NextPage } from "next";
import dynamic from "next/dynamic";

const MainLayout = dynamic(() => import("../shared/components/admin/Layout/MainLayout"), {
    ssr: true,
});
const Home: NextPage = () => {

  return (
    <>
     <MainLayout>
        <h1>content</h1>
     </MainLayout>
    </>
  );
};

export default Home;
