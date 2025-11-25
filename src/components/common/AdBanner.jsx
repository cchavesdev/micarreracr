import React, { useEffect } from 'react';

const AdBanner = ({ slotId, format = 'auto', className = '' }) => {
    const client = import.meta.env.VITE_ADSENSE_CLIENT_ID;
    const isDev = !client || client.includes('XXXXXXXX');

    // Temporarily hide ads as requested
    return null;

    useEffect(() => {
        if (!isDev) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('AdSense error:', e);
            }
        }
    }, [isDev]);

    if (isDev) {
        return (
            <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400 text-sm ${className}`}>
                <p className="font-bold">Espacio Publicitario (Modo Desarrollo)</p>
                <p className="text-xs mt-1">Slot ID: {slotId || 'Auto'}</p>
            </div>
        );
    }

    return (
        <div className={`overflow-hidden ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={client}
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdBanner;
