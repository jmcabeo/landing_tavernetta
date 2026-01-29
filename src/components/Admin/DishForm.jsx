import React, { useState, useEffect } from 'react';
import { compressImage } from '../../utils/imageHelpers';

const DishForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        price: '',
        img: '' // En el futuro esto podría ser un upload
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const [isCompressing, setIsCompressing] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setIsCompressing(true);
            try {
                const compressedBase64 = await compressImage(file);
                setFormData({ ...formData, img: compressedBase64 });
            } catch (error) {
                console.error("Error al procesar imagen:", error);
                alert("Error al procesar la imagen. Intenta con otra.");
            } finally {
                setIsCompressing(false);
            }
        }
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
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Imagen del Plato</label>

                        {/* Previsualización */}
                        {formData.img && (
                            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                                <img
                                    src={formData.img}
                                    alt="Preview"
                                    style={{ maxHeight: '150px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                        )}

                        {/* Input de Archivo (Local Upload) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label className="btn btn-outline" style={{ display: 'inline-block', cursor: 'pointer', textAlign: 'center', padding: '10px', background: '#f8f9fa', border: '1px dashed #ccc' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                                📷 Subir Foto desde Dispositivo
                            </label>
                            {isCompressing && <p style={{ fontSize: '0.9rem', color: '#E67E22' }}>Comprimiendo imagen...</p>}
                        </div>

                        {/* Fallback URL (Opcional) */}
                        <details style={{ marginTop: '10px' }}>
                            <summary style={{ fontSize: '0.85rem', color: '#777', cursor: 'pointer' }}>O usar URL externa</summary>
                            <input
                                type="text"
                                name="img"
                                value={formData.img}
                                onChange={handleChange}
                                placeholder="http://..."
                                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' }}
                            />
                        </details>
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
