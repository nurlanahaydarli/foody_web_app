

import React, { useState } from "react";


import MainLayout from "../../shared/components/admin/Layout/MainLayout";
import Modal1 from "../../shared/components/Client/tempFaqsModal1/index";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";



function Faq() {
  const [isContentVisible, setContentVisibility] = useState(false);
  const { t } = useTranslation("common");
  const toggleContent = () => {
    setContentVisibility(!isContentVisible);
  };

  let data = [
    {
      id: 1,
      title: "How to contact with Customer Service?",
      text: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact. Email and Chat. We try to reply quickly, so you need not to wait too long for a response!."
    },

    {
      id: 1,
      title: "App installation failed, how to update system information?",
      text: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact. Email and Chat. We try to reply quickly, so you need not to wait too long for a response!."

    },
    {
      id: 1,
      title: "Website reponse taking time, how to improve?",
      text: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact. Email and Chat. We try to reply quickly, so you need not to wait too long for a response!."
    },
    {
      id: 1,
      title: "How do I create a account?",
      text: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact. Email and Chat. We try to reply quickly, so you need not to wait too long for a response!."

    },
    {
      id: 1,
      title: "Website reponse taking time, how to improve?",
      text: "Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact. Email and Chat. We try to reply quickly, so you need not to wait too long for a response!."

    }

  ]
  return (
    <MainLayout>
      <main className="my-[60px] flex flex-col items-center gap-5 ">
        <h1 className=" text-5xl font-medium pb-5">{t("F.A.Q")}</h1>


        {data?.map((item :(any) ) => (

          <Modal1 key={item.id} {...item} />
        ))}
      </main>
    </MainLayout>
  );
}

export default Faq;


export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
      ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
