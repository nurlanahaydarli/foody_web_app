import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

type Props={}

export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'az', [
            'common',
        ])),
    },
})