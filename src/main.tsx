import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouletteViewApp from './RouletteViewApp.tsx'
import { BrowserRouter } from "react-router";
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <RouletteViewApp />
        <div className="hidden text-9xl text-[38px] bg-[#121418F2]">
        </div>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>

)
