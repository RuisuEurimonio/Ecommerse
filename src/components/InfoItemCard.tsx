import React from "react";
import Image from "next/image";
import { NewsLetterProps } from "@/types/Props";

type InfoItemCardProps  = {
    data: NewsLetterProps
}

const InfoItemCard : React.FC<InfoItemCardProps> = ({ data }) => {
    return(
        <div className="w-full border-2 p-2 rounded-sm my-1">
            <p className="text-black-mafer/50 text-sm left-0 text-end mb-1.5"> {data.date} </p>
            <div className="w-full">
                <Image src={data.img} alt={""} width={200} height={200} className="m-auto rounded-sm"/>
            </div>
            <div className="relative overflow-hidden">
                <h2 className="text-xl font-bold mt-1"> {data.title} </h2>
                <p className="line-clamp-[10]"> {data.text} </p>
                <button className="bg-black-mafer text-white-mafer py-1.5 px-3 rounded-sm float-right"> Conoce más. </button>
            </div>
        </div>
    )
}

export default InfoItemCard;
