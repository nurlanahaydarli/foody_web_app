import styles from './navbar.module.css'
import {useRouter} from "next/router";
import CustomButton from "../Button";
import Form from "../Form/Form";
import {useModalOpen} from "../../../hooks/UseModalOpen";
import Input from "../Form/Input";
import ChangeLanguage from "../../Language/ChangeLanguage";
import MenuSvg from '../svg/MenuSvg';
import {useDispatch, useSelector} from "react-redux";
import {openSidebar} from "../../../redux/featuries/sidebar/sidebarSlice";
import {AppDispatch, RootState} from "../../../redux/store";
import uploadFile from "../../../utils/uploadFile";
import {PostProduct} from "../../../services";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import * as Yup from "yup";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../../server/configs/firebase";

interface SignInFormValues {
    email: string;
    password: string;
}
export default function Navbar() {
    let {push} = useRouter();
    const {isOpen,onOpen,onClose} = useModalOpen()
    let  dispatch: AppDispatch = useDispatch()
    function handleOpenSidebar(){
        dispatch(openSidebar())
    }
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
                try {
                    let res = await uploadFile({
                        file: Img,
                        collectionId: "products",
                        documentId: "products"
                    }) as string
                    values.img_url = res;
                    await PostProduct(values);
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
        }
    })
    // async function addProduct() {
    //     let Title = inpTitle?.current?.value
    //
    //
    //     Title?.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('')
    //
    //     let newProduct = {
    //         "name": Title,
    //         "img_url": ''
    //     }
    //     try {
    //         let res = await uploadFile({
    //             file: Img,
    //             collectionId: "products",
    //             documentId: "products"
    //         }) as string
    //         newProduct.img_url = res;
    //         setProducts(prevProducts => [...prevProducts, {...newProduct, id: Date.now()}]);
    //         let createdProduct = await PostProduct(newProduct);
    //         setProducts(prevCategories => prevCategories.map(product =>
    //             product.name === newProduct.name ? createdProduct.data : product
    //         ));
    //         toast.success("Product successfully added", {
    //             position: "top-right",
    //         });
    //         inpTitle?.current?.value == ''
    //         onClose()
    //         setImg('')
    //     } catch (err) {
    //         toast.error("An error occurred while adding the product", {
    //             position: "top-right",
    //         });
    //         console.log(err);
    //     }
    //
    // }
    return (
        <>

            <div className={styles.navbar_box}>
                <div className='flex items-center gap-3'>
                    <button onClick={handleOpenSidebar} className={styles.menu_btn}> <MenuSvg /></button>
                    <div className={`${styles.logo_box} flex`}>
                        <button onClick={() => push('/admin/')}>
                            <img src={'/imgs/logo.png'} alt={'logo'}/>
                        </button>
                    </div>
                </div>
                <div className={styles.navbar_right}>
                    <CustomButton icon={true} title={'Add product'} size={'sm'} color={'1'} type={'button'} onAction={onOpen} />
                    <ChangeLanguage/>
                    <div className={styles.admin_box}>
                        <img src="/imgs/avatar.png" alt=""/>
                        <span>Admin</span>
                    </div>
                </div>
            </div>
            <Form  isOpen={isOpen} title={'Add Product'} subtitle={"Add your Product description and necessary information"}  onClose={onClose}>
                <Input title={'Name'} type={'text'} input_name={'product_name'}/>
                <Input title={'Price'} type={'number'} input_name={'product_price'}/>
                <Input title={'Price'} type={'number'} input_name={'product_price'}/>
            </Form>
        </>
    );
}
