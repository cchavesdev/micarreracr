import React, { useState, useMemo } from 'react';
import { useCarreras } from '../hooks/useCarreras';
import CarreraRow from './CarreraRow';
import FiltrosAvanzados from './FiltrosAvanzados';
import Tabs from './common/Tabs';
import AdBanner from './common/AdBanner';
import Modal from './common/Modal';
import Button from './common/Button';
import { filterCarrerasUCR } from '../utils/filterCarreras';
import { sortCarreras } from '../utils/sortCarreras';

const ResultadosUCR = ({ promedio }) => {
    const { data, loading, error } = useCarreras('ucr');
    const [activeTab, setActiveTab] = useState('disponibles');
    const [filters, setFilters] = useState({
        search: '',
        sede: 'Todas',
        area: 'Todas',
    });
    const [sortBy, setSortBy] = useState('corte-asc');
    const [showHistoryModal, setShowHistoryModal] = useState(false);

    // 1. Filter by search/sede/area
    const filteredBase = useMemo(() => {
        if (!data) return [];
        return filterCarrerasUCR(data.carreras, filters);
    }, [data, filters]);

    // 2. Categorize
    const categorized = useMemo(() => {
        const score = parseFloat(promedio);
        return filteredBase.reduce((acc, carrera) => {
            const corte = parseFloat(carrera.corte2025 || carrera.corte);
            const diff = score - corte;

            if (diff >= 0) {
                acc.disponibles.push(carrera);
            } else if (diff > -40) {
                acc.cercanas.push(carrera);
            }
            return acc;
        }, { disponibles: [], cercanas: [] });
    }, [filteredBase, promedio]);

    // 3. Select list based on tab
    const currentList = useMemo(() => {
        let list = [];
        if (activeTab === 'disponibles') list = categorized.disponibles;
        else if (activeTab === 'cercanas') list = categorized.cercanas;
        else list = filteredBase; // 'todas'

        return sortCarreras(list, sortBy);
    }, [activeTab, categorized, filteredBase, sortBy]);

    if (loading) return <div className="text-center py-12">Cargando datos...</div>;
    if (error) return <div className="text-center py-12 text-red-600">Error: {error}</div>;

    const sedes = ['Todas', ...new Set(data.carreras.map(c => c.sede))];
    const areas = ['Todas', ...new Set(data.carreras.map(c => c.area))];

    const tabs = [
        { id: 'disponibles', label: 'Disponibles', count: categorized.disponibles.length },
        { id: 'cercanas', label: 'Cercanas (< 40 pts)', count: categorized.cercanas.length },
        { id: 'todas', label: 'Ver Todas', count: filteredBase.length },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Resultados UCR</h2>
                        <p className="text-gray-600">
                            Promedio de admisión: <span className="font-bold text-blue-600">{promedio}</span>
                        </p>
                    </div>
                    <Button variant="secondary" onClick={() => setShowHistoryModal(true)}>
                        Ver Histórico de Cortes
                    </Button>
                </div>

                <div className="mt-6">
                    <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>

            <FiltrosAvanzados
                filters={filters}
                setFilters={setFilters}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sedes={sedes}
                areas={areas}
            />

            <AdBanner className="my-4" slotId="in-content-ucr" />

            <div className="space-y-3">
                {currentList.map((carrera) => (
                    <CarreraRow
                        key={carrera.codigo + carrera.sede}
                        carrera={carrera}
                        userScore={promedio}
                    />
                ))}
            </div>

            {currentList.length === 0 && (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                    No se encontraron carreras en esta categoría con los filtros actuales.
                </div>
            )}

            <Modal
                isOpen={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                title="Histórico de Cortes UCR"
            >
                <div className="space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    La información mostrada en el siguiente documento es oficial de la Oficina de Registro e Información de la UCR.
                                    Mi Carrera CR facilita el acceso a este archivo pero no lo modifica.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600">
                        Puedes consultar el historial completo de cortes de admisión para el proceso 2024-2025 en el siguiente enlace oficial:
                    </p>

                    <a
                        href="https://ori.ucr.ac.cr/sites/default/files/archivos-2024/Cortes_Historicos_2024.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Abrir PDF de Cortes Históricos 2024
                    </a>
                </div>
            </Modal>
        </div>
    );
};

export default ResultadosUCR;
