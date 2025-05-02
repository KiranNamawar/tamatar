import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
    /* config options here */
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    serverExternalPackages: ['pino'],
    pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'md', 'mdx'],
    async headers() {
        return [
            {
                source: '/:path*{/}?',
                headers: [
                    {
                        // This header is used to disable buffering in Nginx
                        key: 'X-Accel-Buffering',
                        value: 'no',
                    },
                ],
            },
        ];
    },
};

const withMDX = createMDX({
    // Add maarkdown plugins here
})

export default withMDX(nextConfig);
