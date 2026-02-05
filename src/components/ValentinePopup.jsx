import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { settingsService } from '../services/settingsService';
import '../styles/ValentinePopup.css';

const ValentinePopup = () => {
    const [isActive, setIsActive] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const checkPromo = async () => {
            try {
                // Verificar si la promo está activa en el admin
                const active = await settingsService.getValentinePromo();

                // Verificar si el usuario ya cerró el popup en esta sesión
                const sessionClosed = sessionStorage.getItem('valentinePopupClosed');

                if (active && !sessionClosed) {
                    setIsActive(true);
                    // Pequeño delay para mejor UX
                    setTimeout(() => setShowPopup(true), 2000);
                }
            } catch (error) {
                console.error('Error checking promo for popup:', error);
            }
        };

        checkPromo();
    }, []);

    const handleClose = () => {
        setShowPopup(false);
        // Guardar en sessionStorage para no mostrar más veces hasta cerrar navegador
        sessionStorage.setItem('valentinePopupClosed', 'true');
    };

    if (!isActive) return null;

    return (
        <AnimatePresence>
            {showPopup && (
                <div className="valentine-popup-overlay" onClick={handleClose}>
                    <motion.div
                        className="valentine-popup-content"
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{ type: 'spring', duration: 0.6 }}
                        onClick={(e) => e.stopPropagation()} // Evitar cerrar al click en el contenido
                    >
                        <button className="valentine-popup-close" onClick={handleClose}>×</button>

                        <div className="valentine-popup-image-container">
                            <span className="popup-badge">❤️ Especial San Valentín</span>
                            <img
                                src="/san_valentin_promo.jpeg"
                                alt="Promoción San Valentín"
                                className="valentine-popup-image"
                            />
                        </div>

                        <div className="valentine-popup-footer">
                            <h3>¡Celebra el Amor con Nosotros!</h3>
                            <button className="valentine-popup-cta" onClick={handleClose}>
                                Ver Menú
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ValentinePopup;
