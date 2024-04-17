"use client"

import React, { useState } from "react";
import FilterCategory from "./FilterCategory";
import FilterClassification from "./FilterClassification";
import FilterBranch from "./FilterBranch";

type FiltersProps = {

}

const Filters : React.FC<FiltersProps> = () => {

    const [active, setActive] = useState(false);

    function openFilters(){
        setActive(!active);
    }

    return (
        <>
            <div className="w-full md:hidden">
                <button onClick={openFilters} className="w-full bg-blue-mafer/60 rounded-sm my-2"> Filtros: </button>
            </div>
            <div className={`fixed bg-light-white-mafer top-0 right-0 h-screen w-[320px] z-20 transition duration-500 border-2
                ${(active ?  "translate-x-0" : "translate-x-full")}
                md:static md:border-0 md:h-auto md:w-auto md:translate-x-0 md:basis-2/6 md:max-w-80
            `}>
                <div className="bg-red-mafer w-full">
                    <div className="flex flex-row-reverse w-11/12">
                        <button className="relative right-0 py-1.5 px-2 text-2xl
                            md:hidden"
                                onClick={openFilters}
                            >
                                <span className="icon icon-xmark"/>
                        </button>
                    </div>
                </div>
                <div className="px-6 py-3
                    md:py-0 md:px-2
                ">
                    <h2 className="text-xl font-bold text-center"> Buscar por filtros. </h2>
                    <div className="text-sm">
                        <FilterCategory/>
                        <FilterClassification/>
                        <FilterBranch/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filters;