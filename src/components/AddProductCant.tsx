"use client"

import React, { useState } from "react";

type AddProductCantProps = {}

const AddProductCant : React.FC<AddProductCantProps> = () => {

    const [cant, setCant] = useState(0);

    function add() {
        if(cant<100) {
            setCant(cant+1);
        }
    }

    function subtract() {
        if(cant>0){
            setCant(cant-1);
        }
    }

    function handleChange(event:any){
        let value = event.target.value;
        (parseInt(value) <= 100 && parseInt(value) >= 0) ?  setCant(value) : setCant(0);
    }

    return(
        <div className="grid grid-cols-3 border-2 divide-x-2 font-bold rounded-lg">
        <button className="w-7 text-xl h-full
            xl:text-2xl xl:w-10
        "
            onClick={subtract}
        > - </button>
        <input className="w-7 h-full appearance-none text-center outline-none
            xl:text-xl xl:w-10
        "
            value={cant}
            onChange={handleChange}
        />
        <button className="w-7 text-xl h-full
            xl:text-2xl xl:w-10
        "
            onClick={add}
        > + </button>
    </div>
    )
}

export default AddProductCant;