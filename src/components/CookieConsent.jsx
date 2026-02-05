import React, { useState, useEffect } from 'react';
import '../styles/CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Pequeño delay para que no aparezca de golpe al cargar
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-banner">
            <div className="cookie-content">
                <p>
                    🍪 <strong>Política de Cookies:</strong> Utilizamos cookies propias y de terceros para mejorar tu experiencia
                    y analizar el uso de nuestra web. Al continuar navegando, aceptas su uso.
                </p>
                <div className="cookie-buttons">
                    <button onClick={handleReject} className="cookie-btn cookie-reject">
                        Solo necesarias
                    </button>
                    <button onClick={handleAccept} className="cookie-btn cookie-accept">
                        Aceptar todas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
