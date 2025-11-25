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
                            Esta aplicación utiliza como fuente el documento PDF oficial publicado por la Universidad de Costa Rica (UCR).
                        </p>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                            <p className="text-sm text-yellow-700">
                                <strong>Importante:</strong> Esta herramienta debe utilizarse únicamente como referencia.
                                Los cortes de admisión varían año con año y dependen de múltiples factores.
                            </p>
                        </div>
                        <p>
                            El propósito de <strong>Mi Carrera CR</strong> es facilitar el acceso y la visualización de estos datos históricos para que puedas tener una idea general.
                        </p>
                        <p>
                            Te instamos a tomar decisiones informadas consultando siempre las fuentes oficiales y, de ser posible, con el apoyo de orientadores vocacionales.
                        </p>
                    </div>
                </Card>

                <Card className="p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Fuentes de Información</h3>
                    <div className="space-y-4">
                        <a
                            href="https://ori.ucr.ac.cr/"
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

                </div>
            </div>
        </Layout>
    );
};

export default About;
