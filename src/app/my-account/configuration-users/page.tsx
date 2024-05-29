"use client"

import FormUser from "@/components/FormUser";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import usersFake from "@/utils/json/usersFake.json";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type ConfigurationUsersProps = {};

const data = usersFake;

const perPage : number = 20;

const ConfigurationUsers: React.FC<ConfigurationUsersProps> = () => {

    const searchParam = useSearchParams();
    const pageNum = (searchParam.get('page') || 1) as number;

    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState("");

    function openCloseModal(){
        setModalVisible(!modalVisible);
    }

    return (
        <div
            className="
                md:flex-1
            ">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2">Usuarios.</h2>
                <div className="w-full relative overflow-x-auto">
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
                                        <button className="mx-1 hover:scale-105 transition">
                                            <span className="icon icon-delete text-base"></span>
                                        </button>
                                        <button className="mx-1 hover:scale-105 transition">
                                            <span className="icon icon-edit text-base"></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
            <div className="bg-blue-mafer rounded-sm flex flex-col items-center">
                <div>
                    <Numeration dataLength={data.length} itemsByPage={10} />
                </div>
            </div>
            <button className="float-right my-4 py-1 px-4 bg-blue-mafer text-white-mafer rounded-sm hover:scale-105 transition"
                onClick={()=>{setType("post") ,openCloseModal()}}
            > Agregar. </button>
        </div>
        <Modal openCloseModal={openCloseModal} state={modalVisible}>
            <div className="w-full relative">
                <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
            </div>
            <h2 className="font-bold text-blue-mafer text-xl m-2"> Agregar usuario. </h2>
            <FormUser className="w-11/12 h-full" modal/>
        </Modal>
    </div>
    );
};

export default ConfigurationUsers;
