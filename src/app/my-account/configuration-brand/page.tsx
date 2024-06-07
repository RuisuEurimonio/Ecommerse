"use client"

import FormBrand from "@/components/FormBrand";
import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableBrand";
import { ObjBranchProps } from "@/types/Props";
import branchFake from "@/utils/json/branchFake.json"
import { useState } from "react";

type ConfigurationUsersProps = {};

const data = branchFake;

const perPage : number = 20;

const ConfigurationUsers: React.FC<ConfigurationUsersProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataBrandSelect, setDataBrandSelect] = useState<ObjBranchProps | null>(null);
    const [keyModal, setKeyModal] = useState("");

    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataBrandSelect(null);
    }

    function openCloseSubModal(data: ObjBranchProps){
        if(modalVisible){
            setDataBrandSelect(null);
        }else{
            setDataBrandSelect(data);
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
                <h2 className="font-bold text-xl mt-4 mb-2"> Marcas.</h2>
                <div className="w-full relative overflow-x-auto">
                    <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal}></Table>
            </div>
            <div className="bg-blue-mafer rounded-sm flex flex-col items-center">
                <div>
                    <Numeration dataLength={data.length} itemsByPage={10} />
                </div>
            </div>
            <button className="float-right my-4 py-1 px-4 bg-blue-mafer text-white-mafer rounded-sm hover:scale-105 transition"
                onClick={openCloseModal}
            > Agregar. </button>
        </div>
        <Modal key={keyModal} openCloseModal={openCloseModal} state={modalVisible}>
            <div className="w-full relative">
                <span className="icon icon-xmark text-2xl float-right mr-4 cursor-pointer" onClick={openCloseModal}></span>
            </div>
            <h2 className="font-bold text-blue-mafer text-xl m-2"> {dataBrandSelect == null ? "Agregar" : "Actualizar"} marca. </h2>
            <FormBrand className="w-11/12 h-full" modal data={dataBrandSelect}/>
        </Modal>
    </div>
    );
};

export default ConfigurationUsers;
