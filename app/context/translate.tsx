/**
 * Translates a user role from its code to a human-readable format.
 * 
 * @param {string} rol - The role code to translate.
 * @returns {string} - The translated role name.
 */
const translateRol = (rol: string): string => {
    switch (rol) {
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

export default translateRol;
