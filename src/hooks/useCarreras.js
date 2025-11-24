import { useState, useEffect } from 'react';

export const useCarreras = (universidad) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fileName = universidad === 'ucr' ? 'cortes-ucr-2025.json' : 'info-una-2025.json';
                const response = await fetch(`/data/${fileName}`);

                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }

                const jsonData = await response.json();
                setData(jsonData);
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (universidad) {
            fetchData();
        }
    }, [universidad]);

    return { data, loading, error };
};
