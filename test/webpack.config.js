const path = require('path')
const { DefineAfterBundleWebpackPlugin } = require('../build')

module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [
		new DefineAfterBundleWebpackPlugin({
			'process.env.TEST': JSON.stringify('New Value'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.png$/,
				type: 'asset/resource',
				generator: {
					filename: 'media/[name][ext]',
				},
			},
		],
	},
	target: 'node',
	mode: 'production',
	devtool: 'source-map',
}
