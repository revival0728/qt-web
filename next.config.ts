import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async'
    });
    config.experiments.asyncWebAssembly = true;
    config.experiments.syncWebAssembly = true;
    return config;
  },
};

export default nextConfig;
