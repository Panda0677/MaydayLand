/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/MaydayLand" : "",
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: "/MaydayLand",
        assetPrefix: "/MaydayLand",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
