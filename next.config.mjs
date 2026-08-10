import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    // loader: "custom",
    // loaderFile:
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "assets.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  //   webpack: (config, { isServer }) => {
  //     const fileLoaderRule = config.module.rules.find((rule) =>
  //       rule.test?.test?.(".svg")
  //     );
  //     config.module.rules.push(
  //       {
  //         ...fileLoaderRule,
  //         test: /\.svg$/i,
  //         resourceQuery: /url/,
  //       },
  //       {
  //         test: /\.svg$/i,
  //         issuer: fileLoaderRule.issuer,
  //         resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
  //         use: ["@svgr/webpack"],
  //       }
  //     );
  //     fileLoaderRule.exclude = /\.svg$/i;
  //     if (!isServer) {
  //       config.resolve.fallback = {
  //         ...config.resolve.fallback,
  //         fs: false,
  //       };
  //     }
  //     return config;
  //   },
  crossOrigin: "anonymous",
};

export default withNextVideo(nextConfig);
