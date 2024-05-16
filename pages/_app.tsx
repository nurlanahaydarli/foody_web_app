import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import { appWithTranslation } from 'next-i18next'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import { useEffect } from 'react';
// import {GetStaticProps} from "next";
// import {serverSideTranslations} from "next-i18next/serverSideTranslations";

// import Home from "../pages/home"

type Props = {
    // Add custom props here
}

function MyApp({Component, pageProps}: AppProps) {
    useEffect(() => {
        AOS.init({
          // Глобальные настройки для AOS
        });
      }, []);
    return (
        <>
            <ChakraProvider>
                    <Component {...pageProps} />
            </ChakraProvider>
        </>
    )
}



export default appWithTranslation(MyApp)

