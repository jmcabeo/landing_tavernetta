import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="hero-content">
                <motion.h1
                    className="hero-main-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    LA TAVERNETTA <br /> RESTAURANTE
                </motion.h1>



                <motion.p
                    className="hero-tagline"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    "Auténtica cocina italiana frente al Mar"
                </motion.p>

                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <a href="https://reservas.latavernetta.es" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Reservar Mesa</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
