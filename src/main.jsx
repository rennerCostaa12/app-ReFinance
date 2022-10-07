import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ItemsContextProviders from "./contexts/Items";
import UserContextProviders from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ItemsContextProviders>
      <UserContextProviders>
        <App />
      </UserContextProviders>
    </ItemsContextProviders>
  </React.StrictMode>

)
