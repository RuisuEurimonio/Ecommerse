import {CardProductProps} from "@/types/Props"
import {NewsLetterProps} from "@/types/Props"

export function getNumeration(data: CardProductProps[] | NewsLetterProps[], num : number):number{
    const dataLength = data.length;
    return Math.ceil(dataLength / num);
}