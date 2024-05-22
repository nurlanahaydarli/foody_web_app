// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import { useEffect } from 'react';
import { wrapper } from '../shared/redux/store';

type Props = {
  // Add custom props here
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      // Global settings for AOS
    });
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp));
