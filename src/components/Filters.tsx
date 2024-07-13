"use client"

import React, { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import { BrandProps, CategoryProps, ClasificationProps } from "@/types/Props";
import { getElementsApi } from "@/data/api";

type FiltersProps = {

}

const Filters : React.FC<FiltersProps> = () => {

    const [active, setActive] = useState(false);
    const [categories, setCategories] = useState<CategoryProps [] | null>(null);
    const [classifications, setClassifications] = useState<ClasificationProps [] | null>(null);
    const [brands, setBrands] = useState<BrandProps [] | null>(null);

    function openFilters(){
        setActive(!active);
    }

    useEffect(()=>{
        const getCategories = async () => {
            const data = await getElementsApi("http://localhost:8080/api/producto/categoria/all");
            if(data){
                setCategories(data);
            }
        }

        const getClassifications = async () => {
            const data = await getElementsApi("http://localhost:8080/api/producto/clasificacion/all");
            if(data){
                setClassifications(data);
            }
        }

        const getBrands = async () => {
            const data = await getElementsApi("http://localhost:8080/api/producto/marca/all");
            if(data){
                setBrands(data);
            }
        }

        getCategories();
        getClassifications();
        getBrands();
    },[])

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
                    <div className="text-sm">
                        {categories && <FilterComponent
                            title="Categoria."
                            data={categories}
                            sliceFrom={0}
                            sliceTo={6}
                        />}
                        {classifications && <FilterComponent
                            title="Clasficicación."
                            data={classifications}
                            sliceFrom={0}
                            sliceTo={2}
                        />}
                        { brands && <FilterComponent
                            title="Marca."
                            data={brands}
                            sliceFrom={0}
                            sliceTo={12}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters;