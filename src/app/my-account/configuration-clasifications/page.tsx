"use client"

import { useEffect, useState } from "react";

import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";
import Form from "@/components/Form";

import { ClasificationProps, subDataTableProps } from "@/types/Props";

import { ClasificationSchequema } from "@/utils/Schemas/clasificationSchema";
import NoDataTable from "@/components/NoDataTable";
import { getElementsApi } from "@/data/api";

type ConfigurationClasificationsProps = {};

const perPage : number = 20;

const titlesTable = [
    {titleName: "nombre"},
    {titleName: "descripción"},
    {className:"md:hidden lg:table-cell", titleName: "fecha creación"},
    {className:"md:hidden lg:table-cell", titleName: "fecha modificación"}
]

const subDataTable : subDataTableProps<any>[] = [
    {columnName: "id"},
    {columnName: "nombre"},
    {className:"line-clamp-3", columnName: "descripcion"},
    {hiddenMobile: true, columnName: "fechaCreacion"},
    {hiddenMobile: true, columnName: "fechaModificacion"}
]

const inputsForm = [
    {type: "text", id: "nombre", name: "Nombre"},
    {type: "textarea", id: "descripcion", name: "Descripción"},
]

const ConfigurationClasifications: React.FC<ConfigurationClasificationsProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataClasificationSelect, setDataClasificationSelect] = useState<ClasificationProps | null>(null);
    const [keyModal, setKeyModal] = useState("");
    const [data, setData] = useState<ClasificationProps[] | null>(null);

    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataClasificationSelect(null);
    }

    function openCloseSubModal(data: ClasificationProps){
        if(modalVisible){
            setDataClasificationSelect(null);
        }else{
            setDataClasificationSelect(data);
        }
        setKeyModal(data.nombre)
        setModalVisible(!modalVisible);
    }

    useEffect(()=>{
        const get = async () => {
            const data = await getElementsApi("http://localhost:8080/api/producto/clasificacion/all");
            if(data){
                setData(data);
            }
        }

        get();
    },[])

    return (
        <div
            className="md:flex-1">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2">Clasificaciones.</h2>
                <div className="w-full relative overflow-x-auto">
                    {data ?
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal} titles={titlesTable} subData={subDataTable} />
                    :
                    <NoDataTable message="No se encontraron datos de clasificaciones" secondaryMessage="Ingresa una nueva clasificación por medio del botón inferior." />
                }
            </div>
            <div className="bg-blue-mafer min-h-5 flex flex-col-reverse items-center rounded-sm">
                {data && <Numeration dataLength={data.length} itemsByPage={perPage} />}
            </div>
            <button className="float-right my-4 py-1 px-4 bg-blue-mafer text-white-mafer rounded-sm hover:scale-105 transition"
                onClick={openCloseModal}
            > Agregar. </button>
        </div>
        <Modal key={keyModal} openCloseModal={openCloseModal} state={modalVisible}>
            <div className="w-full relative">
                <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
            </div>
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataClasificationSelect == null ? "Agregar" : "Actualizar"} clasificación. </h2>
            <Form className="w-11/12 h-full" modal data={dataClasificationSelect} dataName="Clasificación" schequema={ClasificationSchequema} inputsList={inputsForm} />
        </Modal>
    </div>
    );
};

export default ConfigurationClasifications;
