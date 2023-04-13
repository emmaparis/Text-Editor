const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: "J.A.T.E.",
			}),
			new MiniCSSExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css",
			}),
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),
			new GenerateSW({
				exclude: [/\.(?:png|jpg|jpeg|svg)$/],

				runtimeCaching: [
					{
						urlPattern: /.(?:png|jpg|jpeg|svg)$/,
						handler: "CacheFirst",

						options: {
							cacheName: "images",
							expiration: { maxEntries: 10 },
						},
					},
				],
			}),
			new WebpackPwaManifest({
				name: "Text Editor",
				short_name: "JATE",
				background_color: "#FFFFFF",
				display: "standalone",
				orientation: "portrait",
				fingerprints: false,
				publicPath: "./",
				icons: {
					src: path.resolve("src/images/logo.png"),
					sizes: [96, 120, 152, 167, 180, 1024],
					destination: path.join("assets", "icons"),
				},
			}),
		],
		module: {
			rules: [
			  {
				// compiling our css with MiniCSSExtract
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			  },
			  {
				// marking images as static assets
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			  },
			  {
				// compiling our js with babel
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
				  loader: 'babel-loader',
				  options: {
					presets: ['@babel/preset-env']
				  }
				}
			  },
			],
		  },
	  };
	};
        