import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { menuService } from '../services/menuService';
import '../styles/MenuHighlights.css';

const MenuHighlights = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar platos del servicio (ahora async desde Supabase)
        const loadDishes = async () => {
            try {
                const data = await menuService.getAll();
                setDishes(data);
            } catch (error) {
                console.error('Error loading dishes:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDishes();
    }, []);

    return (
        <section id="menu" className="menu-highlights">
            <div className="container">
                <div className="section-header">
                    <span className="section-subtitle">Nuestros Platos</span>
                    <h2 className="section-title">Platos Destacados</h2>
                </div>
                <div className="menu-grid">
                    {dishes.map((dish, index) => (
                        <motion.div
                            key={dish.id}
                            className="menu-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="card-image-container">
                                <img src={dish.img} alt={dish.title} className="card-image" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{dish.title}</h3>
                                <p className="card-description">{dish.desc}</p>
                                <div className="card-price">{dish.price}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuHighlights;
