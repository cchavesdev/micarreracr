import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const FiltrosAvanzados = ({ filters, setFilters, sortBy, setSortBy, sedes, areas }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Buscar carrera o código..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                        value={filters.sede}
                        onChange={(e) => setFilters(prev => ({ ...prev, sede: e.target.value }))}
                    >
                        {sedes.map(sede => (
                            <option key={sede} value={sede}>{sede}</option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                        value={filters.area}
                        onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))}
                    >
                        {areas.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="corte-asc">Corte: Menor a Mayor</option>
                        <option value="corte-desc">Corte: Mayor a Menor</option>
                        <option value="nombre-asc">Nombre: A-Z</option>
                        <option value="nombre-desc">Nombre: Z-A</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FiltrosAvanzados;
