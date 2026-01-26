import React, { useState, useEffect } from 'react';

const DishForm = ({ dish, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        price: '',
        img: '' // En el futuro esto podría ser un upload
    });

    useEffect(() => {
        if (dish) {
            setFormData(dish);
        }
    }, [dish]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación básica
        if (!formData.img) {
            // Imagen por defecto si está vacío para evitar errores visuales
            formData.img = '/src/assets/pizza.png';
        }
        onSave(formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
        }}>
            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: 0 }}>
                    {dish ? 'Editar Plato' : 'Nuevo Plato'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Nombre del Plato</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Descripción</label>
                        <textarea
                            name="desc"
                            value={formData.desc}
                            onChange={handleChange}
                            rows="3"
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Precio (ej. 14€)</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>URL de Imagen</label>
                        <input
                            type="text"
                            name="img"
                            value={formData.img}
                            onChange={handleChange}
                            placeholder="/src/assets/nombre_imagen.png o URL externa"
                            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        <small style={{ color: '#666' }}>
                            *Para demostración usar: /src/assets/lasagna.png, /src/assets/pizza.png, /src/assets/tiramisu.png
                        </small>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Guardar</button>
                        <button type="button" onClick={onCancel} className="btn btn-outline" style={{ flex: 1, color: '#333', borderColor: '#ccc' }}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DishForm;
