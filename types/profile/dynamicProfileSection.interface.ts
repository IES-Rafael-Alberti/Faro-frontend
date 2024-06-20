export interface Experiencia {
    id?: string;
    perfil?: string;
    compañia: string;
    posicion: string;
    fecha_inicio: Date | string;
    fecha_final: Date | string | null;
    descripcion: string;
}

export interface Educacion {
    id?: string;
    perfil?: string;
    institucion: string;
    titulo: string;
    fecha_inicio: Date | string;
    fecha_final: Date | string | null;
}