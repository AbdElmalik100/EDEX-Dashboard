import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import AppRouter from './router/index.jsx'
import { Toaster } from 'sonner'
import { Buffer } from 'buffer'

// Polyfill for Buffer
window.Buffer = Buffer

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
      <Toaster richColors closeButton />
    </BrowserRouter>
  </StrictMode>,
)
