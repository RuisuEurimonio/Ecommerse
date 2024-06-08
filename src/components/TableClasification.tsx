"use client"

import { ClasificationProps } from "@/types/Props";
import { useSearchParams } from "next/navigation";
import { deleteAlert } from "./utils";

type TableClasificationProps = {
    data: ClasificationProps[],
    perPage: number,
    openCloseSubModal: (data: ClasificationProps) => void;
}

const TableClasification : React.FC<TableClasificationProps> = ({data, perPage, openCloseSubModal}) => {

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
                                <th scope="col" className="px-1 w-24">Descripcion.</th>
                                <th scope="col" className="px-1 w-24 md:hidden lg:table-cell">Fecha creación.</th>
                                <th scope="col" className="px-1 w-24 md:hidden lg:table-cell">Fecha Modificación.</th>
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
                                    <td scope="row" className="py-2 px-2"><p className="line-clamp-3"> {data.descripcion} </p></td>
                                    <td scope="row" className="py-2 px-2 md:hidden lg:table-cell">{data.fechaCreacion}</td>
                                    <td scope="row" className="py-2 px-2 md:hidden lg:table-cell">{data.fechaModificacion}</td>
                                    <td scope="row" className="py-2 px-2">
                                        <button className="mx-1 hover:scale-105 transition" onClick={()=>{deleteAlert(data.nombre, "Marca")}}>
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

export default TableClasification;