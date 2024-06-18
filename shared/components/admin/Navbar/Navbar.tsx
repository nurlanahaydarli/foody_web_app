import styles from './navbar.module.css';
import { useRouter } from "next/router";
import CustomButton from "../Button";
import Form from "../Form/Form";
import { useModalOpen } from "../../../hooks/UseModalOpen";
import ChangeLanguage from "../../Language/ChangeLanguage";
import MenuSvg from '../svg/MenuSvg';
import { useDispatch } from "react-redux";
import { openSidebar } from "../../../redux/featuries/sidebar/sidebarSlice";
import { AppDispatch } from "../../../redux/store";
import uploadFile from "../../../utils/uploadFile";
import { PostProduct, getRestaurants } from "../../../services";
import { useEffect, useState } from 'react';
import { RestaurantPostDataType } from '../../../interfaces';
import Select from '../Form/Select';
import { AxiosResponse } from "axios";
import { useToast } from '@chakra-ui/react';
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import Input from '../Form/Input';

interface FormValues {
    name: string;
    description: string;
    price: string;
    rest_id: string;
}

export default function Navbar() {
    const { push } = useRouter();
    const { isOpen, onOpen, onClose } = useModalOpen();
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [Img, setImg] = useState<any>('');
    const [restaurants, setRestaurants] = useState<RestaurantPostDataType[]>([]);
    let [products, setProducts] = useState<any[]>([]);
    const toast = useToast();

    console.log("img",Img);
    

    useEffect(() => {
        (async () => {
            try {
                const response = await getRestaurants();
                const newRestaurants: RestaurantPostDataType[] = response?.data.result.data;
                setRestaurants(newRestaurants);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const formik: FormikProps<FormValues> = useFormik<FormValues>({
        initialValues: {
            name: '',
            description: '',
            price: '',
            rest_id: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Title must be at least 3 characters').required('Required'),
            description: Yup.string().required('Required'),
            price: Yup.number().required('Required').positive('Price must be positive'),
            rest_id: Yup.string().required('Required')
        }),
        onSubmit: async (values: FormValues) => {
            setIsLoading(true);

            let newProduct:{name:any,price:any,rest_id:any| undefined, description:any,img_url?:AxiosResponse<string|null>}  = {
                name: values.name,
                description: values.description,
                price: values.price,
                rest_id: values.rest_id,
                img_url: Img
            };

            try {
                const res = await uploadFile({
                    file: Img,
                    collectionId: "products",
                    documentId: "products"
                }) as AxiosResponse<string | null>;
                
                newProduct.img_url = res;
                
                setProducts(prevProducts => [...prevProducts, { ...newProduct, id: Date.now() }]);

                            let createdProduct = await PostProduct(newProduct);
                            setProducts(prevProducts => prevProducts.map(product =>
                                product.name === newProduct.name ? createdProduct.data : product
                            ));
                toast({
                    title: 'Product successfully added',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });

                onClose();
                setImg('');
                formik.resetForm();
            } catch (err) {
                toast({
                    title: `An error occurred while adding the product: ${err}`,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                    position: 'top-right',
                    variant: 'subtle'
                });

                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    });

    function handleOpenSidebar() {
        dispatch(openSidebar({}));
    }

    return (
        <>
            <div className={styles.navbar_box}>
                <div className='flex items-center gap-3'>
                    <button onClick={handleOpenSidebar} className={styles.menu_btn}><MenuSvg /></button>
                    <div className={`${styles.logo_box} flex`}>
                        <button onClick={() => push('/admin/')}>
                            <img src={'/imgs/logo.png'} alt={'logo'} />
                        </button>
                    </div>
                </div>
                <div className={styles.navbar_right}>
                    <CustomButton icon={true} title={'Add product'} size={'sm'} color={'1'} type={'button'} onAction={onOpen} loading={isLoading} />
                    <ChangeLanguage />
                    <div className={styles.admin_box}>
                        <img src="/imgs/avatar.png" alt="" />
                        <span>Admin</span>
                    </div>
                </div>
            </div>
            <Form 
                isOpen={isOpen} 
                title={'Add Product'} 
                subtitle={"Add your Product description and necessary information"} 
                onClose={onClose}
                onAction={formik.handleSubmit} 
                setIMG={setImg} 
                loading={isLoading}
            >
                <input
                   
                    title={"Name"} 
                    type={"text"} 
                    name={"name"} 
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.name && formik.errors.name ?  "error input" : ''}
                />
                <input
                   
                    title={"Description"} 
                    type={"text"} 
                    name={"description"} 
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.description && formik.errors.description ?  "error input"  : ''}
                />
                <input 
                
                    title={"Price"} 
                    type={"number"} 
                    name={"price"} 
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.price && formik.errors.price ?  "error input"  : ''}
                />
                <select
                    title={"Restaurants"} 
                    name={"rest_id"} 
                  
                    value={formik.values.rest_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.touched.rest_id && formik.errors.rest_id ? "error input" : ''}
                    >
                       {restaurants.map((restaurants) => (
                        <option value={restaurants.id}>{restaurants.name}</option>
                       ) )}
                    </select>
            </Form>
        </>
    );
}
