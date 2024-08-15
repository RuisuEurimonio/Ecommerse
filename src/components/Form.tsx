"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import { InputsListProps,  FormProps, CategoryProps} from "@/types/Props"

import { confirmAction, errorAction, InputErrorText, saveAlert, successAction, updateAlert } from "./utils";
import { createElement, login, validateEmail } from "@/data/api";
import { useRouter } from "next/navigation";
import { sendImageToAzureContainer } from "@/data/azure";
import { saveCredentials } from "@/auth/security";
  
  
type FormPropsSec = {categories?: CategoryProps[]} | {};

const Form = <T extends {id?: number} | FormPropsSec , 
              U extends {id? : number | string, nombre?: string}>({
        className,
        modal = false, 
        data , 
        dataName, 
        schequema, 
        inputsList, 
        children, 
        isLoginRegister, 
        isSaveSession = false,
        updateInfo = false,
        urlFetch,
        customFunction,
        customFunctionWithData
    }: FormProps<T, U>) => {

    const [listOfItemWithGroup, setListOfItemWithGroup] = useState<InputsListProps<{id? : number | string, nombre?: string}>[]>([]);

    type FormPropsType = z.infer<typeof schequema>;

  const defaultValues: FormPropsType = ('categories' in (data ?? {}) 
    ? { ...(data ?? {}), categories: (data as {categories : CategoryProps[]}).categories ?? [] } 
    : (data ?? {})) as FormPropsType;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        control
    } = useForm<FormPropsType>({
        resolver: zodResolver(schequema),
        defaultValues:defaultValues,
    });

    const router = useRouter();

    useEffect(() => {
        if (data) {
          reset(defaultValues);
        }
      }, [data, reset, defaultValues]);

    const formValues = watch();

    const selectComponent = <U extends { id?: number | string, nombre?: string }>(
        id: string, 
        name: string, 
        type: "select" | "textarea" | "combined" | "group-checkbox" | string, 
        extraData?: U[] | null | undefined,
        secondId?: string
    ) => {
        switch (type) {
            case ("select"):
                return selectInput(id, name, extraData ?? []);
            case ("textarea"):
                return textAreaInput(id, name);
            case ("combined"):
                return inputWithSelect(id, name, type, extraData ?? [], secondId ?? "");
            case ("group-checkbox"):
                return checkboxInput(id, name, type, extraData ?? []);
            case ("file"):
                return defaultInput(id,name,type);
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

    const inputWithSelect = <U extends {nombre?: string, id?: number | string, abreviacion?: string} >(
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
                            {...register(secondId+".id")}
                        >
                            {extraData.map((item : U) => (
                                <option
                                    key={item.nombre?? "" + item.id}
                                    value={item.id}
                                >
                                    {item.abreviacion?? item.abreviacion}
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

    const defaultInput = (id: string, name: string, type: string, isFileInput: boolean = false) => {
        return (
            <div key={id + name} className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                <label htmlFor={id}>
                    <p className="inline-block w-1/3"> {name}*:</p>
                    {isFileInput ? <input
                        id={id}
                        type={type}
                        className="border rounded-sm w-2/3"

                        {...register(id)}
                    />
                :
                <input
                    id={id}
                    type={type}
                    className="border rounded-sm w-2/3"
                    accept="image/png, image/jpeg, image/webp"
                    {...register(id)}
            />
                }
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

    const selectInput = <U extends { id?: number | string, nombre?: string, tipo?: string}>(id: string, name: string, subList: U[]) => {
        return (
            <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                <p> {name} </p>
                <select
                    className="border rounded-sm w-full"
                    {...register(id+".id")}
                >
                    {subList.map((item) => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.nombre ?? item.tipo}
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

    const checkboxInput = <U extends { id?: number | string, nombre?: string }>(id: string, name: string, type: string, subList: U[]) => {
        return (
            <div className={`inline ml-5
                ${(!modal) ? "lg:max-w-[35vw] lg:relative" : ""}
                `}>
                <p> {name} </p>
                    {subList.map((item) => {return item.id && item.nombre && (
                        <React.Fragment key={item.id+item.nombre}>
                        <Controller
                            control={control}
                            name={"categoria"}
                            render={({field})=>{
                                return(
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    checked={Array.isArray(field.value) && field.value.some((value) => value.id === item.id)}
                                    onChange={e=>{
                                        const checked = e.target.checked;
                                        const newValue = checked
                                        ? [...(Array.isArray(field.value) ? field.value : []), { id: item.id}]
                                        : (Array.isArray(field.value) ? field.value : []).filter((value) => value.id !== item.id);
                                        field.onChange(newValue);
                                    }}
                                />
                            )}}
                        />
                        <label htmlFor={String(item.id)}> {item.nombre} </label>
                        </ React.Fragment>
                    )})}
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

    const onSubmit: SubmitHandler<FormPropsType> = async (dataInputs) => {

        if(!isLoginRegister){

            if("imagen" in dataInputs){
                let nameData = dataInputs.imagen[0];
                dataInputs.imagen = nameData;
            }

            if(!updateInfo){
                customFunction && await saveAlert(dataName, dataInputs, urlFetch, customFunction);
                customFunctionWithData && await saveAlert(dataName, dataInputs, urlFetch, undefined, customFunctionWithData)
                reset()
            } else {
                if ( data && 'id' in data){
                    let id = data?.id ?? null;
                    let newData;
                    if("imagen" in dataInputs && "imagen" in data && dataInputs.imagen === 'h' ){
                        dataInputs.imagen = data.imagen;
                        newData = {id, ...dataInputs}
                    }else{
                        let fileName = "imagen" in data ? data.imagen : "";
                        newData = {id, fileName, ...dataInputs}
                    }
                    customFunction && await updateAlert(dataName, newData, urlFetch, false, customFunction);
                    customFunctionWithData && await updateAlert(dataName, newData, urlFetch, false, undefined, customFunctionWithData)
                }
            }
        } else {
            if("correo" in dataInputs && "nombres" in dataInputs){
                const existPassword = await validateEmail(dataInputs.correo);
                if(existPassword){
                    return errorAction("Este correo ya esta registado");
                }
                const response = await confirmAction("¿Desea registrar este usuario?");
                if(response){
                    const {repeatPassword, ...restInputs} = dataInputs;
                    const createResponse = await createElement("usuario",{
                        method: 'POST',
                        headers:{
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({...restInputs, permisos : {id: 1}})
                    })

                    if(createResponse){
                        successAction("¡Usuario registrado!");
                        router.push("/login")
                    }
                }

            }else{
                const response = await confirmAction("¿Desea ingresar sesión?");

                    if(response){
                        const responseFetch = await login({
                            method: 'POST', 
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(dataInputs)
                        })

                        if(responseFetch){
                            saveCredentials(responseFetch[1], responseFetch[0], isSaveSession);
                            //successAction("Sesión iniciada!");
                            //router.push("/")
                        }
                    }
            }
             
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
            
            <pre>{JSON.stringify(formValues, null, 2)}</pre>

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
