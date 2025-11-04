// Error message mappings for GraphQL error codes in Spanish
export const ERROR_MESSAGES = {
    // General Errors
    INTERNAL_SERVER_ERROR: "Error interno del servidor",
    INVALID_OBJECT_ID: "ID de objeto inválido",
    REFERENCE_REQUIRED: "Se requiere referencia para pagos con criptomonedas/teléfono",
    FILE_UPLOAD_ERROR: "Error al subir archivo",
    SUBSCRIPTION_NOT_FOUND: "Suscripción no encontrada",
    BET_NOT_FOUND: "Apuesta no encontrada",
    USER_ALREADY_SUBSCRIBED: "El usuario ya tiene una suscripción",
    FREE_TIER_BETTING_NOT_ALLOWED: "Las apuestas no están permitidas para suscripciones de nivel gratuito",
    FREE_TIER_TABLE_ACCESS_DENIED: "Acceso denegado: la suscripción de nivel gratuito solo permite acceso a mesa seleccionada",

    // Probability Service Errors
    UNSUPPORTED_STRATEGY: "Estrategia no soportada",
    NO_NUMBERS_PROVIDED: "No se proporcionaron números para el cálculo de probabilidad",

    // AWS Service Errors
    AWS_CONFIG_LOAD_ERROR: "No se pudo cargar la configuración del SDK de AWS",

    // Authentication Errors
    USER_NOT_FOUND: "Usuario no encontrado",
    USER_NOT_ACTIVE: "Usuario no activo",
    UNAUTHORIZED_ERROR: "Usuario no autenticado",
    INVALID_CREDENTIALS: "Credenciales inválidas",
    TOKEN_GENERATION_FAILED: "Error al generar token",
    EMAIL_SENDING_FAILED: "Error al enviar correo electrónico",
    PASSWORD_HASHING_FAILED: "Error al hashear contraseña",
    USER_ALREADY_EXISTS: "Ya existe un usuario con este correo electrónico",
    INVALID_BIRTH_DATE: "Formato de fecha de nacimiento inválido, por favor usa formato RFC3339",
    INVALID_OR_EXPIRED_TOKEN: "Token inválido o expirado",
    INVALID_TOKEN_CLAIMS: "Reclamaciones de token inválidas",
    INVALID_USER_ID_IN_TOKEN: "ID de usuario inválido en el token",
    INVALID_EMAIL_IN_TOKEN: "Correo electrónico inválido en el token",
    INVALID_USER_ID: "ID de usuario inválido",
    USER_ALREADY_ACTIVE: "El usuario ya está activo",

    // Roulette Errors
    NO_TABLE_INFO_PROVIDED: "No se proporcionó información de la mesa",
    INVALID_DATE_FORMAT: "Formato de fecha inválido, usa YYYY-MM-DD",
    PROBABILITY_CALCULATION_FAILED: "Error al calcular probabilidades",
    LIMIT_ROULETTE_TABLE_NUMBERS_EXCEEDED: "Se excedió el límite de números de la mesa de ruleta (máximo 100)",

    // Additional common error codes that might be used
    BAD_REQUEST: "Solicitud incorrecta",
    NOT_FOUND: "No encontrado",
    FORBIDDEN: "Acceso prohibido",
    CONFLICT: "Conflicto de datos",
    VALIDATION_ERROR: "Error de validación",
    NETWORK_ERROR: "Error de red",
    TIMEOUT_ERROR: "Error de tiempo de espera",
    ACTIVE_BET_EXISTS: "Ya existe una apuesta activa para este tipo de juego",
} as const;

export type ErrorCode = keyof typeof ERROR_MESSAGES;

/**
 * Get error message by error code
 * @param code - The error code
 * @returns The Spanish error message or a default message if code not found
 */
export const getErrorMessage = (code: string): string => {
    return ERROR_MESSAGES[code as ErrorCode] || `Error desconocido: ${code}`;
};

/**
 * Get error message from GraphQL error
 * @param error - GraphQL error object
 * @returns The Spanish error message
 */
export const getGraphQLErrorMessage = (error: unknown): string => {
    if (error && typeof error === 'object' && 'graphQLErrors' in error) {
        const graphQLError = (error as {
            graphQLErrors: Array<{
                code?: string;
                message?: string;
                extensions?: {
                    code?: string;
                };
            }>
        }).graphQLErrors[0];

        if (graphQLError) {
            // Check for error code in extensions first, then in code, then in message
            const errorCode = graphQLError.extensions?.code || graphQLError.code || graphQLError.message || '';
            return getErrorMessage(errorCode);
        }
    }

    if (error && typeof error === 'object' && 'networkError' in error) {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }

    return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
}; 