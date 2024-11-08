import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Pages/@UserPages/shop/ContextAPI/CartContext.jsx'
import TokenAuth from './ContextAPI/TokenAuth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <TokenAuth>
    <BrowserRouter>
    <CartProvider>
    <App />
    </CartProvider>
    </BrowserRouter>
    </TokenAuth>
  </StrictMode>,
)
