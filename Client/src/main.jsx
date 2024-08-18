import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from './store/auth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <ThemeProvider>
    <App />
    <ToastContainer 
   bodyClassName="toastBody"
   theme="colored"
  />
    </ThemeProvider>
  </React.StrictMode>,
  </AuthProvider>
)
