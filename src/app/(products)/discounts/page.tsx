"use client";

import Numeration from "@/components/Numeration";
import CardItem from "@/components/CardItem";
import Filters from "@/components/Filters";

import { verifyPerPageExist } from "@/utils/ts/validations";
import productsFake from "@/utils/json/productsFake.json";

import { perPageOptions } from "@/utils/ts/configuration";
import { options } from "@/utils/ts/configuration";

import { useSearchParams } from "next/navigation";
import { SelectCantItems } from "@/components/SelectCantItems";

type DisctountsProps = {};

const data = productsFake;

const Discounts: React.FC<DisctountsProps> = () => {
    const searchParams = useSearchParams();

    const pageNum = (searchParams.get("page") || 1) as number;
    const perPageParam = Number(
        searchParams.get("perPage") || perPageOptions[1].cantidad
    ) as number;
    const perPage = verifyPerPageExist(perPageOptions, perPageParam);

    return (
        <div
            className="flex my-4 flex-col justify-between
                    md:flex-row
                "
        >
            <Filters />
            <div className="md:basis-3/4">
                <div className="">
                    <div className="bg-blue-mafer p-1 rounded-sm flex flex-col items-center">
                        <div className="mt-2">
                            <label className="text-white-mafer">
                                {" "}
                                Ordenar por:{" "}
                            </label>
                            <select
                                name="order"
                                className="outline-none cursor-pointer mx-1 rounded-sm"
                            >
                                {options.map((option) => (
                                    <option key={option.id}>
                                        {" "}
                                        {option.tipo}{" "}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <Numeration data={data} itemsByPage={perPage} />
                        </div>
                    </div>
                    <div className="m-2">
                        <ul
                            className="grid grid-cols-2 gap-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            xl:grid-cols-5
                        "
                        >
                            {data
                                .slice(
                                    perPage * pageNum - perPage,
                                    perPage * pageNum
                                )
                                .map((item) => (
                                    <CardItem
                                        key={item.id}
                                        item={item}
                                        discount
                                        link={"discounts"}
                                    />
                                ))}
                        </ul>
                    </div>
                    <div className="bg-blue-mafer p-2 flex flex-col-reverse items-center rounded-sm">
                        <SelectCantItems perPage={perPage} />
                        <Numeration data={data} itemsByPage={perPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discounts;