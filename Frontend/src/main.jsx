import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";

import { DigiTalkProvider } from './context/DigitalkContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <DigiTalkProvider>
      <React.StrictMode>
        <BrowserRouter>
        <App/>
        </BrowserRouter>
      </React.StrictMode>,
  </DigiTalkProvider>
)
