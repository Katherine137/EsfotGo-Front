// GoogleCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storeAuth from "../context/storeAuth";
import storeProfile from "../context/storeProfile";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const { setAuth } = storeAuth();
    const { profile } = storeProfile();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const id = params.get('id');
        const rol = params.get('rol');
        
        if (token && id) {
            setAuth(token, rol || 'user', id);
            profile().then(() => {
                navigate('/dashboard');
            }).catch(() => {
                navigate('/login');
            });
        } else {
            // Si no hay token, redirigir al login
            navigate('/login');
        }
    }, [navigate, setAuth, profile]);

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Iniciando sesión con Google...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;