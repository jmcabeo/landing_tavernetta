import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    const mapsLink = "https://www.google.com/maps/dir//Restaurante+La+Tavernetta,+Av.+del+Mar,+04711+Almerimar,+Almer%C3%ADa/@36.7161633,-2.8277973,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xd705d00f2fe8ce1:0x34240ff9435e122a!2m2!1d-2.8147239!2d36.7071158?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D";
    const navigate = useNavigate();
    const [clickCount, setClickCount] = useState(0);

    const handleSecretClick = () => {
        setClickCount(prev => {
            const newCount = prev + 1;
            if (newCount === 5) {
                navigate('/admin');
                return 0;
            }
            // Reset count if minimal delay passes (simple debounce logic implies user should be fast, 
            // but for simplicity we just auto-reset via timeout or rely on component unmount; 
            // here a timeout to reset count if stopped clicking helps avoid accidental triggers over long periods)
            setTimeout(() => setClickCount(0), 2000);
            return newCount;
        });
    };

    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <h3>La Tavernetta</h3>
                        <p>Italiano y Mediterráneo frente al mar.</p>
                        <p>Tu refugio habitual en Almerimar.</p>
                    </div>
                    <div className="footer-col">
                        <h3>Dónde Estamos</h3>
                        <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="footer-address-link">
                            📍 Avenida del Mar, Chiringuito 7<br />
                            04711 Almerimar, El Ejido
                        </a>
                        <div style={{ marginTop: '10px' }}>
                            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-map">
                                Ver en Google Maps
                            </a>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h3>Contacto</h3>
                        <p><a href="tel:+34950659927">+34 950 65 99 27</a></p>
                        <p><a href="mailto:info@latavernetta.es">info@latavernetta.es</a></p>
                    </div>
                    <div className="footer-col">
                        <h3>Horario</h3>
                        <p>Martes a Domingo</p>
                        <p>09:00 - 23:00</p>
                        <p className="small" style={{ color: '#E67E22' }}>Lunes Cerrado</p>
                    </div>
                </div>
                <div
                    className="footer-bottom"
                    onClick={handleSecretClick}
                    style={{ cursor: 'text', userSelect: 'none' }} /* Cursor text para despistar */
                    title="" /* No tooltip */
                >
                    &copy; {new Date().getFullYear()} La Tavernetta. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
