"use client"

import { useSearchParams } from "next/navigation";
import { deleteAlert } from "./utils";

type TableGeneralProps<T extends { id: number, }> = {
    data: T[],
    perPage: number,
    openCloseSubModal: (data: T) => void,
    titles: {
        className?: string,
        titleName: string,
    }[],
    subData: {
        className?: string,
        type?: string,
        columnName: keyof T;
    }[]
};


const TableGeneral = <T extends { id: number },>({ data, perPage, openCloseSubModal, titles, subData }: TableGeneralProps<T>) => {

    
const renderCell = (value: T[keyof T], type: string = "text", className: string = "") =>{
    switch(type){
        case "boolean":
            return value ? <span className={className}> Activo </span> : <span className={className}> Inactivo </span>
        default:
            return <p className={`text-center ${className}`}> {String(value)} </p>
    }
}

    const searchParam = useSearchParams();
    const pageNum = (searchParam.get('page') || 1) as number;

    return (
        <table className="table-fixed w-full">
            <thead className="bg-blue-mafer text-white text-sm
                                xl:text-base
                            ">
                <tr>
                    <th scope="col" className="px-1 w-10">#</th>
                    {titles.map((data) => (
                        <th key={data.titleName} scope="col" className={`px-1 w-24 ${data.className}`}> {data.titleName} </th>
                    ))}
                    <th scope="col" className="px-1 w-24">Opciones.</th>
                </tr>
            </thead>
            <tbody>
                {data.slice(perPage * (pageNum - 1), perPage * pageNum).map((item) => (
                    <tr key={item.id} className="text-center odd:bg-blue-mafer/10  break-words text-xs
                    xl:text-sm
                ">
                        {subData.map((sub) => (
                            <td key={String(sub.columnName)} scope="row" className={`py-2 px-2`}>
                                    {renderCell(item[sub.columnName] as T[keyof T], sub.type, sub.className)}
                            </td>
                        ))}
                        <td scope="row" className="py-2 px-2">
                            <button className="mx-1 hover:scale-105 transition" onClick={() => { deleteAlert(String(item.id), "Marca") }}>
                                <span className="icon icon-delete text-base"></span>
                            </button>
                            <button className="mx-1 hover:scale-105 transition" onClick={() => { openCloseSubModal(item) }}>
                                <span className="icon icon-edit text-base"></span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TableGeneral;