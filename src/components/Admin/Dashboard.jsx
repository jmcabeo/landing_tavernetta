import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import { settingsService } from '../../services/settingsService';
import DishForm from './DishForm';
import { hashPassword } from '../../utils/security';

const Dashboard = ({ onLogout }) => {
    const [dishes, setDishes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDish, setCurrentDish] = useState(null);

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    // Estado para promoción San Valentín
    const [valentinePromoActive, setValentinePromoActive] = useState(false);
    const [loadingPromo, setLoadingPromo] = useState(true);

    useEffect(() => {
        loadDishes();
        loadValentinePromo();
    }, []);

    const loadValentinePromo = async () => {
        try {
            const active = await settingsService.getValentinePromo();
            setValentinePromoActive(active);
        } catch (error) {
            console.error('Error loading valentine promo status:', error);
        } finally {
            setLoadingPromo(false);
        }
    };

    const handleToggleValentinePromo = async () => {
        const newState = !valentinePromoActive;
        setValentinePromoActive(newState);
        try {
            await settingsService.setValentinePromo(newState);
        } catch (error) {
            console.error('Error updating valentine promo:', error);
            setValentinePromoActive(!newState); // Revert on error
            alert('Error al actualizar la promoción');
        }
    };

    const loadDishes = async () => {
        try {
            const data = await menuService.getAll();
            setDishes(data);
        } catch (error) {
            console.error('Error loading dishes:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este plato?')) {
            try {
                await menuService.delete(id);
                await loadDishes();
            } catch (error) {
                alert('Error al eliminar el plato');
            }
        }
    };

    const handleEdit = (dish) => {
        setCurrentDish(dish);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentDish(null);
        setIsEditing(true);
    };

    const handleSave = async (dishData) => {
        try {
            if (currentDish) {
                await menuService.update(currentDish.id, dishData);
            } else {
                await menuService.add(dishData);
            }
            setIsEditing(false);
            await loadDishes();
        } catch (error) {
            alert('Error al guardar el plato');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 4) {
            alert("La contraseña debe tener al menos 4 caracteres");
            return;
        }

        try {
            const hash = await hashPassword(newPassword);
            localStorage.setItem('adminHash', hash);
            localStorage.removeItem('adminPassword'); // Asegurar limpieza
            alert("Contraseña encriptada y actualizada correctamente");
            setIsChangingPassword(false);
            setNewPassword('');
        } catch (error) {
            console.error(error);
            alert("Error al encriptar contraseña");
        }
    };

    return (
        <div className="container section-padding">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2>Panel de Administración</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setIsChangingPassword(true)}
                        className="btn"
                        style={{ backgroundColor: '#f39c12', color: 'white' }}
                    >
                        🔑 Cambiar Pass
                    </button>
                    <button onClick={onLogout} className="btn" style={{ backgroundColor: '#95a5a6', color: 'white' }}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {isEditing ? (
                <DishForm
                    onSave={handleSave}
                    initialData={currentDish}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <>
                    {/* Sección Promociones */}
                    <div style={{
                        background: 'linear-gradient(135deg, #fff0f3 0%, #fff 100%)',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '30px',
                        border: '1px solid #ffccd5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 12px rgba(255, 77, 109, 0.1)'
                    }}>
                        <div>
                            <h3 style={{ margin: '0 0 5px', color: '#d63384' }}>🌹 Promoción San Valentín</h3>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                                Activa o desactiva el banner especial de San Valentín en la página principal.
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: 'bold', color: valentinePromoActive ? '#2ecc71' : '#95a5a6' }}>
                                {valentinePromoActive ? 'ACTIVADA' : 'DESACTIVADA'}
                            </span>
                            <button
                                onClick={handleToggleValentinePromo}
                                disabled={loadingPromo}
                                className="btn"
                                style={{
                                    backgroundColor: valentinePromoActive ? '#e74c3c' : '#2ecc71',
                                    color: 'white',
                                    minWidth: '120px'
                                }}
                            >
                                {loadingPromo ? '...' : (valentinePromoActive ? 'Desactivar' : 'Activar')}
                            </button>
                        </div>
                    </div>

                    <button onClick={handleAddNew} className="btn btn-primary" style={{ marginBottom: '2rem' }}>
                        + Añadir Nuevo Plato
                    </button>

                    <div className="admin-dish-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {dishes.map(dish => (
                            <div key={dish.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                <div style={{ height: '160px', overflow: 'hidden', borderRadius: '4px', marginBottom: '10px', backgroundColor: '#eee' }}>
                                    {dish.img ? (
                                        <img src={dish.img} alt={dish.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No Image</div>
                                    )}
                                </div>
                                <h3 style={{ fontSize: '1.2rem', margin: '0 0 5px' }}>{dish.title}</h3>

                                <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-primary)' }}>{dish.price}</p>

                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                    <button onClick={() => handleEdit(dish)} className="btn" style={{ padding: '8px 15px', fontSize: '0.9rem', flex: 1 }}>
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dish.id)}
                                        className="btn"
                                        style={{ padding: '8px 15px', fontSize: '0.9rem', flex: 1, backgroundColor: '#e74c3c', color: 'white' }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {isChangingPassword && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '350px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>Nueva Contraseña</h3>
                        <form onSubmit={handleChangePassword}>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Escribe nueva clave..."
                                style={{ width: '100%', padding: '12px', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                required
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Guardar</button>
                                <button type="button" onClick={() => setIsChangingPassword(false)} className="btn" style={{ flex: 1, border: '1px solid #ccc', background: 'transparent', color: '#666' }}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
