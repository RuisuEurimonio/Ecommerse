"use client"

import { useState } from "react";

import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableClasification";

import { ClasificationProps } from "@/types/Props";

import clasificationFake from "@/utils/json/branchFake.json"
import FormClasification from "@/components/FormClasification";

type ConfigurationClasificationsProps = {};

const data = clasificationFake;

const perPage : number = 20;

const ConfigurationClasifications: React.FC<ConfigurationClasificationsProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataClasificationSelect, setDataClasificationSelect] = useState<ClasificationProps | null>(null);
    const [keyModal, setKeyModal] = useState("");

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

    return (
        <div
            className="
                md:flex-1
            ">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2">Clasificaciones.</h2>
                <div className="w-full relative overflow-x-auto">
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal}></Table>
            </div>
            <div className="bg-blue-mafer p-2 flex flex-col-reverse items-center rounded-sm">
                <Numeration dataLength={data.length} itemsByPage={10} />
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
            <FormClasification className="w-11/12 h-full" modal data={dataClasificationSelect}/>
        </Modal>
    </div>
    );
};

export default ConfigurationClasifications;
