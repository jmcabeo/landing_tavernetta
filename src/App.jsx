import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MenuHighlights from './components/MenuHighlights';
import Footer from './components/Footer';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';
import './index.css';

// Componente para la página pública principal
const PublicHome = () => (
    <>
        <Navbar />
        <Hero />
        <About />
        <MenuHighlights />
        <Footer />
    </>
);

// Componente protector para rutas privadas
const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
    return isAuthenticated ? children : <Navigate to="/admin" />;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAdminAuthenticated') === 'true'
    );

    const handleLogin = (status) => {
        if (status) {
            localStorage.setItem('isAdminAuthenticated', 'true');
            setIsAuthenticated(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<PublicHome />} />
                    <Route
                        path="/admin"
                        element={
                            isAuthenticated ?
                                <Navigate to="/admin/dashboard" /> :
                                <Login onLogin={handleLogin} />
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            isAuthenticated ?
                                <Dashboard onLogout={handleLogout} /> :
                                <Navigate to="/admin" />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
