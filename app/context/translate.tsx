/**
 * Translates a user role from english to spanish.
 * 
 * @param {string} rol - The role to translate.
 * @returns {string} - The translated role name.
 */
export const translateRol = (rol: string): string => {
    switch (rol?.toLowerCase()) {
        case "admin":
            return "Administrator";
        case "student":
            return "Estudiante";
        case "company":
            return "Empresa";
        case "teacher":
            return "Profesor";
        default:
            return "Sin rol asignado";
    }
}

/**
 * Translates a type from english to spanish.
 * 
 * @param {string} type - The type to translate.
 * @returns {string} - The translated type name.
 */
export const translateType = (type: string): string => {
    switch (type) {
        case "education":
            return "estudios";
        case "experience":
            return "experiencias";
        case "recommendations":
            return "recomendaciones";
        case "profile":
            return "información de perfil";
        default:
            return "nada";
    }
}

