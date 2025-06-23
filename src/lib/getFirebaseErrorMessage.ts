export const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'No existe una cuenta con este email'
        case 'auth/wrong-password':
            return 'Contraseña incorrecta'
        case 'auth/email-already-in-use':
            return 'Ya existe una cuenta con este email'
        case 'auth/weak-password':
            return 'La contraseña debe tener al menos 6 caracteres'
        case 'auth/invalid-email':
            return 'Email inválido'
        case 'auth/too-many-requests':
            return 'Demasiados intentos fallidos. Intenta más tarde'
        case 'auth/user-disabled':
            return 'Esta cuenta ha sido deshabilitada'
        case 'auth/operation-not-allowed':
            return 'Operación no permitida'
        case 'auth/invalid-credential':
            return 'Credenciales inválidas'
        default:
            return 'Error de autenticación'
    }
}
