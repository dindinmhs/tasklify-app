/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**',
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/overview',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
