"use client"

import FormUser from "@/components/FormUser";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";
import { UserProps } from "@/types/Props";
import usersFake from "@/utils/json/usersFake.json";
import { useState } from "react";

type ConfigurationUsersProps = {};

const data = usersFake;

const perPage : number = 20;

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

const ConfigurationUsers: React.FC<ConfigurationUsersProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataUserSelect, setDataUserSelect] = useState<UserProps | null>(null);
    const [keyModal, setKeyModal] = useState("");

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

    return (
        <div
            className="
                md:flex-1
            ">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2">Usuarios.</h2>
                <div className="w-full relative overflow-x-auto">
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal} titles={titlesTable} subData={subDataTable} />
            </div>
            <div className="bg-blue-mafer p-2 flex flex-col-reverse items-center rounded-sm">
                    <Numeration dataLength={data.length} itemsByPage={perPage} />
            </div>
            <button className="float-right my-4 py-1 px-4 bg-blue-mafer text-white-mafer rounded-sm hover:scale-105 transition"
                onClick={openCloseModal}
            > Agregar. </button>
        </div>
        <Modal key={keyModal} openCloseModal={openCloseModal} state={modalVisible}>
            <div className="w-full relative">
                <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
            </div>
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataUserSelect == null ? "Agregar" : "Actualizar"} usuario. </h2>
            <FormUser className="w-11/12 h-full" modal data={dataUserSelect}/>
        </Modal>
    </div>
    );
};

export default ConfigurationUsers;
