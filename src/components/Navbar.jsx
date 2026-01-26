import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="#" className="navbar-logo-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/src/assets/logo.png" alt="La Tavernetta" style={{ height: '50px' }} />
                </a>
                <ul className="navbar-links">
                    <li><a href="#about" className="navbar-link">Nuestra Historia</a></li>
                    <li><a href="#menu" className="navbar-link">Menú</a></li>
                    <li><a href="#contact" className="navbar-link">Ubicación</a></li>
                </ul>
                <a href="https://reservas.latavernetta.es" target="_blank" rel="noopener noreferrer" className="navbar-cta">Reservar</a>
            </div>
        </nav>
    );
};

export default Navbar;
