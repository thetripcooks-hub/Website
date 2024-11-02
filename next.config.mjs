/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      //   {
      //     protocol: "https",
      //     hostname: "cdn.filestackcontent.com",
      //   },
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
};

export default nextConfig;
