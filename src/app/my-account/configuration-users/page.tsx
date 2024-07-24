"use client"

import { useEffect, useState } from "react";

import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";

import { RolProps, subDataTableProps, TypeDocumentProps, UserProps } from "@/types/Props";

import { userSchequema } from "@/utils/Schemas/userSchema";
import NoDataTable from "@/components/NoDataTable";
import { getElementsApi } from "@/data/api";
import { userSchequemaFull } from "@/utils/Schemas/userSchemaFull";

type ConfigurationUsersProps = {
    
};

const perPage : number = 20;

const titlesTable = [
    {titleName: "Documento"},
    {titleName: "Nombres"},
    {className:"md:hidden lg:table-cell", titleName: "Celular"},
    {titleName: "Correo"},
    {titleName: "Rol"},
]

const subDataTable : subDataTableProps<any>[] = [
    {columnName: "id"},
    {type: "combined", mergeData: "tipoDocumento", columnName: "numeroDocumento", secondObject: "abreviacion"},
    {type: "combined", mergeData: "apellidos" ,columnName: "nombres"},
    {hiddenMobile: true, columnName: "celular"},
    {columnName: "correo"},
    {type:"object", columnName: "permisos", secondObject: "nombre"},
]

const ConfigurationUsers: React.FC<ConfigurationUsersProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataUserSelect, setDataUserSelect] = useState<UserProps | null>(null);
    const [keyModal, setKeyModal] = useState("");
    const [data, setData] = useState<UserProps[] | null>();
    const [updateData, setUpdateData] = useState(false);
    const [dataDocument, setDataDocument] = useState<TypeDocumentProps[] | null>(null);
    const [permissions, setPermissions] = useState<RolProps[] | null>(null);

    const inputsForm = [
        {type: "combined", id: "numeroDocumento", name: "Documento", extraData: dataDocument, secondId: "tipoDocumento"},
        {type: "text", id: "nombres", name: "Nombre"},
        {type: "text", id: "apellidos", name: "Apellidos"},
        {type: "text", id: "telefono", name: "Teléfono"},
        {type: "text", id: "celular", name: "Celular"},
        {type: "text", id: "direccion", name: "Dirección"},
        {type: "text", id: "correo", name: "Correo"},
        {type: "select", id: "permisos", name: "Permisos", extraData: permissions}
    ]

    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataUserSelect(null);
        setUpdateData(false);
    }

    function openCloseSubModal(data: UserProps){
        if(modalVisible){
            setDataUserSelect(null);
        }else{
            setDataUserSelect(data);
        }
        setKeyModal(data.correo)
        setModalVisible(!modalVisible);
        setUpdateData(true);
    }

    const get = async () =>{
        const response = await getElementsApi("http://localhost:8080/api/usuario/all");
        if(response){
            setData(response);
        }
    }

    function createOrUpdateElements(){
        openCloseModal();
        get();
    }

    useEffect(()=>{
        const getDataDocument = async () =>{
            const data = await getElementsApi("http://localhost:8080/api/usuario/documento/all");
            if(data){
                setDataDocument(data);
            }
        }
        const getDataPermissions = async () =>{
            const data = await getElementsApi("http://localhost:8080/api/usuario/permiso/all");
            if(data){
                setPermissions(data);
            }
        }
        getDataPermissions();
        getDataDocument();
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
            <div className="bg-secondary-color text-third-color flex flex-col-reverse items-center rounded-sm min-h-5">
                    {data && <Numeration className="text-third-color" dataLength={data.length} itemsByPage={perPage} />}
            </div>
            <button className="float-right my-4 py-1 px-4 bg-secondary-color text-third-color rounded-sm hover:scale-105 transition"
                onClick={openCloseModal}
            > Agregar. </button>
        </div>
        <Modal key={keyModal} openCloseModal={openCloseModal} state={modalVisible}>
            <div className="w-full relative">
                <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
            </div>
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataUserSelect == null ? "Agregar" : "Actualizar"} usuario. </h2>
            <Form className="w-11/12 h-full"
                  modal
                  data={dataUserSelect}
                  schequema={updateData ? userSchequema : userSchequemaFull}
                  dataName="Usuario"
                  inputsList={updateData ? inputsForm : [...inputsForm, {type:"password", id: "contrasena", name: "Contraseña"}]} 
                  customFunction={createOrUpdateElements}
                  urlFetch="usuario"
                  updateInfo={updateData}
                  />
        </Modal>
    </div>
    );
};

export default ConfigurationUsers;

