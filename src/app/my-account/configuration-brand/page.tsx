"use client"

import { useEffect, useState } from "react";

import Form from "@/components/Form";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";

import { BrandProps, subDataTableProps } from "@/types/Props";

import { brandSchequema } from "@/utils/Schemas/brandSchema";
import NoDataTable from "@/components/NoDataTable";
import { getElementsApi } from "@/data/api";

type ConfigurationUsersProps = {};

const perPage: number = 20;
const URL_FETCH = "producto/marca"

const inputsForm = [
    {type: "text", id: "nombre", name: "Nombre"},
    {type: "textarea", id: "descripcion", name: "Descripción"},
]

const titlesTable = [
    { titleName: "nombre" },
    { titleName: "descripción" },
    { className: "md:hidden lg:table-cell", titleName: "fecha creación" },
    { className: "md:hidden lg:table-cell", titleName: "fecha modificación" }
]

const subDataTable: subDataTableProps<any>[] = [
    { columnName: "id" },
    { columnName: "nombre" },
    { className: "line-clamp-3", columnName: "descripcion" },
    { hiddenMobile: true, columnName: "fechaCreacion" },
    { hiddenMobile: true , columnName: "fechaModificacion" }
]

const ConfigurationUsers: React.FC<ConfigurationUsersProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataBrandSelect, setDataBrandSelect] = useState<BrandProps | null>(null);
    const [keyModal, setKeyModal] = useState("");
    const [data, setData] = useState<BrandProps[] | null>(null);
    const [updateData, setUpdateData] = useState(false);

    function openCloseModal() {
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataBrandSelect(null);
        setUpdateData(false);
    }

    function openCloseSubModal(data: BrandProps) {
        if (modalVisible) {
            setDataBrandSelect(null);
        } else {
            setDataBrandSelect(data);
        }
        setKeyModal(data.nombre)
        setModalVisible(!modalVisible);
        setUpdateData(true);
    }

    const get = async () =>{
        const data = await getElementsApi(URL_FETCH);
        if(data){
            setData(data);
        }
    }   

    function createOrUpdateElement(){
        openCloseModal();
        get()
    }

    useEffect(()=>{
        get();
    },[])

    return (
        <div
            className="md:flex-1">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2"> Marcas.</h2>
                <div className="w-full relative overflow-x-auto">
                    {data && data.length > 0 ? 
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal} updateData={get} titles={titlesTable} subData={subDataTable} urlFetch={URL_FETCH} />
                    :
                    <NoDataTable message="No se encontro datos de marcas" secondaryMessage="Agrega nuevas marcas por medio del botón inferior" />
                }
                </div>
                <div className="bg-secondary-color text-third-color  rounded-sm flex flex-col items-center min-h-5">
                        {data && <Numeration className="text-third-color" dataLength={data.length} itemsByPage={perPage} />}
                </div>
                <button className="float-right my-4 py-1 px-4 bg-secondary-color text-third-color  rounded-sm hover:scale-105 transition"
                    onClick={openCloseModal}
                > Agregar. </button>
            </div>
            <Modal key={keyModal} openCloseModal={openCloseModal} state={modalVisible}>
                <div className="w-full relative">
                    <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
                </div>
                <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataBrandSelect == null ? "Agregar" : "Actualizar"} marca. </h2>
                <Form className="w-11/12 h-full"
                      modal 
                      data={dataBrandSelect} 
                      dataName="marca" 
                      schequema={brandSchequema} 
                      inputsList={inputsForm} 
                      updateInfo={updateData}
                      urlFetch={URL_FETCH}
                      customFunction={createOrUpdateElement}/>
            </Modal>
        </div>
    );
};

export default ConfigurationUsers;
