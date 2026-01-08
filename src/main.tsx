import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error boundary for production debugging
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('❌ Root element not found!')
  document.body.innerHTML = '<div style="color: white; padding: 20px; font-family: monospace;">Error: Root element not found. Check console for details.</div>'
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('✅ App mounted successfully')
  } catch (error) {
    console.error('❌ Error mounting app:', error)
    document.body.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace;">Error mounting app: ${error}</div>`
  }
}

// Log environment variables (without exposing sensitive data)
console.log('🔧 Environment Check:', {
  hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
  hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD
})
