import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import DishForm from './DishForm';

const Dashboard = ({ onLogout }) => {
    const [dishes, setDishes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDish, setCurrentDish] = useState(null);

    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        loadDishes();
    }, []);

    const loadDishes = () => {
        setDishes(menuService.getAll());
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este plato?')) {
            menuService.delete(id);
            loadDishes();
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

    const handleSave = (dishData) => {
        if (currentDish) {
            menuService.update(currentDish.id, dishData);
        } else {
            menuService.add(dishData);
        }
        setIsEditing(false);
        loadDishes();
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (newPassword.length < 4) {
            alert("La contraseña debe tener al menos 4 caracteres");
            return;
        }
        localStorage.setItem('adminPassword', newPassword);
        alert("Contraseña actualizada correctamente");
        setIsChangingPassword(false);
        setNewPassword('');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>Panel de Gestión</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => setIsChangingPassword(true)}
                        className="btn"
                        style={{ padding: '8px 16px', fontSize: '0.9rem', background: '#e0e0e0', color: '#333' }}
                    >
                        🔑 Cambiar Pass
                    </button>
                    <button onClick={onLogout} className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>Cerrar Sesión</button>
                </div>
            </header>

            <div style={{ marginBottom: '2rem' }}>
                <button onClick={handleAddNew} className="btn btn-primary">
                    + Añadir Nuevo Plato
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {dishes.map(dish => (
                    <div key={dish.id} style={{
                        background: 'white',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <img src={dish.img} alt={dish.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                            <div>
                                <h3 style={{ margin: '0 0 5px 0' }}>{dish.title}</h3>
                                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{dish.price}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleEdit(dish)}
                                style={{ padding: '5px 10px', background: 'var(--color-secondary)', color: 'white', border: 'none', borderRadius: '4px' }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(dish.id)}
                                style={{ padding: '5px 10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px' }}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditing && (
                <DishForm
                    dish={currentDish}
                    onSave={handleSave}
                    onCancel={() => setIsEditing(false)}
                />
            )}

            {isChangingPassword && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '300px' }}>
                        <h3 style={{ marginTop: 0 }}>Nueva Contraseña</h3>
                        <form onSubmit={handleChangePassword}>
                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Escribe nueva clave..."
                                style={{ width: '100%', padding: '8px', marginBottom: '1rem', border: '1px solid #ddd' }}
                                required
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Guardar</button>
                                <button type="button" onClick={() => setIsChangingPassword(false)} className="btn" style={{ flex: 1, border: '1px solid #ccc' }}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
