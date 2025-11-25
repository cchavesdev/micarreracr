import React from 'react';
import Layout from '../components/Layout';
import Card from '../components/common/Card';
import { Github, ExternalLink } from 'lucide-react';

const About = () => {
    return (
        <Layout>
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Sobre el Proyecto</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Mi Carrera CR es una herramienta diseñada para ayudar a estudiantes costarricenses
                        a descubrir sus opciones universitarias.
                    </p>
                </div>

                <Card className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h3>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            Esta aplicación utiliza los datos oficiales de cortes de admisión de la
                            Universidad de Costa Rica (UCR) y la información de admisión de la
                        </p>
                        <p>
                            Al ingresar tu promedio de admisión, el sistema filtra automáticamente:
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>
                                <strong>Para UCR:</strong> Carreras donde tu nota es igual o superior al corte histórico.
                            </li>
                        </ul>
                    </div>
                </Card>

                <Card className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Fuentes de Información</h3>
                    <div className="space-y-4">
                        <a
                            href="https://consultasori.ucr.ac.cr/frmCortesHistoricosUniversitario.aspx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:underline"
                        >
                            <ExternalLink size={16} />
                            Oficina de Registro e Información (UCR)
                        </a>
                        <a
                            href="/data/Cortes-carreras-UCR-2025-primer-ingreso-.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-red-600 hover:underline"
                        >
                            <ExternalLink size={16} />
                            Documento Oficial de Cortes 2025 (PDF)
                        </a>
                    </div>
                </Card>

                <div className="text-center pt-8 border-t border-gray-200">
                    <p className="text-gray-500 mb-4">
                        Desarrollado con fines educativos y de orientación vocacional.
                    </p>
                    <a
                        href="https://github.com/cchavesdev/micarreracr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                    >
                        <Github size={20} />
                        <span>Ver código fuente</span>
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default About;
