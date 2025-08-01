import './index.css'
import * as Sentry from '@sentry/react'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { env } from './utils/env.config.ts'

const { 
  frontend: { VITE_SENTRY_DSN } 
} = env

console.log(`App version: ${__APP_VERSION__}`)
if (__IS_STAGING__) {
  console.log('Running in staging mode')
}

Sentry.init({
  dsn: VITE_SENTRY_DSN,
  sendDefaultPii: false,
  environment: __IS_STAGING__ ? 'staging' : 'production',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
