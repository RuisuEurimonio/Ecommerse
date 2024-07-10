"use client";

import { useSearchParams } from "next/navigation";

import HistoryNavigation from "@/components/HistoryNavigation";
import CardSimple from "@/components/CardSimple";
import InfoItemCard from "@/components/InfoItemCard";
import Numeration from "@/components/Numeration";
import { SelectCantItems } from "@/components/SelectCantItems";

import fakedata from "@/utils/json/fakeNewsletters.json";
import { perPageOptionsShort } from "@/utils/ts/configuration";
import { verifyPerPageExist } from "@/utils/ts/validations";

import { NewsLetterProps } from "@/types/Props";

const data : NewsLetterProps[] = fakedata; //TODO delete this when we implement the fetch data

type eventsProps = {};

const Events: React.FC<eventsProps> = () => {

    const searchParam = useSearchParams();

    const pageNum = (searchParam.get("page") || 1) as number;
    const perPageParam = Number(
        searchParam.get("perPage") || perPageOptionsShort[1]
    ) as number;
    const perPage = verifyPerPageExist(perPageOptionsShort, perPageParam);

    return (
        <div
            className="w-11/12 m-auto
            md:w-4/5"
        >
            <HistoryNavigation items={[{ names: "Eventos", url: "/events" }]} />
            <h2 className="text text-center text-3xl text-fourth-color font-bold"> Conocé lo último que esta pasando en MAFER. </h2>
            <div
                className="flex flex-col-reverse my-3 gap-2
                md:flex-row md:gap-5"
            >
                <div
                    className="basis-1/4 flex flex-col gap-4
                    md:border-2 md:my-1 md:p-2 md:rounded-sm md:h-full md:border-fifth-color/50
                    xl:basis-1/5"
                >
                    <h3
                        className="font-bold text-fourth-color text-2xl
                        md:text-center"
                    > Popular </h3>
                    {data.slice(0, 5).map((item) => (
                        <CardSimple newsletter={item} key={item.id} />
                    ))}
                </div>
                <div
                    className="basis-3/4
                    xl:basis-4/5"
                >
                    {data
                        .slice(perPage * pageNum - perPage, perPage * pageNum)
                        .map((item) => (
                            <InfoItemCard data={item} key={item.id} link="events"/>
                        ))}
                    <div className="bg-fifth-color w-full flex flex-col-reverse items-center py-2
                        lg:flex-row lg:justify-evenly lg:py-0">
                        <SelectCantItems perPage={perPage}/>
                        <Numeration dataLength={data.length} itemsByPage={perPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
