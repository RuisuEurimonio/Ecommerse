import { ZodType } from "zod";

export type ArticleProps = {
    id: number,
    nombre: string,
    descripcion: string,
    sku: number,
    precio: number,
    imagen: string,
    categoria: CategoryProps,
    clasificacion: ClasificationProps,
    descuento: DiscountProps,
    marca: BrandProps,
    fechaCreacion: string,
    fechaModificacion: string,
    detalleCarrito: any[]
}

export type CategoryProps = {
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

export type DiscountProps = {
    id: number,
    nombre: string, 
    descripcion: string, 
    porcentaje: number,
    activo: boolean,
    fechaCreacion: string, 
    fechaModificacion: string
}


export type BrandProps = {
    id: number,
    nombre: string,
    descripcion: string,
    fechaCreacion: String,
    fechaModificacion: String
}

export type UserProps = {
        id: number;
        numeroDocumento: string;
        tipoDocumento: TypeDocumentProps;
        correo: string;
        telefono: string;
        celular: number;
        nombres: string;
        apellidos: string;
        direccion: string;
        permisos: RolProps;
        metodoPago: PayMethodProps;
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

export type ReviewsProps = {
    id: number, 
    first_name: string,
    last_name: string,
    date: string,
    review: string,
    rank: number, 
    key_points: string
}


export type FormProps<T, U extends {id? : number | string, nombre?: string}> = {
    className?: string,
    modal?: boolean,
    data?: T | null,
    dataName: string,
    schequema: ZodType,
    inputsList: InputsListProps<U>[]
    children?: React.ReactElement<any>
    isLoginRegister?: boolean
    isSaveSession?: boolean
    updateInfo?: boolean
    nullInput?: boolean
    urlFetch: string,
    customFunction?: () => void;
    customFunctionWithData?: (data: any) => void;
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

export type TypeDocumentProps = {
    id: number,
    nombre: string,
    descripcion: string,
    abreviacion: string,
    fechaCreacion: string,
    fechaModificacion: string
}

export type RolProps = {
    id: number,
    nombre: string,
    descripcion: string,
    fechaCreacion: string,
    fechaModificacion: string
}

export type subDataTableProps<T> = {
    className?: string,
    type?: "boolean" | "combined" | "object" | "text",
    hiddenMobile?: boolean,
    secondObject?: string,
    mergeData?: keyof T,
    columnName: keyof T;
}

export type typePayMethodProps = {
    id: number,
    tipo: string,
    porcentajeAumento: number
}

export type PayMethodProps = {
    id: number,
    numero: string,
    expira: string,
    proveedor: string,
    tipo_id: TypeDocumentProps
}

export type PayMethodAccepted = {
    id: number, 
    metodo: string,
    img: string
}