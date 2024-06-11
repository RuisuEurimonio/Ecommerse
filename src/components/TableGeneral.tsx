"use client"

import { useSearchParams } from "next/navigation";
import { deleteAlert } from "./utils";

type TableGeneralProps<T> = {
    data: T[],
    perPage: number,
    openCloseSubModal: (data: T) => void,
    titles: {
        className: string,
        titleName: string,
        value: string;
        dataAccess: keyof T;
    }[]
}

const TableGeneral = <T,>({data, perPage, openCloseSubModal, titles}: TableGeneralProps<T>)  => {

    const searchParam = useSearchParams();
    const pageNum = (searchParam.get('page') || 1) as number;

    return(
        <table className="table-fixed w-full">
                        <thead className="bg-blue-mafer text-white text-sm
                                xl:text-base
                            ">
                            <tr>
                                <th scope="col" className="px-1 w-10">#</th>
                                {titles.map((className, titleName) => (
                                    <th key={titleName} scope="col" className={`px-1 w-24 ${className}`}> {titleName} </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice(perPage * pageNum - perPage,
                                    perPage * pageNum).map((data) => (
                                <tr key={data.id} className="text-center odd:bg-blue-mafer/10  break-words text-xs
                                            xl:text-sm
                                        ">
                                    <td scope="row" className="py-2 px-2">{data.id}</td>
                                    {titles.map((className, value, dataAccess) => (
                                        <td key={dataAccess} scope="row" className={`py-2 px-2 ${className}`}> {value} </td>
                                    ))}
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

export default TableGeneral;