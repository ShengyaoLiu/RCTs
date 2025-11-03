// next.config.mjs
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "REPO_NAME"; // <-- change to your repo name (exactly)

const nextConfig = {
  output: "export",         // enables `next export` (static files)
  trailingSlash: true,      // plays nicer with GitHub Pages
  images: { unoptimized: true },

  // Route + asset prefixes so Pages serves correctly under /REPO_NAME/
  basePath:   isProd ? `/${repo}` : undefined,
  assetPrefix: isProd ? `/${repo}/` : undefined,

  // Optional: keep if you want builds to pass even with TS errors
  typescript: { ignoreBuildErrors: true },

  // NOTE: Do NOT include `eslint` here; Next 16 ignores it and warns.
};

export default nextConfig;
