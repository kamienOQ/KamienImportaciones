import React from 'react'
import ReactDOM from 'react-dom/client'
import { ImportsApp } from './ImportsApp'
import './styles.css'
import { store } from './store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={ store }>
      <ImportsApp />
    </Provider>
  </React.StrictMode>,
)