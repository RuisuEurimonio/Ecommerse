"use client"

import { ChangeEvent, useState } from "react";

type OurOfficesProps = {};

const OurOffices: React.FC<OurOfficesProps> = () => {

    const [radioValue, setRadioValue] = useState<String>("Sede principal");

    const handleChange = (event: ChangeEvent<HTMLInputElement> ) =>{
        setRadioValue(event.target.value);
    }

    return (
        <div>
            <h1 className="text-lg text-fourth-color font-bold text-center my-2">
                Nuestras sedes.
            </h1>
            <div className="w-full h-96 m-auto relative
                lg:w-4/5
            ">
                <div className={`absolute w-full h-full ${radioValue == "Sede principal" ? "z-30" : ""}`}>
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.4715462583217!2d-74.06101292421782!3d4.687813941767505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ac174d41b61%3A0xc6771e1123955b3a!2sAc.%20100%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1720647960555!5m2!1ses-419!2sco"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen={false}
                    ></iframe>
                </div>
                <div className={`absolute w-full h-full ${radioValue == "Sede Secundaria" ? "z-30" : ""}`}>
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.606658471299!2d-74.11296652421792!3d4.664012541972883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b969afb1e7f%3A0xf57c475c8de2bca9!2zQWMuIDI2LCBCb2dvdMOh!5e0!3m2!1ses-419!2sco!4v1720648039109!5m2!1ses-419!2sco"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen={false}
                    ></iframe>
                </div>
                <div className={`absolute w-full h-full ${radioValue == "Sede Tercearia" ? "z-30" : ""}`}>
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.486891224896!2d-74.095248924218!3d4.685116841790832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b45d194fde3%3A0x5466b12d1e5d6e4d!2zQ2wuIDcyLCBCb2dvdMOh!5e0!3m2!1ses-419!2sco!4v1720648066545!5m2!1ses-419!2sco"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen={false}
                    ></iframe>
                </div>
            </div>
            <div className="my-2">
                <fieldset className="flex flex-col justify-center gap-2 w-11/12 m-auto
                    md:flex-row md:gap-5
                ">
                    <label
                        htmlFor="selectOffice1"
                        className=" block bg-secondary-color font-bold py-1 px-2 text-third-color rounded-sm hover:scale-105 transition has-[:checked]:scale-110 cursor-pointer"
                    >
                        Sede principal
                        <input
                            type="radio"
                            id="selectOffice1"
                            name="selectOffice"
                            className="hidden"
                            value="Sede principal"
                            checked={radioValue === "Sede principal"}
                            onChange={(e)=>{handleChange(e)}}
                        />
                    </label>
                    <label
                        htmlFor="selectOffice2"
                        className=" block bg-secondary-color font-bold py-1 px-2 text-third-color rounded-sm hover:scale-105 transition has-[:checked]:scale-110 cursor-pointer"
                    >
                        Sede Secundaria
                        <input
                            type="radio"
                            id="selectOffice2"
                            name="selectOffice"
                            className="hidden"
                            value="Sede Secundaria"
                            checked={radioValue === "Sede Secundaria"}
                            onChange={(e)=>{handleChange(e)}}
                        />
                    </label>
                    <label
                        htmlFor="selectOffice3"
                        className=" block bg-secondary-color font-bold py-1 px-2 text-third-color rounded-sm hover:scale-105 transition has-[:checked]:scale-110 cursor-pointer"
                    >
                        Sede Tercearia
                        <input
                            type="radio"
                            id="selectOffice3"
                            name="selectOffice"
                            className="hidden"
                            value="Sede Tercearia"
                            checked={radioValue === "Sede Tercearia"}
                            onChange={(e)=>{handleChange(e)}}
                        />
                    </label>
                </fieldset>
            </div>
        </div>
    );
};

export default OurOffices;
