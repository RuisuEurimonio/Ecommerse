"use client"

import { CardProductProps } from "@/types/Props";
import { useSearchParams } from "next/navigation";
import  Swal  from "sweetalert2"

type TableArticleProps = {
    data: CardProductProps[],
    perPage: number,
    openCloseSubModal: (data: CardProductProps) => void;
}

const alert = (nombre:string) =>  {Swal.fire({
    title: "Eliminar articulo",
    text: "¿Estás seguro de eliminar al articulo: "+nombre,
    icon: "question",
    showCancelButton: true
}).then((response)=>{
    if(response.isConfirmed){
        let Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            icon: "success",
            timer: 1500,
            title: "Artículo "+nombre+" eliminado"
        })
        Toast.fire();
    }
})}

const TableArticle : React.FC<TableArticleProps> = ({data, perPage, openCloseSubModal}) => {

    const searchParam = useSearchParams();
    const pageNum = (searchParam.get('page') || 1) as number;

    return(
        <table className="table-fixed w-full">
                        <thead className="bg-blue-mafer text-white text-sm
                                xl:text-base
                            ">
                            <tr>
                                <th scope="col" className="px-1 w-10">#</th>
                                <th scope="col" className="px-1 w-24">Nombre.</th>
                                <th scope="col" className="px-1 w-24">Categoria.</th>
                                <th scope="col" className="px-1 w-24 md:hidden lg:table-cell">SKU.</th>
                                <th scope="col" className="px-1 w-32">descripción.</th>
                                <th scope="col" className="px-1 w-24">imagen.</th>
                                <th scope="col" className="px-1 w-24">Opciones.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(perPage * pageNum - perPage,
                                    perPage * pageNum).map((data) => (
                                <tr key={data.id} className="text-center odd:bg-blue-mafer/10  break-words text-xs
                                            xl:text-sm
                                        ">
                                    <td scope="row" className="py-2 px-2">{data.id}</td>
                                    <td scope="row" className="py-2 px-2">{data.nombre}</td>
                                    <td scope="row" className="py-2 px-2">{data.categoria} </td>
                                    <td scope="row" className="py-2 px-2 md:hidden lg:table-cell">{data.SKU}</td>
                                    <td scope="row" className="py-2 px-2">{data.descripcion}</td>
                                    <td scope="row" className="py-2 px-2">{data.image}</td>
                                    <td scope="row" className="py-2 px-2">
                                        <button className="mx-1 hover:scale-105 transition" onClick={()=>{alert(data.nombre)}}>
                                            <span className="icon icon-delete text-base"></span>
                                        </button>
                                        <button className="mx-1 hover:scale-105 transition" onClick={()=>{openCloseSubModal(data)}}>
                                            <span className="icon icon-edit text-base"></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}

export default TableArticle;