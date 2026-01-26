import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import DishForm from './DishForm';

const Dashboard = ({ onLogout }) => {
    const [dishes, setDishes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDish, setCurrentDish] = useState(null);

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

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>Panel de Gestión</h1>
                <button onClick={onLogout} className="btn btn-outline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>Cerrar Sesión</button>
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
        </div>
    );
};

export default Dashboard;
