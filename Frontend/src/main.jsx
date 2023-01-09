import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { DigiTalkProvider } from './context/DigitalkContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DigiTalkProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
  </DigiTalkProvider>
)
