"use client"

import { Suspense, useEffect, useState } from "react";

import Modal from "@/components/Modal";
import Numeration from "@/components/Numeration";
import Table from "@/components/TableGeneral";
import Form from "@/components/Form";

import { ArticleProps, BrandProps, CategoryProps, ClasificationProps, DiscountProps, subDataTableProps} from "@/types/Props";

import { articleSchequema } from "@/utils/Schemas/articleSchema";
import NoDataTable from "@/components/NoDataTable";
import { getElementsApi } from "@/data/api";
import LoadingItem from "@/components/LoadingItem/LoadingItem";

type ConfigurationProductsProps = {};

const perPage : number = 20;
const URL_FETCH = "producto";

const titlesTable = [
    {titleName: "Nombre"},
    {className: "md:hidden lg:table-cell" ,titleName: "Categoria"},
    {titleName: "SKU"},
    {titleName: "descripción"},
    {className:"md:hidden lg:table-cell", titleName: "Imagen"},
]

const subDataTable : subDataTableProps<any>[] = [
    {columnName: "id"},
    {columnName: "nombre"},
    {hiddenMobile: true, columnName: "categoria", type: "object", secondObject: "nombre"},
    {columnName: "sku"},
    {className:"line-clamp-3", columnName: "descripcion"},
    {hiddenMobile: true, columnName: "imagen"},   
]



const ConfigurationProducts: React.FC<ConfigurationProductsProps> = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataProductSelect, setDataProductSelect] = useState<ArticleProps | null>(null);
    const [keyModal, setKeyModal] = useState("");
    const [data, setData] = useState<ArticleProps[] | null>(null)
    const [updateData, setUpdateData] = useState(false);
    const [dataClassification, setDataClassification] = useState<ClasificationProps[] | null>(null);
    const [dataDiscount, setDataDiscount] = useState<DiscountProps[] | null>(null);
    const [dataBrand, setDataBrand] = useState<BrandProps[] | null>(null);
    const [dataCategory, setDataCategory] = useState<CategoryProps[] | null>(null);

    const inputsForm = [
        {type: "text", id: "nombre", name: "Nombre"},
        {type: "textarea", id: "descripcion", name: "Descripción"},
        {type: "text", id: "sku", name: "sku"},
        {type: "text", id: "precio", name: "Precio"},
        {type: "file", id: "imagen", name: "Imagen"},
        {type: "select", id: "marca", name: "Marca", extraData: dataBrand, groupData: true},
        {type: "select", id: "clasificacion", name: "Clasificación", extraData: dataClassification, groupData: true},
        {type: "select", id: "descuento", name: "Descuento", extraData: dataDiscount, groupData: true},
        {type: "group-checkbox", id: "categoria", name: "Categoria", extraData: dataCategory},
    ]
    
    function openCloseModal(){
        setKeyModal("main")
        setModalVisible(!modalVisible);
        setDataProductSelect(null);
        setUpdateData(false);
    }

    function openCloseSubModal(data: ArticleProps){
        if(modalVisible){
            setDataProductSelect(null);
        }else{
            setDataProductSelect(data);
        }
        setKeyModal(String(data.sku))
        setModalVisible(!modalVisible);
        setUpdateData(true);
    }

    const get = async () =>{
        const data = await getElementsApi(URL_FETCH);
        if(data){
            setData(data)
        }
    }

    function createOrUpdateElement(){
        openCloseModal();
        get();
    }



    useEffect(()=>{
        const getSubData = async () => {
            const category = await getElementsApi("producto/categoria");
            const brand = await getElementsApi("producto/marca");
            const classification = await getElementsApi("producto/clasificacion");
            const discounts = await getElementsApi("producto/descuento")

            if(category && brand && classification && discounts){
                setDataCategory(category);
                setDataBrand(brand);
                setDataClassification(classification);
                setDataDiscount(discounts);
            }
        }
        get();
        getSubData()
    },[])

    

    return (
        <div
            className="
                md:flex-1
            ">
            <div className="w-4/5 mx-auto">
                <h2 className="font-bold text-xl mt-4 mb-2">Artículos.</h2>
                <div className="w-full relative overflow-x-auto">
                    <Suspense fallback={<LoadingItem/>}>
                        {data && data.length > 0  ? 
                        <Table data={data} perPage={perPage} openCloseSubModal={openCloseSubModal} updateData={get} titles={titlesTable} subData={subDataTable} urlFetch={URL_FETCH}/>
                        :
                        <NoDataTable message="No se encontraron artículos ingresados." secondaryMessage="Ingrese nuevos articulos por medio del botón infeior"/ >
                        }
                    </Suspense>
            </div>
            <div className="bg-secondary-color text-third-color flex flex-col-reverse items-center rounded-sm min-h-5">
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
            <h2 className="font-bold text-fifth-color text-xl m-2"> {dataProductSelect == null ? "Agregar" : "Actualizar"} articulo. </h2>
            <Form className="w-11/12 h-full"
                  modal
                  data={dataProductSelect}
                  schequema={articleSchequema}
                  dataName="Articulo"
                  inputsList={inputsForm} 
                  customFunction={createOrUpdateElement}
                  urlFetch={URL_FETCH}
                  updateInfo={updateData}
                  nullInput
                  />
        </Modal>
    </div>
    );
};

export default ConfigurationProducts;

