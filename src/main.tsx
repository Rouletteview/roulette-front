import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouletteViewApp from './RouletteViewApp.tsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <RouletteViewApp/>
    </BrowserRouter>
  </StrictMode>,
)
