const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const Fs = require('fs-extra');
const Path = require('path');
const Webpack = require('webpack');

const Package = require('./package.json');

class HookDonePlugin {
	constructor(onDone) {
		this.onDone_ = onDone;
	}

	apply(compiler) {
		compiler.hooks.done.tap('HookDonePlugin', (stats) => {
			this.onDone_();
		});
	}
}

module.exports = (opt_env) => {
	const env = opt_env || {};
	const debug = !!env.debug;

	const jsPlugins = [
		new Webpack.DefinePlugin({
			'APP_VERSION_VALUE': JSON.stringify(Package.version),
		}),
	];

	return [{
		mode: 'development',
		devtool: false,
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
		plugins: jsPlugins.concat([
			new HookDonePlugin(() => {
				Fs.ensureDirSync(Path.resolve(__dirname, 'public/assets/data'));
				Fs.writeFileSync(
					Path.resolve(__dirname, 'public/assets/data/version'),
					Package.version,
				);
			}),
		]),
	}, {
		mode: 'development',
		devtool: false,
		entry: {
			'service-worker': Path.resolve(__dirname, 'src/js/service-worker.js'),
		},
		output: {
			path: Path.resolve(__dirname, 'public/'),
			filename: '[name].js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					include: [Path.resolve(__dirname, 'src/js/')],
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.js'],
		},
		plugins: jsPlugins,
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
