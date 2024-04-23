export function verifyPerPageExist(dataOptions: {id:number,cantidad:number}[], perPage: number ):number{
    if(dataOptions.find( option => option.cantidad == perPage) || !isNaN(perPage)){
        return perPage;
    }
    return dataOptions[1].cantidad;
    
}

export function verifyPageUrlExistAndIsNumber(totalData: number, pageNum: number, itemsByPage: number, router:any):void{
    if(totalData < pageNum || isNaN(pageNum)){
        router.push(`?page=1&perPage=${itemsByPage}`,
        {scroll:false})
    }
}
