import React, { useMemo } from 'react';
import { useCarreras } from '../hooks/useCarreras';
import Card from './common/Card';
import Badge from './common/Badge';
import AdBanner from './common/AdBanner';
import { AlertTriangle, CheckCircle, Info, MapPin } from 'lucide-react';

const ResultadosUNA = ({ promedio }) => {
    const { data, loading, error } = useCarreras('una');

    const isEligible = useMemo(() => {
        if (!data) return false;
        return parseFloat(promedio) >= data.notaMinimaGeneral;
    }, [data, promedio]);

    const carrerasBySede = useMemo(() => {
        if (!data) return {};
        return data.carreras.reduce((acc, carrera) => {
            if (!acc[carrera.sede]) {
                acc[carrera.sede] = [];
            }
            acc[carrera.sede].push(carrera);
            return acc;
        }, {});
    }, [data]);

    if (loading) return <div className="text-center py-12">Cargando datos...</div>;
    if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;

    return (
        <div className="space-y-6">
            {/* Eligibility Status */}
            <Card className={`border-l-4 ${isEligible ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${isEligible ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {isEligible ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                {isEligible
                                    ? '¡Cumples con la nota mínima general!'
                                    : 'No alcanzas la nota mínima general'}
                            </h2>
                            <p className="text-gray-600">
                                Tu promedio: <span className="font-bold">{promedio}</span>
                                <span className="mx-2">|</span>
                                Nota mínima UNA 2025: <span className="font-bold">{data.notaMinimaGeneral}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <Info className="text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                    <p className="font-bold mb-1">Información Importante:</p>
                    <p>{data.informacionImportante.mensaje}</p>
                    <p className="mt-2 text-xs opacity-80">
                        * {data.informacionImportante.criterioAdmision}
                    </p>
                </div>
            </div>

            <AdBanner className="my-4" slotId="in-content-una" />

            {/* Career List Grouped by Sede */}
            {isEligible && (
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Oferta Académica por Sede</h3>

                    {Object.entries(carrerasBySede).map(([sede, carreras]) => (
                        <div key={sede} className="space-y-4">
                            <div className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b pb-2">
                                <MapPin className="text-red-600" />
                                {sede}
                                <span className="text-sm font-normal text-gray-500 ml-2">({carreras.length} carreras)</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {carreras.map((carrera, index) => (
                                    <Card key={index} className="hover:shadow-md transition-shadow">
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-900 mb-2">{carrera.nombre}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="default">{carrera.nivel}</Badge>
                                                <Badge variant="blue">{carrera.area}</Badge>
                                                {carrera.pruebaEspecifica && (
                                                    <Badge variant="warning">Requiere Prueba Específica</Badge>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultadosUNA;
