import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, UtensilsCrossed, Truck, ShoppingCart } from 'lucide-react';
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

                <motion.div
                    className="hero-menu-buttons"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                >
                    <a href="/desayunos.jpg" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Coffee size={18} />
                        <span>Desayunos</span>
                    </a>
                    <a href="/carta.html" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <UtensilsCrossed size={18} />
                        <span>Carta</span>
                    </a>
                    <a href="/delivery.jpg" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Truck size={18} />
                        <span>A Domicilio</span>
                    </a>
                    <a href="https://latavernetta.last.shop/es/la-tavernetta" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-online">
                        <ShoppingCart size={18} />
                        <span>Pedidos Online</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
