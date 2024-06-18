import React from "react";
import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import Image from "next/image";
import howitworkicon from "../../public/howitworks.svg";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

function HowItWorks() {
    const { t } = useTranslation("common");
    return (
        <>
            <MainLayout>
                <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                    <div data-aos="fade-down" >
                        <h1 className="text-4xl font-bold mb-4 mt-8">{t("How it works")}</h1>
                    <p className="mb-6 max-w-4xl mx-auto text-lg text-fontcolorhow">
                        {t("Delivery may be extended during sale periods. Please refer to the checkout page for an updated estimate for your location. Kindly note that once you have placed an order, it is no longer possible to modify your order. Taxes and duties are included in all product prices. It is possible to place an order with shipment to a different address than your home or billing address when paying with a credit card. Please note that Klarna payments require that your order is shipped to your registered home address.")}
                    </p>
                    </div>
                  
                    <Image data-aos="fade-up" src={howitworkicon} alt="How it works" className="mx-auto"/>
                    <div data-aos="zoom-in" data-aos-delay="300" style={{display: 'none'}}>
              
            </div>
                </div>
            </MainLayout>
        </>
    );
}

export default HowItWorks;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
    },
});
