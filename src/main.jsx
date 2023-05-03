import React from 'react'
import ReactDOM from 'react-dom/client'
import { ImportsApp } from './ImportsApp'
import './styles.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <ImportsApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)