// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import { useEffect } from 'react';
import { wrapper } from '../shared/redux/store';
import {QueryClient,QueryClientProvider} from "react-query";

type Props = {
  // Add custom props here
}
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      // Global settings for AOS
    });
  }, []);

  return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
  );
}

export default wrapper.withRedux(appWithTranslation(MyApp));
