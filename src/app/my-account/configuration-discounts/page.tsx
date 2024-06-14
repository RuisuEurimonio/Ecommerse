"use client"

import Form from "@/components/Form";
import FormDiscount from "@/components/FormDiscount";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral"
import { discountProps } from "@/types/Props";
import { discountSchequema } from "@/utils/Schemas/discountSchema";
import discountsFake from "@/utils/json/discountFakeData.json"
import { useState } from "react";

type ConfigurationDiscountsProps = {};

const data = discountsFake;

const perPage : number = 20;

const titlesTable = [
    {titleName: "nombre"},
    {titleName: "descripción"},
    {titleName: "porcentaje"},
    {titleName: "Estado"},
    {className:"md:hidden lg:table-cell", titleName: "fecha creación"},
    {className:"md:hidden lg:table-cell", titleName: "fecha modificación"}
]

const subDataTable : {className?: string, type?: string, hiddenMobile?: boolean, columnName: keyof discountProps}[] = [
    {columnName: "id"},
    {columnName: "nombre"},
    {className:"line-clamp-3", columnName: "descripcion"},
    {columnName: "porcentaje"},
    {type: "boolean", columnName: "active"},
    {hiddenMobile: true, columnName: "fechaCreacion"},
    {hiddenMobile: true, columnName: "fechaModificacion"}
]

const inputsForm = [
    {type: "text", id: "nombre", name: "Nombre"},
    {type: "text", id: "descripcion", name: "Descripción"},
    {type: "text", id: "porcentaje", name: "Porcentaje"},
    {type: "checkbox", id: "active", name: "Estado"}
]

const ConfigurationDiscounts: React.FC<ConfigurationDiscountsProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataDiscountSelect, setDataDiscountSelect] = useState<discountProps | null>(null);
    const [keyModal, setKeyModal] = useState("");

    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataDiscountSelect(null);
    }

    function openCloseSubModal(data: discountProps){
        if(modalVisible){
            setDataDiscountSelect(null);
        }else{
            setDataDiscountSelect(data);
        }
        setKeyModal(data.nombre)
        setModalVisible(!modalVisible);
    }

    return (
        <div
            className="
                md:flex-1
            ">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2"> Descuentos.</h2>
                <div className="w-full relative overflow-x-auto">
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal} titles={titlesTable} subData={subDataTable}/>
                </div>
                <div className="bg-blue-mafer rounded-sm flex flex-col items-center">
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
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataDiscountSelect == null ? "Agregar" : "Actualizar"} descuento. </h2>
            {/*<FormDiscount className="w-11/12 h-full" modal data={dataDiscountSelect}/>*/}
            <Form className="w-11/12 h-full" modal data={dataDiscountSelect} dataName="Descuento" schequema={discountSchequema} inputsList={inputsForm}/> 
        </Modal>
    </div>
    );
};

export default ConfigurationDiscounts;
