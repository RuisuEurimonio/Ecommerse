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
            <h1 className="text-lg text-blue-mafer font-bold text-center my-2">
                {" "}
                Nuestras sedes.{" "}
            </h1>
            <div className="w-full h-96 m-auto relative
                lg:w-4/5
            ">
                <div className={`absolute w-full h-full ${radioValue == "Sede principal" ? "z-30" : ""}`}>
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9450951733525!2d-74.08352482421819!3d4.60385454248787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f990bbb08520b%3A0x1f17d68a5807927a!2sCentro%20Ferretero%20MAFER!5e0!3m2!1ses-419!2sco!4v1715546398963!5m2!1ses-419!2sco"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen={false}
                    ></iframe>
                </div>
                <div className={`absolute w-full h-full ${radioValue == "Sede Paloquemao" ? "z-30" : ""}`}>
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1715553224432!5m2!1ses-419!2sco!6m8!1m7!1sDrNKzINiKr3GYEo-doF8Dg!2m2!1d4.612814372305595!2d-74.08647289812855!3f298.60361092024107!4f0.40919390369703024!5f0.7820865974627469"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen={false}
                    ></iframe>
                </div>
                <div className={`absolute w-full h-full ${radioValue == "Sede Metrotech" ? "z-30" : ""}`}>
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.944637959731!2d-74.08346262421813!3d4.603936342487138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99cd4c9b9e1f%3A0x33e1a4aaea06c30e!2sMetro%20Tech!5e0!3m2!1ses-419!2sco!4v1715553432873!5m2!1ses-419!2sco"
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
                        className=" block bg-blue-mafer font-bold py-1 px-2 text-white-mafer rounded-sm hover:scale-105 transition has-[:checked]:scale-110 cursor-pointer"
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
                        className=" block bg-blue-mafer font-bold py-1 px-2 text-white-mafer rounded-sm hover:scale-105 transition has-[:checked]:scale-110 cursor-pointer"
                    >
                        Sede Paloquemao
                        <input
                            type="radio"
                            id="selectOffice2"
                            name="selectOffice"
                            className="hidden"
                            value="Sede Paloquemao"
                            checked={radioValue === "Sede Paloquemao"}
                            onChange={(e)=>{handleChange(e)}}
                        />
                    </label>
                    <label
                        htmlFor="selectOffice3"
                        className=" block bg-blue-mafer font-bold py-1 px-2 text-white-mafer rounded-sm hover:scale-105 transition has-[:checked]:scale-110 cursor-pointer"
                    >
                        Sede MetroTech
                        <input
                            type="radio"
                            id="selectOffice3"
                            name="selectOffice"
                            className="hidden"
                            value="Sede MetroTech"
                            checked={radioValue === "Sede MetroTech"}
                            onChange={(e)=>{handleChange(e)}}
                        />
                    </label>
                </fieldset>
            </div>
        </div>
    );
};

export default OurOffices;
