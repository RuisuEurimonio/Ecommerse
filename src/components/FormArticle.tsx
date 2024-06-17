"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { InputErrorText } from "./utils";
import { CardProductProps } from "@/types/Props";
import { saveAlert } from "./utils";
import brandFake from "@/utils/json/branchFake.json"
import { articleSchequema } from "@/utils/Schemas/articleSchema";

type FormArticleProps = {
    className?: string,
    modal?: boolean,
    data?: CardProductProps | null;
};

const brand = brandFake;
const clasification = brandFake;
const category = brandFake;


type formProps = z.infer<typeof articleSchequema>;

const FormArticle: React.FC<FormArticleProps> = ({ className, modal = false, data}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<formProps>({
        resolver: zodResolver(articleSchequema),
        defaultValues: {
            nameArticle: data?.nombre,
            description: data?.descripcion,
            SKU: data?.SKU,
            price: data?.precio,
            image: data?.image,
            brand: data?.marca,
            clasification: data?.clasificacion,
            category: data?.categoria
        }
    });

    const onSubmit: SubmitHandler<formProps> = async (data) => {
        const response = await saveAlert("Articulo");
        if(response){
            reset();
            alert("Articulo guardado");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className="flex flex-col gap-4
                lg:gap-6
            ">
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="nameArticle">
                        <p className="inline-block w-1/3">Nombre*:</p>    
                        <input
                            id="nameArticle"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("nameArticle")}
                        />
                    </label>
                    {errors.nameArticle && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.nameArticle?.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="description">
                        <p className="inline-block w-1/3">Descripción*:</p>
                        <input
                            id="description"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("description")}
                        />
                    </label>
                    {errors.description && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.description.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="SKU">
                        <p className="inline-block w-1/3">SKU*:</p>
                        <input
                            id="SKU"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("SKU")}
                        />
                    </label>
                    {errors.SKU && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.SKU.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="price">
                        <p className="inline-block w-1/3">precio*:</p>
                        <input
                            id="price"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("price")}
                        />
                    </label>
                    {errors.price && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.price.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className={`inline
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor="image">
                        <p className="inline-block w-1/3">Imagen*:</p>
                        <input
                            id="image"
                            type="text"
                            className="border rounded-sm w-2/3"
                            {...register("image")}
                        />
                    </label>
                    {errors.image && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors.image.message}{" "}
                        </InputErrorText>
                    )}
                </div>
                <div className="flex flex-col mb-2 gap-2
                    md:flex-row  md:justify-around
                ">
                    <div className={`inline
                    ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                    `}>
                        <p> Marca </p>
                        <select
                                className="border rounded-sm w-full"
                                {...register("brand")}
                            >
                                {brand.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.nombre}
                                    >
                                        {" "}
                                        {item.nombre}{" "}
                                    </option>
                                ))}
                                </select>
                                {errors.brand && (
                            <InputErrorText
                                modal={modal}
                            >
                                {" "}
                                {errors.brand?.message}{" "}
                            </InputErrorText>
                        )}
                    </div>
                    <div className={`inline
                    ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                    `}>
                        <p> Clasificación </p>
                        <select
                                className="border rounded-sm w-full"
                                {...register("clasification")}
                            >
                                {clasification.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.nombre}
                                    >
                                        {" "}
                                        {item.nombre}{" "}
                                    </option>
                                ))}
                                </select>
                                {errors.clasification && (
                            <InputErrorText
                                modal={modal}
                            >
                                {" "}
                                {errors.clasification?.message}{" "}
                            </InputErrorText>
                        )}
                    </div>
                    <div className={`inline
                    ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                    `}>
                        <p> Categoria </p>
                        <select
                                className="border rounded-sm w-full"
                                {...register("category")}
                            >
                                {category.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.nombre}
                                    >
                                        {" "}
                                        {item.nombre}{" "}
                                    </option>
                                ))}
                                </select>
                                {errors.category && (
                            <InputErrorText
                                modal={modal}
                            >
                                {" "}
                                {errors.category?.message}{" "}
                            </InputErrorText>
                        )}
                    </div>
                </div>
            </div>
            <input
                type="submit"
                value="Enviar"
                className="bg-blue-mafer text-white px-2 py-1 rounded-sm text-right cursor-pointer float-right"
            />
        </form>
        
    );
};

export default FormArticle;
