import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MantineProvider } from '@mantine/core';

import { Layout } from '../components/Layout/Layout';

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </MantineProvider>
  );
}
export default MyApp;
