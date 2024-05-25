import {CardProductProps} from "@/types/Props"
import {NewsLetterProps} from "@/types/Props"

export function getNumeration(data: number, num : number):number{
    return Math.ceil(data / num);
}