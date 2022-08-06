import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ItemsContextProviders from "./contexts/Items";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ItemsContextProviders>
      <App />
    </ItemsContextProviders>
  </React.StrictMode>
)
