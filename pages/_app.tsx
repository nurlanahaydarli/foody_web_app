import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/react";
import { appWithTranslation } from 'next-i18next'
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Home from "../pages/home"

type Props = {
    // Add custom props here
}

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <ChakraProvider>
                    <Component {...pageProps} />
            </ChakraProvider>
        </>
    )
}



export default appWithTranslation(MyApp)

