import { type User } from 'firebase/auth'

export interface AuthContextType {
    user: User | null
    loading: boolean
    error: string | null
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string, userName: string) => Promise<User>
    signInWithGoogle: () => Promise<void>
    logout: () => Promise<void>
    resetPassword: (email: string) => Promise<void>
    refreshCurrentUser: () => Promise<void>
}

export interface AuthProviderProps {
    children: React.ReactNode
}

export interface ProtectedRouteProps {
    children: React.ReactNode
}