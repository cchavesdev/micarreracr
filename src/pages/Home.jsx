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
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-2">
                        <GraduationCap size={40} />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        ¡Hola! Descubre tu futuro
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                        Consulta las carreras disponibles con tu promedio de admisión.
                        <br />
                        <span className="font-medium text-blue-600">¡Muchos éxitos en este proceso!</span>
                    </p>
                </div>

                <Card className="p-6 sm:p-8 shadow-lg border-blue-100">
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
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-md text-lg"
                        >
                            Ver mis opciones
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </Card>

                <div className="text-center text-sm text-gray-500">
                    <p>La informació́n utilizada en esta herramienta es basada en los cortes del proceso de admisión obtenida en el siguiente enlace.</p>
                    <a
                        href="https://consultasori.ucr.ac.cr/frmCortesHistoricosUniversitario.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline mt-1 inline-block"
                    >
                        Ver fuente oficial (ORI)
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
