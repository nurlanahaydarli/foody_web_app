import styles from './navbar.module.css'
import { useRouter } from "next/router";
import CustomButton from "../Button";
import Form from "../Form/Form";
import { useModalOpen } from "../../../hooks/UseModalOpen";
import Input from "../Form/Input";
import ChangeLanguage from "../../Language/ChangeLanguage";
import MenuSvg from '../svg/MenuSvg';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import uploadFile from "../../../utils/uploadFile";
import { PostProduct, getRestaurants } from "../../../services";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from 'react';
import {RestaurantPostDataType } from '../../../interfaces';
import Select from '../Form/Select';
import {AxiosResponse} from "axios";

export default function Navbar() {
    let { push } = useRouter();
    const { isOpen, onOpen, onClose } = useModalOpen()
    let dispatch: AppDispatch = useDispatch()
    function handleOpenSidebar() {
        // dispatch(openSidebar())
    }
    const inpTitle = useRef<any>()
    const inpDesc = useRef<any>()
    const inpPrice = useRef<any>()
    const inpRest = useRef<any>()
    
   
    let [TitleYup, setTitleYup] = useState('')
    let [PriceYup, setPriceYup] = useState('');
    let [Img, setImg] = useState<any>('')
    let [products, setProducts] = useState<any[]>([]);
    let [DescValue, setDescValue] = useState('');
    let [Titlevalue, setTitlevalue] = useState('')
    let [PriceValue, setPriceValue] = useState('');
    let [restaurants, setRestaurants] = useState<RestaurantPostDataType[]>([])
    let [restaurantID, setRestaurantId] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                let restaurants = await getRestaurants()
                let new_res = await restaurants?.data.result.data
                console.log(new_res,'new_res')
                setRestaurants(new_res)
            } catch (err) {
                console.log(err);
            }
        })()
    }, [])
    function getRestaurantById(e:any) {
        setRestaurantId(e.currentTarget.value)

    }
    async function addProduct() {
        let Title = inpTitle?.current?.value
        let Desc = inpDesc?.current?.value
        let Price = inpPrice?.current?.value
        let Rest = inpRest?.current?.value
        Title?.length <= 3 ? setTitleYup('title have to be longer than 3 ') : setTitleYup('')
       
        let newProduct:{name:any,price:any,rest_id:any| undefined, description:any,img_url?:AxiosResponse<string|null>} = {
            name: Title,
            description: Desc,
            price: Price,
            rest_id: restaurantID,
        }
        try {
            let res = await uploadFile({
                file: Img,
                collectionId: "products",
                documentId: "products"
            }) as AxiosResponse<string|null>;
            newProduct.img_url = res;
            console.log(res, "res");

            console.log(newProduct, "newProduct");

            setProducts(prevProducts => [...prevProducts, { ...newProduct, id: Date.now() }]);

            let createdProduct = await PostProduct(newProduct);
            setProducts(prevProducts => prevProducts.map(product =>
                product.name === newProduct.name ? createdProduct.data : product
            ));

            toast.success("Product successfully added", {
                position: "top-right",
            });
            inpTitle?.current?.value == ''
            inpDesc?.current?.value == ''
            inpPrice?.current?.value == ''
            inpRest?.current?.value == ''
            onClose()
            setImg('')
        } catch (err) {
            toast.error("An error occurred while adding the product", {
                position: "top-right",
            });

            console.log(err);
        } 
    }
    return (
        <>

            <div className={styles.navbar_box}>
                <div className='flex items-center gap-3'>
                    <button onClick={handleOpenSidebar} className={styles.menu_btn}> <MenuSvg /></button>
                    <div className={`${styles.logo_box} flex`}>
                        <button onClick={() => push('/admin/')}>
                            <img src={'/imgs/logo.png'} alt={'logo'} />
                        </button>
                    </div>
                </div>
                <div className={styles.navbar_right}>
                    <CustomButton icon={true} title={'Add product'} size={'sm'} color={'1'} type={'button'} onAction={onOpen} />
                    <ChangeLanguage />
                    <div className={styles.admin_box}>
                        <img src="/imgs/avatar.png" alt="" />
                        <span>Admin</span>
                    </div>
                </div>
            </div>
            <Form isOpen={isOpen} title={'Add Product'} subtitle={"Add your Product description and necessary information"} onClose={onClose}
                onAction={addProduct} setIMG={setImg}
            >
                <Input hasLabel={true} title={"Name"} type={"text"} input_name={"name"} Ref={inpTitle}
                    value={Titlevalue} />
                <div className=" text-red-600">{TitleYup}</div>
                <Input hasLabel={true} title={"Description"} type={"text"} input_name={"description"} Ref={inpDesc}
                    value={DescValue} />
              
                <Input hasLabel={true} title={"Price"} type={"number"} input_name={"price"} Ref={inpPrice}
                    value={PriceValue} />
                <div className=" text-red-600">{PriceYup}</div>

                <Select title={"Restaurants"} name={"rest_id"} options={restaurants}  onChange={getRestaurantById} />
            </Form>
        </>
    );
}
// ----------------------