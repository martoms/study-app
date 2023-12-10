import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './app/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';

// CSS
import 'bootstrap/dist/css/bootstrap.css';
import './styles/css/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="212076721378-bdsll65luucvpakv7ear10d9jfdl27k9.apps.googleusercontent.com">
      <Provider store={ store }>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
