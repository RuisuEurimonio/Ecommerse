"use client"

import { useState } from "react";

import FormArticle from "@/components/FormArticle";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";

import { CardProductProps} from "@/types/Props";

import productsFake from "@/utils/json/productsFake.json"
import Form from "@/components/Form";
import { articleSchequema } from "@/utils/Schemas/articleSchema";
import subData from "@/utils/json/branchFake.json"

type ConfigurationProductsProps = {};

const data = productsFake;

const perPage : number = 20;

const titlesTable = [
    {titleName: "Nombre"},
    {className: "md:hidden lg:table-cell" ,titleName: "Categoria"},
    {titleName: "SKU"},
    {titleName: "descripción"},
    {className:"md:hidden lg:table-cell", titleName: "Imagen"},
]

const subDataTable : {className?: string, type?: string, hiddenMobile?: boolean, columnName: keyof CardProductProps}[] = [
    {columnName: "id"},
    {columnName: "nombre"},
    {hiddenMobile: true, columnName: "categoria"},
    {columnName: "SKU"},
    {className:"line-clamp-3", columnName: "descripcion"},
    {hiddenMobile: true, columnName: "image"},   
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
    const [dataProductSelect, setDataProductSelect] = useState<CardProductProps | null>(null);
    const [keyModal, setKeyModal] = useState("");

    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataProductSelect(null);
    }

    function openCloseSubModal(data: CardProductProps){
        if(modalVisible){
            setDataProductSelect(null);
        }else{
            setDataProductSelect(data);
        }
        setKeyModal(data.SKU)
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
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataProductSelect == null ? "Agregar" : "Actualizar"} articulo. </h2>
            {/* <FormArticle className="w-11/12 h-full" modal data={dataProductSelect}/> */}
            <Form className="w-11/12 h-full" modal data={dataProductSelect} schequema={articleSchequema} dataName="Articulos" inputsList={inputsForm} />
        </Modal>
    </div>
    );
};

export default ConfigurationProducts;
