"use client"

import { perPageOptions } from "@/utils/ts/configuration";
import { useRouter } from "next/navigation";

type SelectCantItemsProps = {
    perPage : number
};


export const SelectCantItems: React.FC<SelectCantItemsProps> = ({perPage}) => {

    const router = useRouter();

    function handleChange(event: any) {
        router.replace(`?page=1&perPage=${event.target.value}`, { scroll: false });
    }

    return (
        <div className="mb-3">
            <label className="text-white-mafer"> Cantidad por pagina: </label>
            <select
                name="order"
                className="outline-none cursor-pointer rounded-sm mx-1"
                value={perPage}
                onChange={handleChange}
            >
                {perPageOptions.map((option) => (
                    <option key={option.id} value={option.cantidad}>
                        {" "}
                        {option.cantidad}{" "}
                    </option>
                ))}
            </select>
        </div>
    );
};
