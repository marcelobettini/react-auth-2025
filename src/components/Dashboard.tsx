import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth()

    const handleLogout = async (): Promise<void> => {
        try {
            await logout()
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
        }
    }

    return (
        <div >
            <nav >
                <div >
                    <div >
                        <h1 >Dashboard</h1>
                        <div >
                            <span >
                                Hola, {user?.email}
                            </span>
                            <button
                                onClick={handleLogout}

                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main >
                <div>
                    <div>
                        <div>
                            <h2>
                                ¡Bienvenido a tu Dashboard! {user?.displayName}
                            </h2>
                            <p >
                                Usuario autenticado: {user?.email}
                            </p>


                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard