import { Navigate, useLocation } from "react-router" // Importa useLocation
import storeAuth from "../context/storeAuth"

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { token, rol } = storeAuth()
    const location = useLocation() // 1. Obtenemos la ubicación actual

    // 2. Revisamos si el token viene en la URL (?token=...)
    const params = new URLSearchParams(location.search)
    const tokenInUrl = params.get('token')

    // 3. Modificamos la condición: Si no hay token en el store NI en la URL...
    if (!token && !tokenInUrl) {
        return <Navigate to="/login" replace />
    }

    // El resto de tu código de roles está perfecto...
    if (allowedRoles.length > 0 && !allowedRoles.includes(rol)) {
        // ... (tu JSX de Acceso Denegado)
    }
    
    return children
}

export default ProtectedRoute