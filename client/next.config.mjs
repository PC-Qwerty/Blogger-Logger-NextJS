/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "picsum.photos",
            }, {
                hostname: "avatars.githubusercontent.com"
            }
        ]
    }
};

export default nextConfig;
