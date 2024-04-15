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