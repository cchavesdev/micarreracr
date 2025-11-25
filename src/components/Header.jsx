import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdBanner from './common/AdBanner';

const Header = () => {
    return (
        <header className="glass sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-start items-center h-16">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="bg-blue-600 text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <GraduationCap size={32} />
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">Mi Carrera CR</span>
                    </Link>
                </div>
                <div className="pb-2">
                    <AdBanner slotId="header-sticky" className="max-w-3xl mx-auto" />
                </div>
            </div>
        </header>
    );
};

export default Header;
