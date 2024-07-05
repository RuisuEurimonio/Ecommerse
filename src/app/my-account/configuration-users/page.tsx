"use client"

import { useEffect, useState } from "react";

import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";

import { UserProps } from "@/types/Props";

import { userSchequema } from "@/utils/Schemas/userSchema";
import usersFake from "@/utils/json/usersFake.json";
import { getUsersApi } from "@/data/api";
import NoDataTable from "@/components/NoDataTable";

type ConfigurationUsersProps = {
    
};

const perPage : number = 20;

const titlesTableError = [
    {titleName: "Usuarios"},
]

const dataTableError = [
    {columnName: "No se encontro información de usuarios"}
]

const titlesTable = [
    {titleName: "Documento"},
    {titleName: "Nombres"},
    {className:"md:hidden lg:table-cell", titleName: "Celular"},
    {titleName: "Correo"},
    {titleName: "Rol"},
]

const subDataTable : {className?: string, type?: string, hiddenMobile?: boolean, mergeData?: keyof UserProps , columnName: keyof UserProps}[] = [
    {columnName: "id"},
    {type: "combined", mergeData: "tipoDocumento", columnName: "numeroDocumento"},
    {type: "combined", mergeData: "apellidos" ,columnName: "nombres"},
    {hiddenMobile: true, columnName: "celular"},
    {columnName: "correo"},
    {columnName: "permisos"},
]

const document = [
    { nombre: "Tarjeta de identidad", otherData: "TI", id: "tarjetaIdentidad" },
    { nombre: "Cedula de Ciudadania", otherData: "CC", id: "cedulaCiudadania"},
    { nombre: "Cedula de extranjeria", otherData: "CED", id: "cedulaExtranjeria" },
];

const inputsForm = [
    {type: "combined", id: "numeroDocumento", name: "Documento", extraData: document, secondId: "tipoDocumento"},
    {type: "text", id: "nombres", name: "Nombre"},
    {type: "text", id: "apellidos", name: "Apellidos"},
    {type: "text", id: "telefono", name: "Teléfono"},
    {type: "text", id: "direccion", name: "Dirección"},
    {type: "text", id: "correo", name: "Correo"}
]

const ConfigurationUsers: React.FC<ConfigurationUsersProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataUserSelect, setDataUserSelect] = useState<UserProps | null>(null);
    const [keyModal, setKeyModal] = useState("");
    const [data, setData] = useState<UserProps[] | null>();

    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataUserSelect(null);
    }

    function openCloseSubModal(data: UserProps){
        if(modalVisible){
            setDataUserSelect(null);
        }else{
            setDataUserSelect(data);
        }
        setKeyModal(data.correo)
        setModalVisible(!modalVisible);
    }

    useEffect(()=>{
        const get = async () =>{
            const response = await getUsersApi();
            if(response){
                setData(response);
            }else{
                console.log("Datos no encontrados")
            }
            
        }

        get();
    },[])

    return (
        <div
            className="md:flex-1">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2">Usuarios.</h2>
                <div className="w-full relative overflow-x-auto">
                    {data?
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal} titles={titlesTable} subData={subDataTable} />
                    :
                    <NoDataTable message="No se encontro información de usuarios registrados." secondaryMessage="Ingresa algún usuario por medio del botón inferior." />
                }
            </div>
            {data && <div className="bg-blue-mafer p-2 flex flex-col-reverse items-center rounded-sm">
                    <Numeration dataLength={data.length} itemsByPage={perPage} />
            </div>}
            <button className="float-right my-4 py-1 px-4 bg-blue-mafer text-white-mafer rounded-sm hover:scale-105 transition"
                onClick={openCloseModal}
            > Agregar. </button>
        </div>
        <Modal key={keyModal} openCloseModal={openCloseModal} state={modalVisible}>
            <div className="w-full relative">
                <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
            </div>
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataUserSelect == null ? "Agregar" : "Actualizar"} usuario. </h2>
            <Form className="w-11/12 h-full" modal data={dataUserSelect} schequema={userSchequema} dataName="Usuario" inputsList={inputsForm} />
        </Modal>
    </div>
    );
};

export default ConfigurationUsers;

