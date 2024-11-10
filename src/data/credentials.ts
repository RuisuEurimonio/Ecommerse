 const HOST_ENV = process.env.HOST_DB_URL;
 const AZ_ENV = process.env.URL_SERVICE_AZ;
 
 class credentials{
    private static HOST_DB : string = HOST_ENV as string;
    
    private static URL_SERVICE_AZ : string =  AZ_ENV as string;

    public static getUrlContainerAz(name : string) : string {
        return `${this.URL_SERVICE_AZ}${name}?sp=ac&st=2024-08-08T03:08:32Z&se=2025-05-01T11:08:32Z&sv=2022-11-02&sr=c&sig=PaV1uf5RLOsBPcaXCr%2FWr7gc4oz5sGNdIpbHFkuJyUM%3D`
    }

    public static getUrlDeleteItem(name : string) : string{
        return `${this.URL_SERVICE_AZ}${name}?sp=d&st=2024-08-08T03:08:32Z&se=2025-05-01T11:08:32Z&sv=2022-11-02&sr=c&sig=uCX13opH8lBgfdAdLcYgFeotNfnH4O7w6X1OT2PGuOo%3D`
    }

    public static getURLServiceBlobAZ() : string {
        return this.URL_SERVICE_AZ;
    }

    public static getHostDB() : string {
        return this.HOST_DB;
    }
}

export default credentials;