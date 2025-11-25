import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import PromedioInput from '../components/PromedioInput';
import Card from '../components/common/Card';
import { GraduationCap, ArrowRight } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();
    const [promedio, setPromedio] = useState('');
    const [error, setError] = useState('');

    const handleSearch = () => {
        if (!promedio) {
            setError('Por favor ingresa tu promedio');
            return;
        }

        const score = parseFloat(promedio);
        if (isNaN(score) || score < 200 || score > 800) {
            setError('El promedio debe estar entre 200 y 800');
            return;
        }

        navigate(`/resultados?universidad=ucr&promedio=${promedio}`);
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto space-y-8 pt-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-full text-blue-600 mb-4 shadow-sm ring-1 ring-white/60">
                        <GraduationCap size={48} />
                    </div>

                    <div className="text-sm text-gray-500 max-w-lg mx-auto bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <p>La información utilizada en esta herramienta es basada en el <a href="/data/Cortes-carreras-UCR-2025-primer-ingreso-.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">documento oficial de cortes 2025 (PDF)</a>.</p>
                    </div>

                    <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed pt-2">
                        Consulta las carreras disponibles con tu promedio de admisión.
                        <br />
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mt-1">
                            Ingreso a Carrera Ordinaria - Primer Ingreso
                        </span>
                        <span className="font-medium text-blue-600 block mt-2">¡Muchos éxitos en este proceso!</span>
                    </p>
                </div>

                <div className="glass rounded-2xl p-6 sm:p-8 border border-white/40">
                    <div className="space-y-6">
                        <PromedioInput
                            value={promedio}
                            onChange={(val) => {
                                setPromedio(val);
                                setError('');
                            }}
                            error={error}
                        />

                        <button
                            onClick={handleSearch}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/30 text-lg"
                        >
                            Ver mis opciones
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>


            </div>
        </Layout>
    );
};

export default Home;
