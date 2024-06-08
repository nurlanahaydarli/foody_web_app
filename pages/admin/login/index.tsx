import Input from "../../../shared/components/admin/Form/Input";
import styles from '../../../shared/components/admin/Layout/adminLayout.module.css'
import type { GetStaticProps } from 'next'
import { useTranslation, Trans } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ChangeLanguage from "../../../shared/components/Language/ChangeLanguage";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../../server/configs/firebase';
import { useRouter } from "next/router";
import {useLayoutEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';

import {useToast} from "@chakra-ui/react";
interface SignInFormValues {
  email: string;
  password: string;
}
export default function Login() {
    const { t } = useTranslation('common');
    const toast = useToast()
    const router= useRouter()
    useLayoutEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            router.replace('/admin');
          }
        });

        return () => unsubscribe();
      }, [router]);

    const formik = useFormik<SignInFormValues>({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
        if (values.email === 'foody_admin@gmail.com' && values.password === '123456'){
            try {
                await signInWithEmailAndPassword(auth, values.email, values.password);
                router.push("/admin")
                toast({
                    title: `Signin successfully!`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position:'top-right',
                    variant:'subtle'
                })
              } catch (error) {
                setErrors({ email: 'Failed to sign in' });
                toast({
                    title: `Please, Enter Correct Email or Password!`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position:'top-right',
                    variant:'subtle'
                })
              } finally {
                setSubmitting(false);
              }
            }else{
                setErrors({ email: 'Failed to sign in', password: "Failed to sign in"});
            }
        }
      });

    return (
        <>

            <section className={`${styles.login_section} ${styles.main_container}`}>
                <div className={styles.logo_box}>
                    <img src="/imgs/logo.png" alt=""/>
                </div>
                <div className={styles.form_box}>
                    <div className={styles.left_side}>
                        <h1>{t("Welcome Admin")}</h1>
                        <form action="" onSubmit={formik.handleSubmit}>
                            <input  
                            {...formik.getFieldProps('email')}
                            className={formik.touched.email && formik.errors.email ? styles.err:''}
                            type={'email'}    />
                            <input 
                             type={'password'} 
                             {...formik.getFieldProps('password')}
                             className={formik.touched.password && formik.errors.password ? styles.err:''}
                                />
                            
                            <button type='submit' className={styles.login} disabled={formik.isSubmitting} >{t("Login")}</button>
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
type  Props={

}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'az', [
            'common',
        ])),
    },
})