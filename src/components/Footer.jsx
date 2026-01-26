import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const mapsLink = "https://www.google.com/maps/place/Restaurante+La+Tavernetta/@36.7071158,-2.8147239,17z/data=!3m1!4b1!4m6!3m5!1s0xd705d00f2fe8ce1:0x34240ff9435e122a!8m2!3d36.7071158!4d-2.8147239";

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
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} La Tavernetta. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
