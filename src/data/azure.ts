import credentials from "./credentials";

const URL_SERVICE = credentials.getURLServiceBlobAZ();

export async function sendImageToAzureContainer(file: File):Promise<string>{
    if(file){
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
    
            reader.onload = async () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const blob = new Blob([arrayBuffer], {type: file.type})
    
                const fileName = encodeURIComponent(file.name);
                    try{
                        const response = await fetch(credentials.getUrlContainerAz(fileName), {
                            method: "PUT",
                            headers: {
                                "Content-type": file.type,
                                'x-ms-blob-type': 'BlockBlob'
                            },
                            body: blob,
                        })
                        if(response.status === 201){
                            resolve(URL_SERVICE+fileName);
                        }
                        reject("Something was wrong");
                    }catch (error){
                        console.log("Error send image to Azure container: "+error);
                    }
                }
                reader.readAsArrayBuffer(file);
        })

        }else{
            throw new Error("Image not selected");

        }
}

export async function deleteImageFromStorage(fileName : string) : Promise<Boolean>{
    if(fileName){
        try{
            const response = await fetch(credentials.getUrlDeleteItem(fileName), {
                method: 'DELETE',
                headers: {
                    'x-ms-version': '2020-10-02'
                }
            })
            return response.ok;
        }catch(error){
            console.log("Error delet item from Azure Blob storage "+error)
            return false;
        }
    }
    return false;
}