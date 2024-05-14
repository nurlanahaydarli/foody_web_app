import Input from "../../../shared/components/admin/Form/Input";
import styles from '../../../shared/components/admin/Layout/adminLayout.module.css'
import type { GetStaticProps } from 'next'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ChangeLanguage from "../../../shared/components/Language/ChangeLanguage";
export default function Login() {
    const { t } = useTranslation('common')
    return (
        <>

            <section className={`${styles.login_section} ${styles.main_container}`}>
                <div className={styles.logo_box}>
                    <img src="/imgs/logo.png" alt=""/>
                </div>
                <div className={styles.form_box}>
                    <div className={styles.left_side}>
                        <h1>{t("Welcome Admin")}</h1>
                        <form action="">
                            <Input title={'username'} input_name={'username'} type={'text'}  hasLabel={false} />
                            <Input title={'password'} input_name={'password'} type={'password'}  hasLabel={false} />
                            <button type='button' >{t("Login")}</button>
                        </form>
                    </div>
                    <div className={styles.right_side}>
                        <div className={styles.img_box}>
                            <img src="/imgs/login.png" alt=""/>
                        </div>
                        <div className={styles.lang_box}>
                            <ChangeLanguage />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'az', [
            'common',
        ])),
    },
})