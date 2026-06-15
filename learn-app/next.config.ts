import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // three.js ships modern ESM; transpiling keeps Next's bundler happy across
  // three / @react-three subpath imports.
  transpilePackages: ["three"],
  // Stray lockfiles up the tree (umbrella repo, C:\) make Next mis-infer the
  // workspace root. Pin tracing to this app.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
