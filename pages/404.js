import Image from "next/image";
import MainLayout from "../shared/components/admin/Layout/MainLayout";

export default function Custom404() {
    return (
        <>
            <MainLayout>
                <div className="not_found_box">
                    <img src="/imgs/404.png" alt="404 not found"/>
                </div>
            </MainLayout>
        </>
    )
}