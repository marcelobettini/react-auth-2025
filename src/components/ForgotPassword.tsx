import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const ForgotPassword = () => {
    const { resetPassword, error } = useAuth()
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setMessage('')
            setLoading(true)
            await resetPassword(email)
            setMessage('Revisa tu email para restablecer tu contraseña. Si no lo ves en tu bandeja de entrada, revisa la carpeta de spam.')
        } catch (error) {
            console.error('Error al enviar email de recuperación:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar email de recuperación'}
            </button>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </form>
    )
}
export default ForgotPassword