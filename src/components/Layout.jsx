import React from 'react';
import Header from './Header';
import AdBanner from './common/AdBanner';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-[200px]">
            <Header />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {children}
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <AdBanner className="" slotId="bottom-banner" />
                <footer className="py-4">
                    <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <p>© {new Date().getFullYear()} Mi Carrera CR. Información referencial.</p>
                        <Link to="/about" className="text-blue-600 hover:underline">
                            Sobre el Proyecto
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
