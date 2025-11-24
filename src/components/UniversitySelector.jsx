import React from 'react';
import { School, BookOpen } from 'lucide-react';

const UniversitySelector = ({ selected, onSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
            <button
                onClick={() => onSelect('ucr')}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-4 group ${selected === 'ucr'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                    }`}
            >
                <div className={`p-4 rounded-full ${selected === 'ucr' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                    }`}>
                    <School size={32} />
                </div>
                <div className="text-center">
                    <h3 className={`text-lg font-bold ${selected === 'ucr' ? 'text-blue-900' : 'text-gray-900'}`}>
                        UCR
                    </h3>
                    <p className="text-sm text-gray-500">Universidad de Costa Rica</p>
                </div>
                {selected === 'ucr' && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-blue-600 rounded-full" />
                )}
            </button>

            <button
                onClick={() => onSelect('una')}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-4 group ${selected === 'una'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 bg-white hover:border-red-300 hover:bg-gray-50'
                    }`}
            >
                <div className={`p-4 rounded-full ${selected === 'una' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600 group-hover:bg-red-200'
                    }`}>
                    <BookOpen size={32} />
                </div>
                <div className="text-center">
                    <h3 className={`text-lg font-bold ${selected === 'una' ? 'text-red-900' : 'text-gray-900'}`}>
                        UNA
                    </h3>
                    <p className="text-sm text-gray-500">Universidad Nacional</p>
                </div>
                {selected === 'una' && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-red-600 rounded-full" />
                )}
            </button>
        </div>
    );
};

export default UniversitySelector;
