import { create } from "zustand"
import axios from "axios"
import storeAuth from "./storeAuth"
import { toast } from "react-toastify"

const storeProfile = create((set) => ({
    user: null,
    
    setUser: (user) => set({ user }),
    
    profile: async () => {
    try {
        const { token, rol } = storeAuth.getState()
        
        if (!token) return

        const baseUrl = import.meta.env.VITE_BACKEND_URL
        
        // --- LA MEJORA AQUÍ ---
        // Si no hay rol, usamos una ruta genérica o decodificamos el rol del token
        let url = `${baseUrl}/api/user/perfil` 
        
        if (rol === 'admin') url = `${baseUrl}/api/perfil`
        else if (rol === 'docente') url = `${baseUrl}/api/docente/perfil`
        // -----------------------

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        set({ user: response.data })
        
        // IMPORTANTE: Si el perfil trae el rol, actualiza el store de Auth también
        if(response.data.rol) {
            // storeAuth.getState().setRol(response.data.rol) 
        }

        return response.data
        
    } catch (error) {
        console.error('Error al cargar perfil:', error)
        
        // No redirijas al login inmediatamente si es el primer intento
        if (error.response?.status === 401) {
             // storeAuth.getState().clearToken()
             // window.location.href = '/login' 
        }
        return null
    }
},
    updateProfile: async (data) => {
    try {
        const { token, rol } = storeAuth.getState()
        
        if (!token) {
            toast.error("No hay sesión activa")
            return null
        }

        const baseUrl = import.meta.env.VITE_BACKEND_URL
        
        let url = `${baseUrl}/api/user/perfil`
        
        if (rol === 'admin') url = `${baseUrl}/api/perfil`
        else if (rol === 'administrador') url = `${baseUrl}/api/administrador/perfil`
        else if (rol === 'docente') url = `${baseUrl}/api/docente/perfil`

        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        set({ user: response.data })
        toast.success("Perfil actualizado correctamente")
        return response.data
        
    } catch (error) {
        console.error('Error al actualizar perfil:', error)
        
        if (error.response?.status === 401) {
            toast.error("Sesión expirada")
            // storeAuth.getState().clearToken()
            // window.location.href = '/login'
        } else {
            toast.error(error.response?.data?.msg || "Error al actualizar perfil")
        }
        return null
    }
},
    updatePasswordProfile: async (data) => {
    try {
        const { token, rol } = storeAuth.getState()
        
        if (!token) {
            toast.error("No hay sesión activa")
            return null
        }

        const baseUrl = import.meta.env.VITE_BACKEND_URL
        
        let url = `${baseUrl}/api/user/password`
        
        if (rol === 'admin') url = `${baseUrl}/api/password`
        else if (rol === 'administrador') url = `${baseUrl}/api/administrador/password`
        else if (rol === 'docente') url = `${baseUrl}/api/docente/password`

        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        toast.success("Contraseña actualizada correctamente")
        return response.data
        
    } catch (error) {
        console.error('Error al actualizar contraseña:', error)
        
        if (error.response?.status === 401) {
            toast.error("Sesión expirada")
            //storeAuth.getState().clearToken()
            //window.location.href = '/login'
        } else {
            toast.error(error.response?.data?.msg || "Error al actualizar contraseña")
        }
        return null
    }
},
    clearUser: () => set({ user: null })
    
}))

export default storeProfile