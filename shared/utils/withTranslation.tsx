import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../next-i18next.config';

export function withTranslation<P>(PageComponent: NextPage<P>) {
    const WithTranslation: NextPage<P> = (props) => <PageComponent {...props} />;

    WithTranslation.getServerSideProps = async (context) => {
        const { locale } = context;
        const translations = await serverSideTranslations(
            locale || i18nextConfig.i18n.defaultLocale,
            ['common']
        );
        return {
            props: {
                ...translations,
            },
        };
    };

    return WithTranslation;
}
