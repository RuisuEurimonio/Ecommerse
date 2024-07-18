"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { InputsListProps,  FormProps} from "@/types/Props"

import { InputErrorText, saveAlert, updateAlert } from "./utils";
import { updateElement } from "@/data/api";

const Form = <T extends {id?: number}, 
              U extends {id? : number | string, nombre?: string}>({
        className,
        modal = false, 
        data , 
        dataName, 
        schequema, 
        inputsList, 
        children, 
        isLoginRegister, 
        updateInfo = false,
        urlFetch,
        customFunction
    }: FormProps<T, U>) => {

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

    const onSubmit: SubmitHandler<formProps> = async (dataInputs) => {
        if(!isLoginRegister){
            if(!updateInfo){
                const response = await saveAlert(dataName);
                if (response) {
                    reset();
                    alert(`${dataName} guardado`);
                }
            } else {
                try{
                    let id = data?.id ?? null;
                    let newData = {id, ...dataInputs}
                    customFunction && await updateAlert(dataName, newData, urlFetch, customFunction);
                } catch (error){
                    console.log("Error updating in form: "+error)
                }
            }
        } else {
            reset();
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

                {!isLoginRegister && <h3 className="font-bold text-lg"> Detalles. </h3>}

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
            
            {children}

            {isLoginRegister ? 
                <div className="flex justify-center">
                    <input
                        type="submit"
                        value="Confirmar"
                        className="bg-secondary-color text-white mt-2 px-2 py-1 rounded-sm cursor-pointer"
                    />
                </div>
                :
                <input
                    type="submit"
                    value="Enviar"
                    className="bg-secondary-color text-white mt-2 px-2 py-1 rounded-sm cursor-pointer float-right"
                />
            }
        </form>
    );
};

export default Form;
