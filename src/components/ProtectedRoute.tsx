import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { type ProtectedRouteProps } from '../types/auth'

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth()
    if (loading) {
        return (

            <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>Cargando...</span>
            </div>

        )
    }
    return user ? <>{children}</> : <Navigate to="/login" replace />
}