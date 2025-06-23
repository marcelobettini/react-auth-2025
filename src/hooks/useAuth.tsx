import { useState, useEffect, createContext, useContext } from 'react'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../config/firebase'
import { type AuthContextType, type AuthProviderProps } from '../types/auth'
import { getFirebaseErrorMessage } from '../lib/getFirebaseErrorMessage'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider')
    }
    return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    // Función helper para refrescar el usuario actual
    const refreshCurrentUser = async (): Promise<void> => {
        if (auth.currentUser) {
            await auth.currentUser.reload()
            // Forzar que onAuthStateChanged se dispare
            setUser({ ...auth.currentUser })
        }
    }

    const signIn = async (email: string, password: string): Promise<void> => {
        try {
            setError(null)
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: any) {
            setError(getFirebaseErrorMessage(error.code))
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email: string, password: string, userName: string): Promise<User> => {
        try {
            setError(null)
            setLoading(true)

            // Paso 1: Crear usuario con email y contraseña
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log('Usuario creado:', userCredential.user.email) // Debug

            // Paso 2: Actualizar perfil con displayName
            await updateProfile(userCredential.user, {
                displayName: userName
            })
            console.log('Perfil actualizado con displayName:', userName) // Debug

            // Paso 3: Recargar el usuario para reflejar los cambios
            await userCredential.user.reload()
            console.log('Usuario recargado, displayName:', userCredential.user.displayName) // Debug

            // Paso 4: Crear nuevo objeto user para forzar re-render
            const updatedUser = { ...auth.currentUser! }
            setUser(updatedUser)
            console.log('Estado actualizado con usuario:', updatedUser.displayName) // Debug

            // Retornar el usuario actualizado
            return updatedUser

        } catch (error: any) {
            setError(getFirebaseErrorMessage(error.code))
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signInWithGoogle = async (): Promise<void> => {
        try {
            setError(null)
            setLoading(true)
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
        } catch (error: any) {
            setError(getFirebaseErrorMessage(error.code))
            throw error
        } finally {
            setLoading(false)
        }
    }

    const logout = async (): Promise<void> => {
        try {
            setError(null)
            await signOut(auth)
        } catch (error: any) {
            setError(getFirebaseErrorMessage(error.code))
            throw error
        }
    }

    const resetPassword = async (email: string): Promise<void> => {
        try {
            setError(null)
            await sendPasswordResetEmail(auth, email)
        } catch (error: any) {
            setError(getFirebaseErrorMessage(error.code))
            throw error
        }
    }

    const value: AuthContextType = {
        user,
        loading,
        error,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
        resetPassword,
        refreshCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}