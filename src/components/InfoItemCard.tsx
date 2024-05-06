import React from "react";
import Image from "next/image";
import { NewsLetterProps } from "@/types/Props";

type InfoItemCardProps = {
    data: NewsLetterProps;
};

const InfoItemCard: React.FC<InfoItemCardProps> = ({ data }) => {
    return (
        <div className="w-full border-2 p-2 rounded-sm my-1 flex flex-wrap items-center justify-evenly">
            <p className="text-black-mafer/50 text-sm left-0 text-end mb-1.5 flex-[100%]">
                {" "}
                {data.date}{" "}
            </p>
            <div className="w-full
                xl:basis-3/12
            ">
                <Image
                    src={data.img}
                    alt={""}
                    width={200} height={150} style={{ width: "auto"}} // style attribute fix the Image component error 
                    className="m-auto"
                />
            </div>
            <div className="overflow-hidden xl:basis-8/12">
                <h2 className="text-xl font-bold mt-1
                    md:text-lg
                "> {data.title} </h2>
                <h3 className="text-lg text-black-mafer/50
                    md:text-base
                "> {data.Subtitle} </h3>
                <p className="line-clamp-[10] float-left
                    md:text-sm md:line-clamp-[8]
                    xl:line-clamp-6
                "> {data.text} </p>
                <button className="bg-black-mafer text-white-mafer py-1.5 px-3 rounded-sm float-right">
                    {" "}
                    Conoce más.{" "}
                </button>
            </div>
        </div>
    );
};

export default InfoItemCard;
