import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactGA from 'react-ga4';

// Initialize GA4
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaId && !gaId.includes('XXXXXXXX')) {
    ReactGA.initialize(gaId);
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
