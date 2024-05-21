"use client";

import React, { useState } from "react";

type CardItemWrapper = {
    children: any;
    dataLength: number;
};

const move = 1 + 10; // 1rem (gap) + 10rem (min-w)

const CardItemWrapper: React.FC<CardItemWrapper> = ({
    children,
    dataLength,
}) => {
    const [position, setPosition] = useState(0);

    function next() {
        (dataLength - 2) * move < position
            ? setPosition(0)
            : setPosition(position + move);
    }

    function before() {
        if (position > 0) {
            setPosition(position - move);
        }
    }

    return (
        <div className="flex items-center relative">
            <div className="w-full overflow-x-hidden my-2">
                <ul
                    className={`flex gap-4 transition`}
                    style={{ transform: `translateX(-${position}rem)` }}
                >
                    {children}
                </ul>
            </div>
            <div
                className="absolute left-2
                        md:left-5
                    "
            >
                <button onClick={before}>
                    <span
                        className="icon icon-arrowl text-xl
                            md:text-4xl"
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
                        md:text-4xl
                    "
                    />
                </button>
            </div>
        </div>
    );
};

export default CardItemWrapper;
