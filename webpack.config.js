const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const Path = require('path');
const Webpack = require('webpack');

module.exports = (opt_env) => {
	const env = opt_env || {};
	const debug = !!env.debug;

	return [{
		mode: 'development',
		devServer: {
			contentBase: Path.resolve(__dirname, 'public'),
			stats: {
				children: false,
			},
		},
		entry: {
			bundle: Path.resolve(__dirname, 'src/js/bundle.js'),
		},
		output: {
			path: Path.resolve(__dirname, 'public/assets/js/'),
			filename: '[name].js',
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					include: [Path.resolve(__dirname, 'src/js/')],
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
	}, {
		mode: 'development',
		entry: {
			bundle: Path.resolve(__dirname, 'src/sass/bundle.scss'),
		},
		output: {
			path: Path.resolve(__dirname, 'public/assets/css/'),
			filename: '[name].css',
		},
		module: {
			rules: [
				{
					test: /\.s?css$/,
					include: [__dirname],
					exclude: /node_modules/,
					use: ExtractTextWebpackPlugin.extract({
						use: [{
							loader: 'css-loader',
						}, {
							loader: 'sass-loader',
							options: {
								outputStyle: 'compressed',
							},
						}, {
							loader: 'postcss-loader',
						}],
					}),
				},
			],
		},
		plugins: [
			new ExtractTextWebpackPlugin('[name].css'),
		],
	}];
};
