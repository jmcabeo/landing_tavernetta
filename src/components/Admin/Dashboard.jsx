import React, { useState, useEffect } from 'react';
import { menuService } from '../../services/menuService';
import DishForm from './DishForm';
import { hashPassword } from '../../utils/security';

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
        // ... (resto del JSX igual hasta el modal)
        { isChangingPassword && (
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000
            }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '300px' }}>
                    <h3 style={{ marginTop: 0 }}>Nueva Contraseña Segura</h3>
                    <form onSubmit={handleChangePassword}>
                        <input
                            type="password"
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
        </div >
    );
};

export default Dashboard;
