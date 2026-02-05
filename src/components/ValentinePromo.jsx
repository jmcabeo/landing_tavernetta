import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { settingsService } from '../services/settingsService';
import '../styles/ValentinePromo.css';

const ValentinePromo = () => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lightboxImage, setLightboxImage] = useState(null);

    const images = [
        { src: '/san_valentin_promo.jpeg', alt: 'Promoción San Valentín' },
        { src: '/san_valentin_carta.jpeg', alt: 'Menú San Valentín' }
    ];

    useEffect(() => {
        const checkPromoStatus = async () => {
            try {
                const active = await settingsService.getValentinePromo();
                setIsActive(active);
            } catch (error) {
                console.error('Error checking promo status:', error);
                setIsActive(false);
            } finally {
                setLoading(false);
            }
        };

        checkPromoStatus();
    }, []);

    const openLightbox = (image) => {
        setLightboxImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        document.body.style.overflow = 'auto';
    };

    // No mostrar nada si está cargando o no está activa
    if (loading || !isActive) return null;

    return (
        <>
            <section id="valentine-promo" className="valentine-promo">
                <div className="valentine-container">
                    {/* Decoración de corazones */}
                    <div className="hearts-decoration">
                        <span className="heart">❤️</span>
                        <span className="heart">💕</span>
                        <span className="heart">❤️</span>
                    </div>

                    <motion.div
                        className="valentine-header"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="valentine-badge">🌹 Especial San Valentín 🌹</span>
                        <h2 className="valentine-title">Celebra el Amor en La Tavernetta</h2>
                        <p className="valentine-subtitle">
                            Una velada romántica frente al mar con nuestra carta especial
                        </p>
                    </motion.div>

                    <div className="valentine-gallery">
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                className="valentine-image-wrapper"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => openLightbox(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="valentine-image"
                                />
                                <div className="image-overlay">
                                    <span className="zoom-icon">🔍 Click para ampliar</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        className="lightbox-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="lightbox-close" onClick={closeLightbox}>
                                ✕
                            </button>
                            <img
                                src={lightboxImage.src}
                                alt={lightboxImage.alt}
                                className="lightbox-image"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ValentinePromo;
