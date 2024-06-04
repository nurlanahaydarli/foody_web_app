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
import InfoBox from "../shared/components/Client/adminInfoBox";
import InfoSection from "../shared/components/Client/infoSection";

import BoucherIcon from '../public/Boucher.svg'
import soupIcon from '../public/soup.svg'
import deliveryIcon from '../public/delivery.svg'
import INFoBox from "../shared/components/Client/InfoBox";
import ComboIcon from '../public/combo.svg'
import PIZZaIcon from '../public/BIGPIZZA.svg'
import FryIcon from '../public/Fry.svg'
import MiniBurgerIcon from '../public/MiniBurger.svg'
import MiniPizzaIcon from '../public/MiniPizza.svg'
import FooterTop from "../shared/components/Client/FooterTop";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shared/redux/store";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
// import { getProductServer, getProducts } from "../shared/services";

const MainLayout = dynamic(() => import("../shared/components/admin/Layout/MainLayout"), {
    ssr: true,
});


const Home: NextPage = (Props) => {
    
    let {repo}:any=Props
    
        let [mobile,setmobile]=useState(false)
        const user = useSelector((state: RootState) => state.user);
        useEffect(()=>{
            if(window.innerWidth<800){
                setmobile(true)
            }else{
                setmobile(false)
            }
          
            
            
        },[mobile])
    let {headerBuutom,ButtomTitle,buttomDesc,Registerbtn,Orderbtn,hamIcon,iconDiv,bgdiv,Textdiv,}=style
    const { t } = useTranslation('common')
    let ruter =useRouter()
    
  return (
    <>
     <MainLayout>
        <div className={headerBuutom}>
            <div className={ Textdiv}>
                <h1 className={ButtomTitle +' flex flex-wrap'}>Our Food site makes it easy to find local food</h1>
                <p className={buttomDesc+ ' w-4/5 flex flex-wrap mt-2'}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                <div className={mobile?'flex flex-col mt-10 gap-4 justify-center items-center':"flex flex-row  w-4/5 gap-10 mt-10 mb"}>
                    <button onClick={()=>ruter.push('login-register')} style={user.id.length>0?{display:"none"}:{display:"block"}} className={Registerbtn}>Register </button>
                    <button className={Orderbtn} onClick={()=>{
                        
                        ruter.push('restaurants')
                        
                    }}>Order now </button>
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
                    
                    {mobile?'':<AnimetedBox img={PizzaIcon} title="Pizza Hut " class="  top-3/4 right-16"/>}
            </div>
           
            
        </div>
        <InfoSection data={repo} TITLE="Features" DES="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>
        <INFoBox row={true} img={ComboIcon} title="Menu That Always Make You Fall In Love" desc="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." w={636} h={441}/>
        <INFoBox row={false} img={PIZZaIcon} title="Yummy Always Papa John’s Pizza.Agree?" desc="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."  w={498} h={472}/>
        <INFoBox row={true} img={FryIcon} title="Do You Like French Fries? Mmm..." desc="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."  w={667} h={462}/>
        
        
        <InfoSection data={repo} TITLE="Our Popular Update New Foods" DES="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>
        
        <FooterTop/>
     </MainLayout>
    </>
  );
};

export default Home;
type Props={

}
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

 
type Repo = {
  
}
 
// export const getServerSideProps = (async ({locale}) => {
//   // Fetch data from external API
//   const res = await fetch('http://localhost:3000/api/products')
//   let newrepo=await res.json()
//   const repo: Repo = newrepo.result.data
//   // Pass data to the page via props
//   return { props: { repo, ...(await serverSideTranslations(locale ?? 'az', ['common' ])), } }
// }) satisfies GetServerSideProps<{  repo: Repo, }>
export const getServerSideProps = async ({ locale }: { locale: string }) => {
    // Fetch data from external API
    try {
        const res = await fetch('http://localhost:3000/api/products');
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const newrepo = await res.json();
        const repo: Repo = newrepo.result.data; // Assuming nested structure
        // Pass data to the page via props
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
// export default function Page({
//   repo,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <main>
//       <p>{repo.stargazers_count}</p>
//     </main>
//   )
// }