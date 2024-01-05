/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            // {
            //     protocol: 'https',
            //     hostname: 'imgbb.com',
            // },
            {
                protocol: 'https',
                hostname: '**.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: '**.blockadelabs.com',
            },
        ],
    },
}

module.exports = nextConfig
