import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar.jsx'
import Login from './pages/Login.jsx'
import ProductListing from './pages/ProductListing.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Dashboard />
    <ProductDetails />
  </StrictMode>,
)
