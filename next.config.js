/** @type {import('next').NextConfig} */
const {i18n} = require('./next-i18next.config')
require("dotenv").config(`./env.${process.env.NODE_ENV}`);

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n,
    env: {
        // Reference a variable that was defined in the .env.* file and make it available at Build Time
        TEST_VAR: process.env.NEXT_PUBLIC_API_URL,
    },
};


module.exports = nextConfig;
