"use client";

import { BrandProps, PayMethodProps } from "@/types/Props";
import imageNotFound from "@/assets/img/imageNotFound.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

type CarouselSimpleProps = {
    data: BrandProps[] | PayMethodProps[];
    intervalMove: number;
};

const move = 6 + 0.75; //min-w-24 (6rem) + gap-3 (0.75rem)ç

const CarouselSimple: React.FC<CarouselSimpleProps> = ({
    data,
    intervalMove,
}) => {
    const [position, setPosition] = useState(0);

    function next() {
        (data.length - 3) * move < position
            ? setPosition(0)
            : setPosition(position + move);
    }

    function before() {
        if (position > 0) {
            setPosition(position - move);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            next();
        }, intervalMove);
        return () => clearInterval(interval);
    }, [position]);

    return (
        <div className="overflow-x-hidden relative flex items-center">
            <ul
                className="flex gap-3 transition"
                style={{ transform: `translateX(-${position}rem)` }}
            >
                {data.map((data) => (
                    <li key={data.id} className="min-w-24">
                        <Image
                            src={imageNotFound}
                            alt={`Imagen de representativo de ${
                                "nombre" in data ? data.nombre : data.metodo
                            }`}
                        />
                        <p className="text-center text-xs mt-2 line-clamp-2">
                            {"nombre" in data ? data.nombre : data.metodo}
                        </p>
                    </li>
                ))}
            </ul>
            <div
                className="absolute left-2 <-
                        md:left-5
                    "
            >
                <button onClick={before}>
                    <span
                        className="icon icon-arrowl text-xl
                            md:text-2xl"
                    />
                </button>
            </div>
            <div
                className="absolute right-2
                    md:right-5
                "
            >
                <button onClick={next}>
                    <span
                        className="icon icon-arrowr text-xl
                        md:text-2xl
                    "
                    />
                </button>
            </div>
        </div>
    );
};

export default CarouselSimple;
