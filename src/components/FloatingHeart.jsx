import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { settingsService } from '../services/settingsService';

const FloatingHeart = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const checkPromoStatus = async () => {
            try {
                const active = await settingsService.getValentinePromo();
                setIsActive(active);
            } catch (error) {
                console.error('Error checking promo status for heart:', error);
            }
        };

        checkPromoStatus();
    }, []);

    if (!isActive) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            <motion.div
                initial={{ x: '-10vw', y: '80vh', rotate: 0, opacity: 0 }}
                animate={{
                    x: '110vw',
                    y: ['80vh', '20vh', '60vh', '-10vh'],
                    rotate: [0, 45, -45, 90],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                }}
                style={{
                    fontSize: '4rem',
                    position: 'absolute',
                    filter: 'drop-shadow(0 0 10px rgba(255, 77, 109, 0.5))'
                }}
            >
                💘
            </motion.div>
        </div>
    );
};

export default FloatingHeart;
