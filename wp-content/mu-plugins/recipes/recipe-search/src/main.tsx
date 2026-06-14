import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Recipes from './Recipes';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <Recipes />
      </NuqsAdapter>
    </QueryClientProvider>
  </StrictMode>,
)
