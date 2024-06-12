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
            return "Student";
        case "company":
            return "Company";
        case "teacher":
            return "Teacher";
        default:
            return "Undefined role";
    }
}

export default translateRol;
