"use client"

import { UserProps } from "@/types/Props";
import { useSearchParams } from "next/navigation";
import  Swal  from "sweetalert2"
import { deleteAlert } from "./utils";

type TableUserProps = {
    data: UserProps[],
    perPage: number,
    openCloseSubModal: (data: UserProps) => void;
}

const TableUser : React.FC<TableUserProps> = ({data, perPage, openCloseSubModal}) => {

    const searchParam = useSearchParams();
    const pageNum = (searchParam.get('page') || 1) as number;

    return(
        <table className="table-fixed w-full">
                        <thead className="bg-blue-mafer text-white text-sm
                                xl:text-base
                            ">
                            <tr>
                                <th scope="col" className="px-1 w-10">#</th>
                                <th scope="col" className="px-1 w-24">Documento.</th>
                                <th scope="col" className="px-1 w-24">Nombres.</th>
                                <th scope="col" className="px-1 w-24 md:hidden lg:table-cell">Celular.</th>
                                <th scope="col" className="px-1 w-32">Correo.</th>
                                <th scope="col" className="px-1 w-24">Permisos.</th>
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
                                    <td scope="row" className="py-2 px-2">{data.tipoDocumento} {data.numeroDocumento}</td>
                                    <td scope="row" className="py-2 px-2">{data.nombres} {data.apellidos}</td>
                                    <td scope="row" className="py-2 px-2 md:hidden lg:table-cell">{data.celular}</td>
                                    <td scope="row" className="py-2 px-2">{data.correo}</td>
                                    <td scope="row" className="py-2 px-2">{data.permisos}</td>
                                    <td scope="row" className="py-2 px-2">
                                        <button className="mx-1 hover:scale-105 transition" onClick={()=>{deleteAlert(data.nombres, "Marca")}}>
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

export default TableUser;