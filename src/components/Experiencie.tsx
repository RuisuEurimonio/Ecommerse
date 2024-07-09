"use client";

import { useEffect, useState } from "react";

type ExperiencieProps = {};

const TOTAL_CLIENTS = 2000;
const TOTAL_EMPLOYERS = 60;
const TOTAL_OFFICES = 5;

const Experiencie: React.FC<ExperiencieProps> = () => {
    const [clients, setClients] = useState(0);
    const [employers, setEmployers] = useState(0);
    const [office, setOffice] = useState(0);

    useEffect(() => {
        const intervalClients = setInterval(() => {
            if (clients < TOTAL_CLIENTS) {
                setClients(clients + 2);
            }
        }, 1.5);
        const intervalEmployers = setInterval(() => {
            if (employers < TOTAL_EMPLOYERS) {
                setEmployers(employers + 1);
            }
        }, 30);
        const intervalOffice = setInterval(() => {
            if (office < TOTAL_OFFICES) {
                setOffice(office + 1);
            }
        }, 60);
        return () => {
            clearInterval(intervalClients);
            clearInterval(intervalEmployers);
            clearInterval(intervalOffice);
        };
    }, [clients, employers, office]);

    return (
        <div className="bg-principal-color p-4 rounded-sm h-full">
            <ul
                className="text-third-color flex flex-col divide-y-2 text-center h-full
                md:flex-row md:divide-y-0 md:justify-center md:divide-x-2
            "
            >
                <li
                    className="flex flex-col items-center justify-center w-full pb-4
                    md:p-0  
                "
                >
                    <span className="icon text-5xl icon-users-g"></span>
                    <span className="text-2xl font-bold">{clients}+</span>{" "}
                    Clientes satisfechos.{" "}
                </li>
                <li
                    className="flex flex-col items-center justify-center w-full py-4
                    md:p-0 
                "
                >
                    <span className="icon text-5xl icon-business"></span>
                    <span className="text-2xl font-bold">{employers}</span>{" "}
                    Miembros de MAFER.{" "}
                </li>
                <li
                    className="flex flex-col items-center justify-center w-full py-4
                    md:p-0 
                "
                >
                    <span className="icon text-5xl icon-user-c"></span>
                    <span className="text-2xl font-bold">24/7</span> de soporte.{" "}
                </li>
                <li
                    className="flex flex-col items-center justify-center w-full pt-4
                    md:p-0 
                "
                >
                    <span className="icon text-5xl icon-branch"></span>
                    <span className="text-2xl font-bold">{office}</span>{" "}
                    Oficinas totales.{" "}
                </li>
            </ul>
        </div>
    );
};

export default Experiencie;
