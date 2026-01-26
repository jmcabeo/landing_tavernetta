import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import aboutFriendsReal from '../assets/about_friends_real.png';
import aboutVarietyFlatlay from '../assets/about_variety_flatlay.png';
import aboutChef from '../assets/about_chef.png';

const About = () => {
    return (
        <section id="about" className="about">
            <div className="container about-content">
                <motion.span
                    className="about-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    NUESTRA ESENCIA
                </motion.span>

                <motion.h2
                    className="about-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Algo diferente frente al mar
                </motion.h2>

                {/* Bloque 1: Origen e Historia con Imagen de Amigos */}
                <div className="about-grid">
                    <motion.div
                        className="about-text-col"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p>
                            Nuestra historia comienza con un deseo claro: romper moldes. En una ubicación privilegiada,
                            en primera línea de playa, queríamos ofrecer algo distinto al típico chiringuito de arroz.
                            Así decidimos traer <strong>la auténtica cocina italiana al borde del Mediterráneo</strong>.
                        </p>
                        <p>
                            El nombre <em>"La Tavernetta"</em> surgió de la amistad. Un amigo nuestro, un "hermano" que vivía en Madrid,
                            frecuentaba un lugar con ese nombre. Nos dimos cuenta de que sonaba bien: cercano, cálido y a hogar.
                            Era perfecto para lo que queríamos construir.
                        </p>
                    </motion.div>
                    <motion.div
                        className="about-img-col"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src={aboutFriendsReal} alt="Amigos brindando en el interior de La Tavernetta" className="about-img shadow-lg" />
                    </motion.div>
                </div>

                {/* Bloque 2: Evolución y Variedad con Imagen de Mesa Variada */}
                <div className="about-grid reverse-mobile" style={{ marginTop: '80px' }}>
                    <motion.div
                        className="about-img-col"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src={aboutVarietyFlatlay} alt="Mesa de La Tavernetta con Pizza, Nachos y Pescado" className="about-img shadow-lg" />
                    </motion.div>
                    <motion.div
                        className="about-text-col"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="about-section-title">Italiano y Mediterráneo</h3>
                        <p>
                            Empezamos con la pasta y la pizza, fieles a nuestras raíces, pero nuestra vocación de servicio nos hizo evolucionar.
                            Escuchamos a nuestros clientes y entendimos que, frente al mar, a veces apetece variedad.
                        </p>
                        <p>
                            Hoy somos el lugar donde pueden convivir una <strong>Lasaña Boloñesa</strong> con un <strong>Entrecot</strong> de primera,
                            un <strong>Rape estilo Tavernetta</strong> o unos <strong>Nachos Machos</strong> (un superviviente de nuestra etapa mexicana
                            que los clientes nos pidieron no quitar nunca).
                        </p>
                    </motion.div>
                </div>

                {/* Bloque 3: Nombres Propios y Chef con Imagen Chef */}
                <div className="about-grid" style={{ marginTop: '80px' }}>
                    <motion.div
                        className="about-text-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="about-section-title">Una Carta con Nombres y Apellidos</h3>
                        <p>
                            Nos sentimos orgullosos de nuestros platos porque tienen historia. Nuestras pizzas llevan nombres como
                            <strong>"Alejandro"</strong> o <strong>"María"</strong>, rindiendo homenaje a clientes y amigos que han marcado nuestras vidas.
                        </p>
                        <p>
                            O nuestra famosa <strong>Ensalada Manolo</strong>, que nació de la rutina diaria y se convirtió en un clásico por aclamación popular.
                            En <em>La Tavernetta</em>, no solo servimos comida de calidad a buen precio; servimos recuerdos en un lugar donde todos se sienten en casa.
                        </p>

                    </motion.div>
                    <motion.div
                        className="about-img-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src={aboutChef} alt="Chef preparando platos con pasión" className="about-img shadow-lg" />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default About;
