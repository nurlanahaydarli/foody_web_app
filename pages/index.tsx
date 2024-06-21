import type { NextPage } from "next";
import dynamic from "next/dynamic";
import {useTranslation} from "next-i18next";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import style from '../styles/Home.module.css'
import HamburerIcon from '../public/HAMBURGER.svg'
import PizzaIcon from '../public/Main-Pizza.svg'
import Image from "next/image";
import AnimetedBox from "../shared/components/Client/MainAnimetedBox";
import { useRouter } from "next/router";

import InfoSection from "../shared/components/Client/infoSection";

import INFoBox from "../shared/components/Client/InfoBox";

import FooterTop from "../shared/components/Client/FooterTop";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../shared/redux/store";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {setUser} from "../shared/redux/featuries/user/userSılice";
// import { getProductServer, getProducts } from "../shared/services";

const MainLayout = dynamic(() => import("../shared/components/admin/Layout/MainLayout"), {
    ssr: true,
});


const Home: NextPage = (Props) => {

    let {repo}:any=Props

    let [mobile,setmobile]=useState(false)
    // const user = useSelector((state: RootState) => state.user);
    // let user = localStorage.getItem("user_info");
    let user =typeof window !== 'undefined' ? window.localStorage.getItem('user_info') : null
    useEffect(()=>{
        if(window.innerWidth<800){
            setmobile(true)
        }else{
            setmobile(false)
        }
    },[mobile,user])

    let {headerBuutom,ButtomTitle,buttomDesc,Registerbtn,Orderbtn,hamIcon,iconDiv,bgdiv,Textdiv,}=style
    const { t } = useTranslation('common')
    let ruter =useRouter()
    let Offer=repo.Offer.slice(-3)

    return (
        <>
            <MainLayout>
                <div className={headerBuutom}>
                    <div className={ Textdiv}>
                        <h1 className={ButtomTitle +' flex flex-wrap'}>{t("Our Food site makes it easy to find local food")}</h1>
                        <p className={buttomDesc+ ' w-4/5 flex flex-wrap mt-2'}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                        <div className={mobile?'flex flex-col mt-10 gap-4 justify-center items-center':"flex flex-row  w-4/5 gap-10 mt-10 mb"}>
                            <button onClick={()=>ruter.push('login-register')} style={!user ? {display:"block"}:{display:"none"}} className={Registerbtn}>{t("Register")} </button>
                            <button className={Orderbtn} onClick={()=>{

                                ruter.push('restaurants')

                            }}>{t("Order now")} </button>
                        </div>
                    </div>
                    <div className={" relative flex justify-center items-center p-14 "+iconDiv}>
                        <div className={" bg-black rounded-3xl   "+ bgdiv}>

                        </div>
                        <Image
                            src={HamburerIcon}
                            alt="HamburerIcon"
                            width={657}
                            className={hamIcon}
                        />
                        {mobile?'':<AnimetedBox img={PizzaIcon} title="Pizza Hut " class=" top-2/4   -left-28"/>}
                        {mobile?'':<AnimetedBox img={PizzaIcon} title="Pizza Hut " class=" top-14 right-6"/>}
                        {mobile?<AnimetedBox img={PizzaIcon} title="Pizza Hut " class="  top-3/4 left-2/4"/>:""}

                        {mobile?'':<AnimetedBox img={PizzaIcon} title="Pizza Hut " class="  top-3/4 right-16"/>}
                    </div>


                </div>
                <InfoSection data={repo.Restaurant} TITLE={`${t("Popular")} ${t("Restaurants")}`} DES="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>
                {Offer.map((item:any,i:number)=>(
                    <INFoBox row={i%2===1} img={item.img_url} title={item.name} desc={item.description} w={636} h={441}/>
                ))}


                <InfoSection data={repo.Products} TITLE={t("Our Popular Update New Foods")} DES="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>

                <FooterTop/>
            </MainLayout>
        </>
    );
};

export default Home;

// export const  getStaticProps: GetStaticProps<Props> = async ({locale}) => {

// try{
//     let Produts:any= await getProductServer()

//     console.log(Produts);

// }catch(err){
//     console.log(err);

// }


// return({
//     props: {
//         // ProductsRES:res,
// ...(await serverSideTranslations(locale ?? 'az', ['common' ])),
//     },
// })}





export const getServerSideProps = async ({ locale }: { locale: string }) => {
    // Fetch data from external API
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log('ddd',apiUrl);
        const ProductRes = await fetch(`${apiUrl}/products`);
        if (!ProductRes.ok) {
            throw new Error(`Failed to fetch products: ${ProductRes.statusText}`);
        }
        const RestaurantRES = await fetch(`${apiUrl}/restuarants`);
        if (!RestaurantRES.ok) {
            throw new Error(`Failed to fetch products: ${ProductRes.statusText}`);
        }
        const OfferRES = await fetch(`${apiUrl}/offer`);
        if (!OfferRES.ok) {
            throw new Error(`Failed to fetch products: ${ProductRes.statusText}`);
        }
        const newProducts = await ProductRes.json();
        const newRestaurant = await RestaurantRES.json();
        const newOffer = await OfferRES.json();
        const repo: any = {
            Products:newProducts.result.data,
            Restaurant:newRestaurant.result.data,
            Offer:newOffer.result.data
        }

        return {
            props: {
                repo,
                ...(await serverSideTranslations(locale ?? 'az', ['common'])),
            },
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        // You can optionally return an empty object or redirect to an error page here
        return { props: {} };
    }
};