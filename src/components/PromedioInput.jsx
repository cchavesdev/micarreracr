import React from 'react';
import { Calculator } from 'lucide-react';

const PromedioInput = ({ value, onChange, error }) => {
    const handleChange = (e) => {
        // Only allow numbers and one decimal point
        const val = e.target.value;
        if (val === '' || /^\d*\.?\d*$/.test(val)) {
            onChange(val);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <label htmlFor="promedio" className="block text-sm font-medium text-gray-700 mb-2">
                Tu Promedio de Admisión
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calculator className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    name="promedio"
                    id="promedio"
                    className={`block w-full pl-10 pr-12 py-3 sm:text-lg border rounded-lg focus:ring-2 focus:ring-offset-0 transition-colors ${error
                            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                    placeholder="Ej: 600.50"
                    value={value}
                    onChange={handleChange}
                    inputMode="decimal"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">pts</span>
                </div>
            </div>
            {error ? (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            ) : (
                <p className="mt-2 text-xs text-gray-500">
                    Ingresa un valor entre 200 y 800
                </p>
            )}
        </div>
    );
};

export default PromedioInput;
