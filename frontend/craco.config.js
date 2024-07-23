const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@auth": path.resolve(__dirname, "src/pages/auth"),
			"@fonts": path.resolve(__dirname, "src/fonts"),
			"@containers": path.resolve(__dirname, "src/containers"),
			"@images": path.resolve(__dirname, "src/assets/images"),
			"@routes": path.resolve(__dirname, "src/routes"),
		},
	},
};
