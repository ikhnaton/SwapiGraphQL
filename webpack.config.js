const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pluginConfigs = {
	MiniCssExtractPlugin: new MiniCssExtractPlugin({
		filename: "main.css"
	}),
	CopyWebpackPlugin: new CopyWebpackPlugin([
		{ from: 'src/index.html', to: 'index.html' },
	], {}),
	UglifyJsPlugin:	new UglifyJsPlugin(),
	EnvironmentPlugin: new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	})
};

const baseConfig = {
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/dist')
    },
    watch: true,
	stats: "errors-only",
	mode: 'production',
	module: {
		rules: [
			{
				test: [/\.js$/],
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: [/\.css$/,/\.less$/],
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					// "style-loader",
					// 'extract-loader',
					'css-loader',
					"less-loader"
				]
			}
		]
	}
};

const clientConfig = Object.assign({}, baseConfig, {
	entry: {
		bundle: path.join(__dirname, '/src/simple.js')
	},
	target: 'web',
	plugins: [
		pluginConfigs.MiniCssExtractPlugin,
		pluginConfigs.CopyWebpackPlugin,
		// pluginConfigs.UglifyJsPlugin,
		pluginConfigs.EnvironmentPlugin
	]
})

const serverConfig = Object.assign({}, baseConfig, {
	entry: {
		backend: path.join(__dirname, '/server/server.js')
	},
	target: 'node',
	plugins: [
		pluginConfigs.MiniCssExtractPlugin,
		// pluginConfigs.UglifyJsPlugin
	]
//	externals: ['vcap.local.js']
})

module.exports = [ clientConfig ]
module.exports.pluginConfigs = pluginConfigs;
