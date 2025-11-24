import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Resultados from './pages/Resultados';
import About from './pages/About';
import ReactGA from 'react-ga4';

const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (gaId && !gaId.includes('XXXXXXXX')) {
            ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
        }
    }, [location]);

    return null;
};

function App() {
    return (
        <BrowserRouter>
            <PageTracker />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resultados" element={<Resultados />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
