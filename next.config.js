module.exports = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
                port: "",
                pathname: "/wikipedia/commons/**",
            },
            {
                protocol: "https",
                hostname: "i.pinimg.com",
                port: "",
                pathname: "/**",  // This allows all paths under i.pinimg.com
            },
        ],
    },
}
