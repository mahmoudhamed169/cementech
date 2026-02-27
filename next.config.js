// next.config.js
import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your config options here
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);