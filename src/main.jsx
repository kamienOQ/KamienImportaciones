import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HelloWorldApp } from './filters/HelloWorldApp'
import { store } from './store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <HelloWorldApp />
    </Provider>
  </React.StrictMode>,
)