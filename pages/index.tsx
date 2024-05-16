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


const MainLayout = dynamic(() => import("../shared/components/admin/Layout/MainLayout"), {
    ssr: true,
});

const Home: NextPage = () => {


    let {headerBuutom,ButtomTitle,buttomDesc,Registerbtn,Orderbtn,hamIcon,iconDiv,bgdiv,Textdiv,}=style
    const { t } = useTranslation('common')
    let ruter =useRouter()
    
  return (
    <>
     <MainLayout>
        <div className={headerBuutom}>
            <div className={"   pl-16 "+Textdiv}>
                <h1 className={ButtomTitle +' flex flex-wrap'}>Our Food site makes it easy to find local food</h1>
                <p className={buttomDesc+ ' w-4/5 flex flex-wrap mt-2'}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                <div className="flex flex-row  w-4/5 gap-10 mt-10 mb">
                    <button onClick={()=>ruter.push('login-register')} className={Registerbtn}>Register </button>
                    <button className={Orderbtn}>Order now </button>
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
                    <AnimetedBox img={PizzaIcon} title="Pizza Hut " class=" top-14 right-6"/>
                    <AnimetedBox img={PizzaIcon} title="Pizza Hut " class=" top-2/4   -left-28"/>
                    <AnimetedBox img={PizzaIcon} title="Pizza Hut " class="  top-3/4 right-16"/>
            </div>
           
            
        </div>
        <InfoSection img1={BoucherIcon} img2={soupIcon} img3={deliveryIcon} title1='Discount Boucher' title2='Fresh healthy Food' title3='Fast Home Delivery' TITLE="Features" DES="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>
        <INFoBox row={true} img={ComboIcon} title="Menu That Always Make You Fall In Love" desc="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups." w={636} h={441}/>
        <INFoBox row={false} img={PIZZaIcon} title="Yummy Always Papa John’s Pizza.Agree?" desc="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."  w={498} h={472}/>
        <INFoBox row={true} img={FryIcon} title="Do You Like French Fries? Mmm..." desc="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."  w={667} h={462}/>
        
        
        <InfoSection img1={MiniBurgerIcon} img2={MiniPizzaIcon} img3={ComboIcon} title1='Dubble Chees' title2='Margarita' title3='Twister Menu' TITLE="Our Popular Update New Foods" DES="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."/>
        
        <FooterTop/>
     </MainLayout>
    </>
  );
};

export default Home;
type Props={

}
export const getStaticProps: GetStaticProps<Props> = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'az', [
            'common'
        ])),
    },
})
