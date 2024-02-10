/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		loader: 'custom',
		loaderFile: './my/image/loader.js',
	  },
	images: {
		remotePatterns: [
			{
				hostname: "avatars.githubusercontent.com",
				protocol: "https",
			},
			{
				hostname: "localhost",
				protocol: "http",
			},
		],
		
	},
};

module.exports = nextConfig;
