import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MantineProvider } from '@mantine/core';

export function ComponentTestWrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  );
}
