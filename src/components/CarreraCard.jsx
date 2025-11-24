import React from 'react';
import Card from './common/Card';
import Badge from './common/Badge';
import { CheckCircle, XCircle, AlertTriangle, MapPin } from 'lucide-react';

const CarreraCard = ({ carrera, userScore }) => {
    const corte = parseFloat(carrera.corte2025 || carrera.corte);
    const score = parseFloat(userScore);
    const diff = score - corte;
    const isAvailable = diff >= 0;
    const isClose = !isAvailable && diff > -40; // Close if within 40 points

    return (
        <Card className={`border-l-4 ${isAvailable ? 'border-l-green-500' : isClose ? 'border-l-yellow-500' : 'border-l-red-500'
            }`}>
            <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                {carrera.nombre}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                            <MapPin size={14} />
                            <span>{carrera.sede}</span>
                        </div>
                        <Badge variant="blue" className="mb-3">
                            {carrera.area}
                        </Badge>
                    </div>

                    <div className="text-right shrink-0">
                        <div className="text-sm text-gray-500">Corte 2025</div>
                        <div className="text-xl font-bold text-gray-900">{carrera.corte2025 || carrera.corte}</div>
                    </div>
                </div>

                <div className={`mt-4 p-3 rounded-lg flex items-center gap-3 ${isAvailable ? 'bg-green-50 text-green-800' : isClose ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-800'
                    }`}>
                    {isAvailable ? (
                        <CheckCircle className="h-5 w-5 shrink-0" />
                    ) : isClose ? (
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                    ) : (
                        <XCircle className="h-5 w-5 shrink-0" />
                    )}

                    <div className="text-sm font-medium">
                        {isAvailable ? (
                            <span>
                                ¡Felicidades! Superas el corte por <span className="font-bold">{diff.toFixed(2)}</span> pts
                            </span>
                        ) : (
                            <span>
                                Te faltan <span className="font-bold">{Math.abs(diff).toFixed(2)}</span> pts
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CarreraCard;
