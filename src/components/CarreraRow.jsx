import React from 'react';
import Badge from './common/Badge';
import { CheckCircle, XCircle, AlertTriangle, MapPin } from 'lucide-react';

const CarreraRow = ({ carrera, userScore }) => {
    const corte = parseFloat(carrera.corte2025 || carrera.corte);
    const score = parseFloat(userScore);
    const diff = score - corte;
    const isAvailable = diff >= 0;
    const isClose = !isAvailable && diff > -40;

    return (
        <div className={`
      group relative bg-white border rounded-lg p-3 sm:p-4 transition-all hover:shadow-md
      ${isAvailable ? 'border-l-4 border-l-green-500 border-gray-200' :
                isClose ? 'border-l-4 border-l-yellow-500 border-gray-200' :
                    'border-l-4 border-l-red-500 border-gray-200 opacity-80 hover:opacity-100'}
    `}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">

                {/* Left: Icon & Info */}
                <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-1 shrink-0 ${isAvailable ? 'text-green-500' : isClose ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                        {isAvailable ? <CheckCircle size={20} /> : isClose ? <AlertTriangle size={20} /> : <XCircle size={20} />}
                    </div>

                    <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                            {carrera.nombre}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={12} />
                                <span className="truncate max-w-[150px] sm:max-w-none">{carrera.sede}</span>
                            </div>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full sm:bg-transparent sm:px-0 sm:py-0">{carrera.area}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Score & Diff */}
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 sm:w-auto w-full pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 mt-1 sm:mt-0">
                    <div className="text-left sm:text-right">
                        <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Corte</div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base">{carrera.corte2025 || carrera.corte}</div>
                    </div>

                    <div className="text-right min-w-[70px] sm:min-w-[80px]">
                        <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">Diferencia</div>
                        <div className={`font-bold text-sm sm:text-base ${isAvailable ? 'text-green-600' : isClose ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            {diff > 0 ? '+' : ''}{diff.toFixed(2)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CarreraRow;
