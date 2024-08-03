/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'http',
                hostname: "dummyimage.com"
            },
            {
                protocol: 'https',
                hostname: "c4.wallpaperflare.com"
            },
            {
                protocol: "https",
                hostname: "storagerux1111.blob.core.windows.net"
            }
        ]
    }
    
};

export default nextConfig;
