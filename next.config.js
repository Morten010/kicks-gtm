/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "uploadthing.com"
            },
            {
                hostname: "utfs.io"
            }
        ]
    },
    serverExternalPackages: ['@prisma/client'],
    experimental: {
        webpackBuildWorker: true,
    }
}

module.exports = nextConfig
