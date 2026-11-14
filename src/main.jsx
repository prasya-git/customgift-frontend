import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { GiftProvider } from './context/GiftContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GiftProvider>
        <App />
      </GiftProvider>
    </BrowserRouter>
  </StrictMode>,
)
