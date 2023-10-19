/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["punksvsapes.mypinata.cloud", "ipfs.io"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
}
//punksvsapes.mypinata.cloud
module.exports = nextConfig
