export type CardProductProps = {
    id: number;
    image: string;
    nombre: string;
    descripcion: string;
    SKU: string;
    precio: string;
    marca: string;
    clasificacion: string;
    descuento: boolean;
    categoria: string;
}

export type ObjBranchProps = {
    id: number,
    nombre: string,
    descripcion: string,
    fechaCreacion: String,
    fechaModificacion: String
}

export type ClassificationProps = {
    id: number,
    nombre: string,
    descripcion: string,
    fechaCreacion: String,
    fechaModificacion: String
}

export type CategoryProps = {
    id: number,
    nombre: string,
    descripcion: string,
    fechaCreacion: String,
    fechaModificacion: String
}

export type UserProps = {
    id: number,
    numeroDocumento?: string,
    tipoDocumento?: string,
    correo: string,
    telefono?: string,
    celular: string,
    nombres: string,
    apellidos: string,
    direccion: string,
    permisos: "Usuario" | "Administrador",
    metodoPago: number,
    fechaCreacion: string,
    fechaModificacion: string,
    contraseña: string,
    datosActualizados: boolean
}

export type NewsLetterProps ={
    id: number,
    title: string,
    Subtitle: string,
    text: string,
    date: string,
    img: string
}