"use client"

import { useState } from "react";

import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";
import Form from "@/components/Form";

import { ArticleProps} from "@/types/Props";

import { articleSchequema } from "@/utils/Schemas/articleSchema";
import subData from "@/utils/json/branchFake.json"
import NoDataTable from "@/components/NoDataTable";

type ConfigurationProductsProps = {};

const perPage : number = 20;

const titlesTable = [
    {titleName: "Nombre"},
    {className: "md:hidden lg:table-cell" ,titleName: "Categoria"},
    {titleName: "SKU"},
    {titleName: "descripción"},
    {className:"md:hidden lg:table-cell", titleName: "Imagen"},
]

const subDataTable : {className?: string, type?: string, hiddenMobile?: boolean, columnName: keyof ArticleProps}[] = [
    {columnName: "id"},
    {columnName: "nombre"},
    {hiddenMobile: true, columnName: "categoria"},
    {columnName: "sku"},
    {className:"line-clamp-3", columnName: "descripcion"},
    {hiddenMobile: true, columnName: "imagen"},   
]

const inputsForm = [
    {type: "text", id: "nombre", name: "Nombre"},
    {type: "textarea", id: "descripcion", name: "Descripción"},
    {type: "text", id: "SKU", name: "SKU"},
    {type: "text", id: "precio", name: "Precio"},
    {type: "text", id: "image", name: "Imagen"},
    {type: "select", id: "brand", name: "Marca", extraData: subData, groupData: true},
    {type: "select", id: "clasification", name: "Clasificación", extraData: subData, groupData: true},
    {type: "select", id: "category", name: "Categoria", extraData: subData, groupData: true},
]

const ConfigurationProducts: React.FC<ConfigurationProductsProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataProductSelect, setDataProductSelect] = useState<ArticleProps | null>(null);
    const [keyModal, setKeyModal] = useState("");
    const [data, setData] = useState<ArticleProps[] | null>(null)

    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataProductSelect(null);
    }

    function openCloseSubModal(data: ArticleProps){
        if(modalVisible){
            setDataProductSelect(null);
        }else{
            setDataProductSelect(data);
        }
        setKeyModal(String(data.sku))
        setModalVisible(!modalVisible);
    }

    return (
        <div
            className="
                md:flex-1
            ">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2">Artículos.</h2>
                <div className="w-full relative overflow-x-auto">
                    {data ?
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal} titles={titlesTable} subData={subDataTable} />
                    :
                    <NoDataTable message="No se encontraron artículos ingresados." secondaryMessage="Ingrese nuevos articulos por medio del botón infeior"/ >
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
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataProductSelect == null ? "Agregar" : "Actualizar"} articulo. </h2>
            <Form className="w-11/12 h-full" modal data={dataProductSelect} schequema={articleSchequema} dataName="Articulo" inputsList={inputsForm} />
        </Modal>
    </div>
    );
};

export default ConfigurationProducts;
