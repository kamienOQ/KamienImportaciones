import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HelloWorldApp } from './filters/HelloWorldApp'
import './index.css'

// <App />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelloWorldApp></HelloWorldApp>
  </React.StrictMode>,
)
