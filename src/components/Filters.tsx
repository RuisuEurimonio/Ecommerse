"use client"

import React, { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import { ArticleProps, BrandProps, CategoryProps, ClasificationProps } from "@/types/Props";
import { getElementsApi, getElementsByFilter } from "@/data/api";
import SpinnerItem from "./LoadingItem/SpinnerItem";

type FiltersProps = {
    updateDataFunction : (data : ArticleProps[]) => void;
}

const Filters : React.FC<FiltersProps> = ({updateDataFunction}) => {

    const [active, setActive] = useState(false);
    const [categories, setCategories] = useState<CategoryProps [] | null>(null);
    const [classifications, setClassifications] = useState<ClasificationProps [] | null>(null);
    const [brands, setBrands] = useState<BrandProps [] | null>(null);
    const [currentClicked, setCurrentClicked] = useState("");
    const [loading, setLoading] = useState(true);

    function openFilters(){
        setActive(!active);
    }

    useEffect(()=>{
        const getCategories = async () => {
            const data = await getElementsApi("producto/categoria");
            if(data){
                setCategories(data);
            }
        }

        const getClassifications = async () => {
            const data = await getElementsApi("producto/clasificacion");
            if(data){
                setClassifications(data);
            }
        }

        const getBrands = async () => {
            const data = await getElementsApi("producto/marca");
            if(data){
                setBrands(data);
            }
        }

        getCategories();
        getClassifications();
        getBrands();
        setLoading(false);
    },[])

    async function selectData(id : number, typeData: string){
        if(id && typeData){
            const newData = await getElementsByFilter("producto/filter/"+typeData+"/"+id);
            if(newData){
                updateDataFunction(newData);
            }
        }
    }

    function updateCurrentClicked(name : string){
        setCurrentClicked(name);
    }

    return (
        <>
            <div className="w-full md:hidden">
                <button onClick={openFilters} className="w-full bg-secondary-color/60 rounded-sm my-2"> Filtros: </button>
            </div>
            <div className={`fixed top-0 right-0 h-screen w-[320px] z-20 transition duration-500 border-2
                ${(active ?  "translate-x-0" : "translate-x-full")}
                md:static md:border-0 md:h-auto md:w-auto md:translate-x-0 md:basis-3/12 md:max-w-80
            `}>
                <div className="bg-principal-color w-full">
                    <div className="flex flex-row-reverse w-11/12">
                        <button className="relative right-0 py-1.5 px-2 text-2xl
                            md:hidden"
                                onClick={openFilters}
                            >
                                <span className="icon icon-xmark"/>
                        </button>
                    </div>
                </div>
                <div className="px-6 py-3 bg-light-third-color h-full
                    md:py-0 md:px-2 md:pb-2 md:h-auto
                ">
                    <h2 className="text-xl font-bold text-center"> Buscar por filtros. </h2>
                    {loading && 
                        <div className="md:basis-1/4">
                            <SpinnerItem/>
                        </div>
                    }
                    {!loading && <div className="text-sm">
                        {categories && <FilterComponent
                            title="Categoria."
                            data={categories}
                            dataId="categoria"
                            updateData={selectData}
                            isClicked={currentClicked == "categoria"}
                            onClick={updateCurrentClicked}
                        />}
                        {classifications && <FilterComponent
                            title="Clasficicación."
                            data={classifications}
                            dataId="clasificacion"
                            updateData={selectData}
                            isClicked={currentClicked == "clasificacion"}
                            onClick={updateCurrentClicked}
                        />}
                        { brands && <FilterComponent
                            title="Marca."
                            data={brands}
                            dataId="marca"
                            updateData={selectData}
                            isClicked={currentClicked == "marca"}
                            onClick={updateCurrentClicked}
                        />}
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Filters;