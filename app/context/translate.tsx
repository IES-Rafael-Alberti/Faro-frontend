const translateRol = (rol : string) => {
    switch (rol) {
        case "admin":
            return "Administrador";
        case "student":
            return "Estudiante";
        case "company":
            return "Empresa";
        case "teacher":
            return "Profesor";
        default:
            return "Rol no definido";
    }
}

export default translateRol;