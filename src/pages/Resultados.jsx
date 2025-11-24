import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ResultadosUCR from '../components/ResultadosUCR';
import { ArrowLeft } from 'lucide-react';

const Resultados = () => {
    const [searchParams] = useSearchParams();
    const promedio = searchParams.get('promedio');

    if (!promedio) {
        return (
            <Layout>
                <div className="text-center py-12">
                    <h2 className="text-xl font-bold text-red-600">Error: Faltan datos</h2>
                    <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                        Volver al inicio
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mb-6">
                <Link to="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a la búsqueda
                </Link>
            </div>

            <ResultadosUCR promedio={promedio} />
        </Layout>
    );
};

export default Resultados;
