import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { AuthProvider } from './components/AuthProvider'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
)