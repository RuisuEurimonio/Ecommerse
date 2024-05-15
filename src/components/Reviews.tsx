"use client";

import fakeReviews from "@/utils/json/fakeReviews.json";
import { ReviewsProps } from "@/types/Props";
import { useEffect, useState } from "react";

type ReviewProps = {};

const data: ReviewsProps[] = fakeReviews;

const nombresMeses = [
    "En",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ag",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
];

const move = 12 + 1.25; //min-w-[12rem] + gap-5 

const INTERVAL_MOVE = 3000;

const Reviews: React.FC<ReviewProps> = () => {
    const [position, setPosition] = useState(0);

    function next() {
        position < (data.slice(0, 10).length - 1) * move 
            ? setPosition(position + move)
            : setPosition(0);
    }

    function before() {
        position > 0 ? setPosition(position - move) : setPosition(position);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, INTERVAL_MOVE);
        return () => clearInterval(interval);
    }, [position]);

    return (
        <div>
            <h2 className="text-blue-mafer text-center font-bold text-lg">
                {" "}
                Testimonios.{" "}
            </h2>
            <div className="w-full overflow-x-hidden rounded-md">
                <ul
                    className="flex gap-5 p-5 transition duration-300"
                    style={{ transform: `translateX(-${position}rem)` }}
                >
                    {data.slice(0, 10).map((item) => {
                        let date = new Date(item.date);
                        return (
                            <li
                                key={item.id}
                                className="shadow-2xl p-3 rounded-lg min-w-[12rem]"
                            >
                                <div className="flex gap-3 items-center h-1/5">
                                    <span className="size-8 p-4 border-2 flex justify-center items-center rounded-full font-bold text-xl border-black-mafer/50">
                                        {" "}
                                        {item.first_name.slice(0, 1)}{" "}
                                    </span>
                                    <h3 className="text-sm">
                                        {" "}
                                        {item.first_name} {item.last_name}{" "}
                                    </h3>
                                    <p className="text-sm text-black-mafer/60 text-center">
                                        {" "}
                                        {date.getDate().toString()}{" "}
                                        {nombresMeses[date.getMonth()]}
                                    </p>
                                </div>
                                <div className="my-2 flex flex-col h-4/5">
                                    <p className="text-xs line-clamp-[10] text-justify">
                                        {" "}
                                        {item.review}{" "}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <p className="inline"> {item.rank} </p>
                                        <span className="inline text-xs">
                                            {" "}
                                            {"⭐".repeat(
                                                Math.floor(item.rank)
                                            )}{" "}
                                        </span>
                                    </div>
                                    <p
                                        className={`px-4 border inline rounded-full text-sm ${
                                            item.rank >= 2.5
                                                ? " border-green-400 text-green-400"
                                                : "border-red-400 text-red-400"
                                        }`}
                                    >
                                        {" "}
                                        {item.rank < 2.5 ? "-" : "+"}{" "}
                                        {item.key_points}{" "}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex justify-around mt-2">
                <button onClick={before} className="size-8 border-2 rounded-full flex items-center justify-center cursor-pointer
                    md:size-10
                ">
                    <span
                        className="icon icon-arrowl text-2xl
                                md:text-3xl"
                    />
                </button>
                <button onClick={next} className="size-8 border-2 rounded-full flex items-center justify-center cursor-pointer
                    md:size-10
                ">
                    <span
                        className="icon icon-arrowr text-2xl
                            md:text34xl
                        "
                    />
                </button>
            </div>
        </div>
    );
};

export default Reviews;
