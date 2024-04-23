export function verifyPerPage(dataOptions: {id:number,cantidad:number}[], perPage: number ):number{
    if(dataOptions.find( option => option.cantidad == perPage)){
        return perPage;
    }
    return dataOptions[1].cantidad;
    
}