import { ZodType } from "zod";

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

export type ClasificationProps = {
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
        id: number;
        numeroDocumento: string;
        tipoDocumento: string;
        correo: string;
        telefono: string;
        celular: number;
        nombres: string;
        apellidos: string;
        direccion: string;
        permisos: string;
        metodoPago: string;
        fechaCreacion: string;
        fechaModificacion: string;
        contraseña: string;
        datosActualizados: boolean;
}

export type NewsLetterProps ={
    id: number,
    title: string,
    Subtitle: string,
    text: string,
    date: string,
    img: string
}

export type PayMethodProps = {
    id: number,
    metodo: string,
    img: string
}

export type ReviewsProps = {
    id: number, 
    first_name: string,
    last_name: string,
    date: string,
    review: string,
    rank: number, 
    key_points: string
}

export type discountProps = {
    id: number,
    nombre: string, 
    descripcion: string, 
    porcentaje: number,
    active: boolean,
    fechaCreacion: string, 
    fechaModificacion: string
}

export type FormProps<T, U extends {id? : number | string, nombre?: string}> = {
    className?: string,
    modal?: boolean,
    data?: T | null,
    dataName: string,
    schequema: ZodType,
    inputsList: InputsListProps<U>[]
    children?: React.ReactElement<any>;
};

export type InputsListProps<U extends {id? : number | string, nombre?: string}> = {
    type?: string,
    id: string,
    groupData?: boolean,
    name: string,
    extraData?: U[] | null,
    className?: String
    secondId?: string;
}