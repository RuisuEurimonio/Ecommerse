"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ZodType, z } from "zod";
import { InputErrorText, saveAlert } from "./utils";
import React, { useEffect, useState } from "react";

type FormProps<T, U extends {id? : number | string, nombre?: string}> = {
    className?: string,
    modal?: boolean,
    data?: T | null,
    dataName: string,
    schequema: ZodType,
    inputsList: InputsListProps<U>[]
};

type InputsListProps<U extends {id? : number | string, nombre?: string}> = {
    type?: string,
    id: string,
    groupData?: boolean,
    name: string,
    extraData?: U[] | null,
    className?: String
    secondId?: string;
}

const Form = <T, U extends {id? : number | string, nombre?: string}>({ className, modal = false, data, dataName, schequema, inputsList }: FormProps<T, U>) => {

    const [listOfItemWithGroup, setListOfItemWithGroup] = useState<InputsListProps<{id? : number | string, nombre?: string}>[]>([]);

    type formProps = z.infer<typeof schequema>;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<formProps>({
        resolver: zodResolver(schequema),
        defaultValues: data ?? {} as T,
    });

    const selectComponent = <U extends { id?: number | string, nombre?: string }>(
        id: string, 
        name: string, 
        type: string, 
        extraData?: U[] | null | undefined,
        secondId?: string
    ) => {
        switch (type) {
            case ("select"):
                return selectInput(id, name, type, extraData ?? []);
            case ("textarea"):
                return textAreaInput(id, name);
            case ("combined"):
                return inputWithSelect(id, name, type, extraData ?? [], secondId ?? "");
            default:
                return defaultInput(id, name, type);
        }
    }

    const groupElements = (
        inputList: InputsListProps<{id?: number | string, nombre?: string}>[]
    ) => {
            return(
                <div className="flex flex-col mb-2 gap-2
                    md:flex-row  md:justify-around
                ">
                    {inputList.map((item)=>{
                        return(
                            <React.Fragment key={item.id+item.name}>
                                {selectComponent(item.id, item.name, item.type?? "", item.extraData)}
                            </React.Fragment>
                        )
                    })}
                </div>
            )
        }

    const inputWithSelect = <U extends {nombre?: string, id?: number | string, otherData?: string} >(
        id: string,
        name: string,
        type: string,
        extraData: U[],
        secondId: string
    ) => {
        return(
            <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                    <label htmlFor={id}>
                        <p className="inline-block w-5/12">{name}*:</p>
                        <select
                            className="border rounded-sm w-2/12"
                            {...register(secondId)}
                        >
                            {extraData.map((item) => (
                                <option
                                    key={item.nombre?? "" + item.id}
                                    value={item.nombre}
                                >
                                    {item.otherData?? item.nombre}
                                </option>
                            ))}
                        </select>
                        <input
                            id={id}
                            type={type}
                            className="border rounded-sm w-5/12"
                            {...register(id)}
                        />
                    </label>
                    {errors[secondId] && (
                        <InputErrorText
                            modal={modal}
                        >
                            {" "}
                            {errors[secondId]?.message as string}
                        </InputErrorText>
                    )}
                    {errors[id] && (
                        <InputErrorText
                            modal={modal}
                        >
                            {errors[id]?.message as string}
                        </InputErrorText>
                    )}
                </div>
        )
    }

    const defaultInput = (id: string, name: string, type: string) => {
        return (
            <div key={id + name} className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                <label htmlFor={id}>
                    <p className="inline-block w-1/3"> {name}*:</p>
                    <input
                        id={id}
                        type={type}
                        className="border rounded-sm w-2/3"
                        {...register(id)}
                    />
                </label>
                {errors[id] && (
                    <InputErrorText
                        modal={modal}
                    >
                        {errors[id]?.message as string}
                    </InputErrorText>
                )}
            </div>
        )
    }

    const textAreaInput = (id: string, name: string) => {
        return (
            <div key={id + name} className={` ml-5
            ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
            `}>
                <div className="flex items-center justify-between">
                    <label htmlFor={id}>
                        <p className="inline-block w-1/3"> {name}*:</p>
                    </label>
                    <textarea
                        id={id}
                        className="border rounded-sm w-2/3 resize-none"
                        rows={3}
                        {...register(id)}
                    />
                </div>
                {errors[id] && (
                    <InputErrorText
                        modal={modal}
                    >
                        {errors[id]?.message as string}
                    </InputErrorText>
                )}
            </div>
        )
    }

    const selectInput = <U extends { id?: number | string, nombre?: string }>(id: string, name: string, type: string, subList: U[]) => {
        return (
            <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                <p> {name} </p>
                <select
                    className="border rounded-sm w-full"
                    {...register(id)}
                >
                    {subList.map((item) => (
                        <option
                            key={item.id}
                            value={item.nombre}
                        >
                            {item.nombre}
                        </option>
                    ))}
                </select>
                {errors[id] && (
                    <InputErrorText
                        modal={modal}
                    >
                        {errors[id]?.message as string}
                    </InputErrorText>
                )}
            </div>
        )
    }

    const formvalues = watch();



    const onSubmit: SubmitHandler<formProps> = async (data) => {
        const response = await saveAlert(dataName);
        if (response) {
            reset();
            alert(`${dataName} guardado`);
        }
    };

    useEffect(() => {
        const groupedItems = inputsList.filter(item => typeof item.id !== 'undefined' && item.groupData);
        setListOfItemWithGroup(groupedItems as InputsListProps<{ id?: number | string; nombre: string; }>[]);
    }, [inputsList]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={className}>
            <div className="flex flex-col gap-4
                lg:gap-6
            ">
                <h3 className="font-bold text-lg"> Detalles. </h3>

                {inputsList.map((item, index) => {
                    if(!item.groupData){
                        return (
                            <React.Fragment key={item.name+index}>
                                {selectComponent(item.id, item.name, item.type ? item.type : "", item.extraData, item.secondId)}
                            </React.Fragment>
                        )
                    }
                })}

                {listOfItemWithGroup.length > 0 && groupElements(listOfItemWithGroup)}

            </div>
            <input
                type="submit"
                value="Enviar"
                className="bg-blue-mafer text-white mt-2 px-2 py-1 rounded-sm text-right cursor-pointer float-right"
            />
            <p>{JSON.stringify(formvalues, null, 2)}</p>
        </form>
    );
};

export default Form;
