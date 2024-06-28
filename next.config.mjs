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
            }
        ]
    }
    
};

export default nextConfig;
