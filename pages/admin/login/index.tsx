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
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
interface SignInFormValues {
  email: string;
  password: string;
}
export default function Login() {
    const { t } = useTranslation('common');
    const router= useRouter()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            // Redirect to dashboard if user is already signed in
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
                toast.success("Signin successfully!", { autoClose: 1000,position:"top-right" });
              } catch (error) {
                setErrors({ email: 'Failed to sign in' });
                
                console.log(error,'error')
                toast.error("Please, Enter Correct Email and Password! ", {
                    autoClose: 1000,
                    position:'top-right'
                  });
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
                <ToastContainer />
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