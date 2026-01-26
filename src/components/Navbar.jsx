import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Cerrar menú al hacer click en un enlace
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="#" className="navbar-logo-container">
                    <img src={logo} alt="La Tavernetta" className="navbar-logo-img" />
                </a>

                {/* Botón Hamburguesa Móvil */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Enlaces de Navegación (Desktop + Mobile Wrapper) */}
                <div className={`navbar-menu-wrapper ${isMobileMenuOpen ? 'active' : ''}`}>
                    <ul className="navbar-links">
                        <li><a href="#about" className="navbar-link" onClick={handleLinkClick}>Nuestra Historia</a></li>
                        <li><a href="#menu" className="navbar-link" onClick={handleLinkClick}>Menú</a></li>
                        <li><a href="#contact" className="navbar-link" onClick={handleLinkClick}>Ubicación</a></li>
                    </ul>
                    <a
                        href="https://reservas.latavernetta.es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-cta"
                        onClick={handleLinkClick}
                    >
                        Reservar
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
