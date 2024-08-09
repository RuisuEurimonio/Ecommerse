"use client"

import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleChange(text: string) {
        const params = new URLSearchParams(searchParams);
        if (text) {
            params.set("search", text);
        } else {
            params.delete("search")
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <form
            className="w-[90%] m-auto flex 
                        md:h-7
                        xl:h-10 xl:w-full"
        >
            <input
                className="w-4/5 rounded-l-3xl pl-5 outline-none text-base
            md:h-full"
                placeholder="Buscar"
                onChange={(event) => handleChange(event.target.value)}
                value={searchParams.get("search") ? searchParams.get("search")!.toString() : ""} 
            />
            <Link
                className="w-1/5 bg-fifth-color rounded-r-3xl  border-l-2 text-base flex items-center justify-center
                            md:h-full"
                href={`/products?search=${searchParams.get("search")?.toString() ?? ""}`}
                aria-label="Buscar producto por texto ingresado"
            >
                <span className="icon icon-search"></span>
            </Link>
        </form>
    )
}

export default SearchInput;