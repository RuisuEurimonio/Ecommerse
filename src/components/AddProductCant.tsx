"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type AddProductCantProps = {}

const AddProductCant : React.FC<AddProductCantProps> = () => {

    const searchParams = useSearchParams()
    const name = searchParams.get("name");
    const router = useRouter();

    const [cant, setCant] = useState<number>(1);

    function add() {
        if(cant<100) {
            const sum = cant+1;
            setCant(sum);
            updateCantUrl(sum);
        }
    }

    function subtract() {
        if(cant>1){
            const sub = cant-1;
            setCant(sub);
            updateCantUrl(sub);
        }
    }

    function handleChange(event:any){
        let value = event.target.value;
        if(parseInt(value) <= 100 && parseInt(value) > 0) {
            setCant(parseInt(value));
            updateCantUrl(value);
        } else if (value === ""){
            setCant(1);
        }
        else {
            setCant(cant);
        }
    }

    function updateCantUrl(value : number){
        router.push(`?name=${name}&cant=`+value)
    }

    return(
        <div className="grid grid-cols-3 border-2 divide-x-2 font-bold rounded-lg bg-fifth-color">
        <button className="w-7 text-xl h-full
            xl:text-2xl xl:w-10"
            onClick={subtract}
        > - </button>
        <input className="w-7 h-full appearance-none text-center outline-none
            xl:text-xl xl:w-10"
            value={cant}
            onChange={handleChange}
        />
        <button className="w-7 text-xl h-full bg-fifth-color rounded-r-lg
            xl:text-2xl xl:w-10"
            onClick={add}
        > + </button>
    </div>
    )
}

export default AddProductCant;