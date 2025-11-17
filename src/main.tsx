import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import  './i18.ts'
import './index.css'
import 'intl-pluralrules'

import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
