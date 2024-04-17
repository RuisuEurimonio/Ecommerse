import {CardProductProps} from "@/types/Props"

export function getNumeration(data: CardProductProps[], num : number):number{
    const dataLength = data.length;
    return Math.ceil(dataLength / num);
}