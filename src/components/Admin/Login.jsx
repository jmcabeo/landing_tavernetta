import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Contraseña hardcodeada para demostración simple
        if (password === 'admin123') {
            onLogin(true);
        } else {
            setError('Contraseña incorrecta');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg)'
        }}>
            <form onSubmit={handleSubmit} style={{
                padding: '2rem',
                background: 'white',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center',
                maxWidth: '300px',
                width: '100%'
            }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                    Portal Admin
                </h2>
                <input
                    type="password"
                    placeholder="Contraseña Maestra"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
                {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>{error}</p>}
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
