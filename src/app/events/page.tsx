import HistoryNavigation from "@/components/HistoryNavigation";
import React from "react";
import fakedata from "@/utils/json/fakeNewsletters.json"
import { NewsLetterProps } from "@/types/Props";
import CardSimple from "@/components/CardSimple";
import InfoItemCard from "@/components/InfoItemCard";

const data : NewsLetterProps[] = fakedata;

type eventsProps = {}

const Events : React.FC<eventsProps> = () => {
    return (
        <div className="w-11/12 m-auto
            md:w-4/5
        ">
            <HistoryNavigation items={[{ names: "Eventos", url: "/events"}]} /> 
            <h2 className="text text-center text-3xl text-blue-mafer font-bold"> Conocé lo último que esta pasando en MAFER. </h2>
            <div className="flex flex-col-reverse my-3 gap-2
                md:flex-row md:gap-5
            ">
                <div className="basis-1/4 flex flex-col gap-4
                    md:border-2 md:my-1 md:p-2 md:rounded-sm md:h-full
                    xl:basis-1/5
                ">
                    <h3 className="font-bold text-blue-mafer text-2xl
                        md:text-center
                    "> Popular </h3>
                    {data.slice(0,5).map((item)=>(
                        <CardSimple newsletter={item} key={item.id}/>
                    ))}
                </div>
                <div className="basis-3/4
                    xl:basis-4/5
                ">
                    {data.slice(6,12).map((item)=>(
                        <InfoItemCard data={item} key={item.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Events;