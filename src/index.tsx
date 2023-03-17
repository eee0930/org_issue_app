import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './Router';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <div>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </RecoilRoot>
  </div>
);

